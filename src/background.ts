import {
	BLOCKED_SITES_STORAGE_KEY,
	BLOCKER_SETTINGS_STORAGE_KEY,
	getBlockedSites,
	getBlockerSettings
} from './app/blocker/model/storage'
import {
	getTimerSettings,
	getStoredTimerState,
	setStoredTimerState,
	TIMER_STORAGE_KEY
} from './app/timer/model/storage'
import { TIMER_SOUND_MESSAGE_TYPE } from './app/timer/model/constants'
import { timerReducer } from './app/timer/model/reducer'
import type { TimerState } from './app/timer/model/types'

const BLOCKING_RULE_ID_START = 1
const TIMER_END_ALARM_NAME = 'focusflow-timer-end'
const FOCUS_SCREEN_PATH = '/focus.html'
const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html'

let creatingOffscreenDocument: Promise<void> | null = null

async function ensureOffscreenDocument() {
	const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)
	const existingContexts = await chrome.runtime.getContexts({
		contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
		documentUrls: [offscreenUrl]
	})

	if (existingContexts.length > 0) return

	if (!creatingOffscreenDocument) {
		creatingOffscreenDocument = chrome.offscreen.createDocument({
			url: OFFSCREEN_DOCUMENT_PATH,
			reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
			justification:
				'Play the timer completion sound while the panel is closed.'
		})
	}

	try {
		await creatingOffscreenDocument
	} finally {
		creatingOffscreenDocument = null
	}
}

async function playTimerCompletionSound() {
	const sidePanelContexts = await chrome.runtime.getContexts({
		contextTypes: [chrome.runtime.ContextType.SIDE_PANEL]
	})

	if (sidePanelContexts.length > 0) return

	const settings = await getTimerSettings()
	if (settings.soundVolume <= 0) return

	await ensureOffscreenDocument()
	await chrome.runtime.sendMessage({
		target: 'offscreen',
		type: TIMER_SOUND_MESSAGE_TYPE,
		volume: settings.soundVolume
	})
}

function didTimerComplete(change?: chrome.storage.StorageChange) {
	if (!change) return false

	const previousState = change.oldValue as TimerState | undefined
	const nextState = change.newValue as TimerState | undefined

	return (
		previousState?.status === 'running' &&
		previousState.endAt !== null &&
		previousState.endAt <= Date.now() &&
		nextState?.status === 'idle'
	)
}

async function completeExpiredTimer() {
	const timerState = await getStoredTimerState()
	const now = Date.now()

	if (
		timerState?.status !== 'running' ||
		timerState.endAt === null ||
		timerState.endAt > now
	)
		return

	await setStoredTimerState(timerReducer(timerState, { type: 'TICK', now }))
}

function createRuleAction(
	shouldRedirect: boolean
): chrome.declarativeNetRequest.RuleAction {
	if (!shouldRedirect) {
		return {
			type: chrome.declarativeNetRequest.RuleActionType.BLOCK
		}
	}

	return {
		type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
		redirect: {
			extensionPath: FOCUS_SCREEN_PATH
		}
	}
}

function isBlockedHostname(hostname: string, blockedHostname: string) {
	const normalizedHostname = hostname.toLowerCase().replace(/^www\./, '')
	const normalizedBlockedHostname = blockedHostname
		.toLowerCase()
		.replace(/^www\./, '')

	return (
		normalizedHostname === normalizedBlockedHostname ||
		normalizedHostname.endsWith(`.${normalizedBlockedHostname}`)
	)
}

async function enforceBlockedNavigation(
	details: chrome.webNavigation.WebNavigationBaseCallbackDetails
) {
	if (details.frameId !== 0) return

	let hostname: string

	try {
		const url = new URL(details.url)
		if (url.protocol !== 'http:' && url.protocol !== 'https:') return

		hostname = url.hostname
	} catch {
		return
	}

	const [blockedSites, settings, timerState] = await Promise.all([
		getBlockedSites(),
		getBlockerSettings(),
		getStoredTimerState()
	])

	const isTimerRunning =
		timerState?.status === 'running' &&
		timerState.endAt !== null &&
		timerState.endAt > Date.now()

	const shouldBlock = !settings.onlyBlockWhenTimerRunning || isTimerRunning
	if (!shouldBlock) return

	const isBlocked = blockedSites.some(
		site => site.enabled && isBlockedHostname(hostname, site.hostname)
	)

	if (!isBlocked) return

	await chrome.tabs.update(details.tabId, {
		url: chrome.runtime.getURL(FOCUS_SCREEN_PATH)
	})
}

async function syncBlockingRules() {
	const blockedSites = await getBlockedSites()

	const settings = await getBlockerSettings()
	const timerState = await getStoredTimerState()

	const isTimerRunning =
		timerState?.status === 'running' &&
		timerState.endAt !== null &&
		timerState.endAt > Date.now()

	const shouldBlock = !settings.onlyBlockWhenTimerRunning || isTimerRunning
	const action = createRuleAction(settings.redirectToFocusScreen)

	const enabledSites = shouldBlock
		? blockedSites.filter(site => site.enabled)
		: []

	const existingRules = await chrome.declarativeNetRequest.getDynamicRules()
	const blockingRules: chrome.declarativeNetRequest.Rule[] = enabledSites.map(
		(site, index) => ({
			id: BLOCKING_RULE_ID_START + index,
			priority: 1,
			action,
			condition: {
				requestDomains: [site.hostname],
				resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME]
			}
		})
	)

	await chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: existingRules.map(rule => rule.id),
		addRules: blockingRules
	})

	await chrome.alarms.clear(TIMER_END_ALARM_NAME)

	if (
		timerState?.status === 'running' &&
		timerState.endAt !== null &&
		timerState.endAt > Date.now()
	) {
		await chrome.alarms.create(TIMER_END_ALARM_NAME, {
			when: timerState.endAt
		})
	}
}

async function initializeBackground() {
	await completeExpiredTimer()
	await syncBlockingRules()
}

chrome.runtime.onInstalled.addListener(initializeBackground)
chrome.runtime.onStartup.addListener(initializeBackground)

chrome.storage.onChanged.addListener((changes, areaName) => {
	if (areaName !== 'local') return

	if (didTimerComplete(changes[TIMER_STORAGE_KEY])) {
		playTimerCompletionSound().catch(error => {
			console.error('Failed to play timer completion sound', error)
		})
	}

	if (
		!changes[BLOCKED_SITES_STORAGE_KEY] &&
		!changes[BLOCKER_SETTINGS_STORAGE_KEY] &&
		!changes[TIMER_STORAGE_KEY]
	)
		return

	syncBlockingRules()
})

chrome.alarms.onAlarm.addListener(async alarm => {
	if (alarm.name !== TIMER_END_ALARM_NAME) return

	await completeExpiredTimer()
	await syncBlockingRules()
})

chrome.webNavigation.onCommitted.addListener(enforceBlockedNavigation)
chrome.webNavigation.onHistoryStateUpdated.addListener(enforceBlockedNavigation)
