import type { TimerState } from './types'

const TIMER_STORAGE_KEY = 'timerState'

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
