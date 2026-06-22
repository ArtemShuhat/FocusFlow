import type { TimerDurations } from './types'

export const MINUTE_MS = 60_000

export const LONG_BREAK_EVERY = 4

export const DEFAULT_DURATION: TimerDurations = {
	focus: 25 * MINUTE_MS,
	shortBreak: 5 * MINUTE_MS,
	longBreak: 10 * MINUTE_MS
}

export const TICK_MS = 250
