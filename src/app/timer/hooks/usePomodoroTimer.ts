import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { createInitialState, timerReducer } from '../model/reducer'
import type { TimerDurations, TimerMode, TimerState } from '../model/types'
import { TICK_MS } from '../model/constants'
import { getStoredTimerState, setStoredTimerState } from '../model/storage'
import { playTimerSound } from '../lib/playTimerSound'

function formatTime(ms: number) {
	const totalSeconds = Math.ceil(ms / 1000)
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60

	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function usePomodoroTimer(soundVolume: number) {
	const [state, dispatch] = useReducer(
		timerReducer,
		undefined,
		createInitialState
	)

	const [hydrated, setHydrated] = useState(false)
	const previousStateRef = useRef(state)

	useEffect(() => {
		if (!hydrated) {
			previousStateRef.current = state
			return
		}

		const previousState = previousStateRef.current
		const completedByTimer =
			previousState.status === 'running' &&
			state.status === 'idle' &&
			previousState.endAt !== null &&
			previousState.endAt <= Date.now()

		if (completedByTimer) {
			playTimerSound(soundVolume)
		}

		previousStateRef.current = state
	}, [hydrated, state, soundVolume])

	useEffect(() => {
		let cancelled = false

		getStoredTimerState().then(savedState => {
			if (cancelled) return

			if (savedState) {
				dispatch({ type: 'HYDRATE', state: savedState })

				if (savedState.status === 'running') {
					dispatch({ type: 'TICK', now: Date.now() })
				}
			}

			setHydrated(true)
		})

		return () => {
			cancelled = true
		}
	}, [])

	useEffect(() => {
		if (!hydrated) return

		setStoredTimerState(state)
	}, [
		hydrated,
		state.status,
		state.mode,
		state.endAt,
		state.durations.focus,
		state.durations.shortBreak,
		state.durations.longBreak,
		state.focusCompleted,
		state.cycleIndex,
		state.status === 'running' ? null : state.remainingMs
	])

	const start = useCallback(() => {
		dispatch({ type: 'START', now: Date.now() })
	}, [])

	const pause = useCallback(() => {
		dispatch({ type: 'PAUSE', now: Date.now() })
	}, [])

	const reset = useCallback(() => {
		dispatch({ type: 'RESET' })
	}, [])

	const setDuration = useCallback((patch: Partial<TimerDurations>) => {
		dispatch({ type: 'SET_DURATION', patch })
	}, [])

	const hydrate = useCallback((nextState: TimerState) => {
		dispatch({ type: 'HYDRATE', state: nextState })
	}, [])

	const toggle = useCallback(() => {
		if (state.status === 'running') {
			dispatch({ type: 'PAUSE', now: Date.now() })
			return
		}

		dispatch({ type: 'START', now: Date.now() })
	}, [state.status])

	const setMode = useCallback((mode: TimerMode) => {
		dispatch({ type: 'SET_MODE', mode })
	}, [])

	useEffect(() => {
		if (state.status !== 'running') return

		const intervalId = window.setInterval(() => {
			dispatch({ type: 'TICK', now: Date.now() })
		}, TICK_MS)

		return () => {
			window.clearInterval(intervalId)
		}
	}, [state.status])

	const totalMs = state.durations[state.mode]
	const progress = totalMs <= 0 ? 0 : 1 - state.remainingMs / totalMs

	return {
		state,

		status: state.status,
		mode: state.mode,
		durations: state.durations,
		remainingMs: state.remainingMs,

		formattedTime: formatTime(state.remainingMs),

		focusCompleted: state.focusCompleted,
		cycleIndex: state.cycleIndex,

		start,
		pause,
		reset,
		toggle,
		setDuration,
		hydrate,
		progress,
		setMode
	}
}
