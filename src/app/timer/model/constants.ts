import type { TimerDurations } from './types'

export const MINUTE_MS = 60_000

export const LONG_BREAK_EVERY = 4

//del
export const SECOND_MS = 1000

export const DEFAULT_DURATION: TimerDurations = {
	focus: 25 * SECOND_MS,
	longBreak: 20 * SECOND_MS,
	shortBreak: 5 * SECOND_MS
}

export const TICK_MS = 250
