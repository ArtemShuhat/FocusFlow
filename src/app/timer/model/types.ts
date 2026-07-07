export type TimerStatus = 'idle' | 'running' | 'paused'
export type TimerMode = 'focus' | 'longBreak' | 'shortBreak'
export type TimerDurations = Record<TimerMode, number>

export interface TimerState {
	status: TimerStatus
	mode: TimerMode
	durations: TimerDurations
	remainingMs: number
	endAt: number | null
	focusCompleted: number
	cycleIndex: number
}

export type TimerEvent =
	| { type: 'START'; now: number }
	| { type: 'PAUSE'; now: number }
	| { type: 'RESET' }
	| { type: 'SET_MODE'; mode: TimerMode }
	| { type: 'TICK'; now: number }
	| { type: 'SET_DURATION'; patch: Partial<TimerDurations> }
	| { type: 'HYDRATE'; state: TimerState }

export interface TimerSettings {
	soundVolume: number
	durations: TimerDurations
}
