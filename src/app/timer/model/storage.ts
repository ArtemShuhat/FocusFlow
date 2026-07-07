import { DEFAULT_TIMER_SETTINGS } from './constants'
import type { TimerSettings, TimerState } from './types'

export const TIMER_STORAGE_KEY = 'timerState'
export const TIMER_SETTINGS_STORAGE_KEY = 'timerSettings'

export async function getStoredTimerState() {
	const result = await chrome.storage.local.get(TIMER_STORAGE_KEY)

	return result[TIMER_STORAGE_KEY] as TimerState | undefined
}

export async function setStoredTimerState(state: TimerState) {
	await chrome.storage.local.set({
		[TIMER_STORAGE_KEY]: state
	})
}

export async function clearStoredTimerState() {
	await chrome.storage.local.remove(TIMER_STORAGE_KEY)
}

export async function getTimerSettings() {
	const result = await chrome.storage.local.get(TIMER_SETTINGS_STORAGE_KEY)

	return {
		...DEFAULT_TIMER_SETTINGS,
		...(result[TIMER_SETTINGS_STORAGE_KEY] as
			| Partial<TimerSettings>
			| undefined)
	}
}

export async function setTimerSettings(settings: TimerSettings) {
	await chrome.storage.local.set({ [TIMER_SETTINGS_STORAGE_KEY]: settings })
}
