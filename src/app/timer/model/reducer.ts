import { DEFAULT_DURATION, LONG_BREAK_EVERY } from './constants'
import type {
	TimerDurations,
	TimerEvent,
	TimerMode,
	TimerState,
	
} from './types'

export function createInitialState(): TimerState {
	return {
		status: 'idle',
		mode: 'focus',
		durations: DEFAULT_DURATION,
		remainingMs: DEFAULT_DURATION.focus,
		endAt: null,
		focusCompleted: 0,
		cycleIndex: 1
	}
}

function modeDuration(mode: TimerMode, durations: TimerDurations) {
	return durations[mode]
}

function nextModeAfterComplete(state: TimerState): TimerMode {
	if (state.mode !== 'focus') return 'focus'
	const nextFocusCount = state.focusCompleted + 1
	return nextFocusCount % LONG_BREAK_EVERY === 0 ? 'longBreak' : 'shortBreak'
}

function stopWithMode(state: TimerState, mode: TimerMode): TimerState {
	return {
		...state,
		status: 'idle',
		mode,
		endAt: null,
		remainingMs: modeDuration(mode, state.durations)
	}
}

export function timerReducer(state: TimerState, event: TimerEvent): TimerState {
	switch (event.type) {
		case 'START': {
			if (state.status === 'running') return state
			const baseRemaining =
				state.remainingMs > 0
					? state.remainingMs
					: modeDuration(state.mode, state.durations)

			return {
				...state,
				status: 'running',
				remainingMs: baseRemaining,
				endAt: baseRemaining + event.now
			}
		}
		case 'PAUSE': {
			if (state.status !== 'running' || !state.endAt) return state

			return {
				...state,
				status: 'paused',
				endAt: null,
				remainingMs: Math.max(0, state.endAt - event.now)
			}
		}
		case 'RESET': {
			return {
				...state,
				status: 'idle',
				remainingMs: modeDuration(state.mode, state.durations),
				endAt: null
			}
		}
		case 'SET_MODE': {
			return stopWithMode(state, event.mode)
		}
		case 'TICK': {
			if (state.status !== 'running' || !state.endAt) return state

			const remaning = Math.max(0, state.endAt - event.now)
			if (remaning > 0) return { ...state, remainingMs: remaning }

			if (state.mode === 'focus') {
				const mode = nextModeAfterComplete(state)
				return {
					...state,
					status: 'idle',
					mode,
					endAt: null,
					remainingMs: modeDuration(mode, state.durations),
					focusCompleted: state.focusCompleted + 1,
					cycleIndex: (state.cycleIndex % LONG_BREAK_EVERY) + 1
				}
			}

			return stopWithMode(state, 'focus')
		}
		case 'SET_DURATION': {
			const durations = { ...state.durations, ...event.patch }
			const resetRemaining = modeDuration(state.mode, durations)
			const shouldReset = state.status !== 'running'
			return {
				...state,
				durations,
				remainingMs: shouldReset ? resetRemaining : state.remainingMs
			}
		}
		case 'HYDRATE': {
			return event.state
		}
		default:
			return state
	}
}
