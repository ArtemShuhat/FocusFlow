import {
	BLOCKED_SITES_STORAGE_KEY,
	BLOCKER_SETTINGS_STORAGE_KEY,
	getBlockedSites,
	getBlockerSettings
} from './app/blocker/model/storage'
import {
	getStoredTimerState,
	TIMER_STORAGE_KEY
} from './app/timer/model/storage'

const BLOCKING_RULE_ID_START = 1
const TIMER_END_ALARM_NAME = 'focusflow-timer-end'
const FOCUS_SCREEN_PATH = '/index.html'

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
		settings.onlyBlockWhenTimerRunning &&
		timerState?.status === 'running' &&
		timerState.endAt !== null &&
		timerState.endAt > Date.now()
	) {
		await chrome.alarms.create(TIMER_END_ALARM_NAME, {
			when: timerState.endAt
		})
	}
}

chrome.runtime.onInstalled.addListener(syncBlockingRules)
chrome.runtime.onStartup.addListener(syncBlockingRules)

chrome.storage.onChanged.addListener((changes, areaName) => {
	if (areaName !== 'local') return
	if (
		!changes[BLOCKED_SITES_STORAGE_KEY] &&
		!changes[BLOCKER_SETTINGS_STORAGE_KEY] &&
		!changes[TIMER_STORAGE_KEY]
	)
		return

	syncBlockingRules()
})

chrome.alarms.onAlarm.addListener(alarm => {
	if (alarm.name !== TIMER_END_ALARM_NAME) return

	syncBlockingRules()
})
