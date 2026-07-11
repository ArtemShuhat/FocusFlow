import type { TimerDurations, TimerSettings } from './types'

export const MINUTE_MS = 60_000

export const LONG_BREAK_EVERY = 4

export const DEFAULT_DURATION: TimerDurations = {
	focus: 25 * MINUTE_MS,
	shortBreak: 5 * MINUTE_MS,
	longBreak: 10 * MINUTE_MS
}

export const TICK_MS = 250

export const TIMER_SOUND_MESSAGE_TYPE = 'PLAY_TIMER_SOUND'

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
	soundVolume: 70,
	durations: DEFAULT_DURATION
}
