import type { TimerMode, TimerStatus } from './types'

const TIMER_STORAGE_KEY = 'timerSession'

export interface TimerSession {
	status: TimerStatus
	mode: TimerMode
	durationMs: number
	startedAt?: number
	endsAt?: number
	remainingMs?: number
}

export async function getTimerSession() {
	const result = await chrome.storage.local.get(TIMER_STORAGE_KEY)

	return result[TIMER_STORAGE_KEY] as TimerSession | undefined
}

export async function setTimerSession(session: TimerSession) {
	await chrome.storage.local.set({
		[TIMER_STORAGE_KEY]: session
	})
}

export async function clearTimerSession() {
	await chrome.storage.local.remove(TIMER_STORAGE_KEY)
}

export async function startTimerSession(mode: TimerMode, durationMs: number) {
	const now = Date.now()

	const session: TimerSession = {
		status: 'running',
		mode,
		durationMs,
		startedAt: now,
		endsAt: now + durationMs
	}

	await setTimerSession(session)

	return session
}

export async function pauseTimerSession() {
	const session = await getTimerSession()

	if (!session || session.status !== 'running' || !session.endsAt)
		return session

	const remainingMs = Math.max(0, session.endsAt - Date.now())

	const pausedSession: TimerSession = {
		...session,
		status: 'paused',
		endsAt: undefined,
		remainingMs
	}

	await setTimerSession(pausedSession)

	return pausedSession
}

export async function resumeTimerSession() {
	const session = await getTimerSession()

	if (!session || session.status !== 'paused' || !session.remainingMs)
		return session

	const now = Date.now()
	const endsAt = now + session.remainingMs

	const resumeSession: TimerSession = {
		...session,
		status: 'running',
		startedAt: now,
		endsAt,
		remainingMs: undefined
	}

	await setTimerSession(resumeSession)
	return resumeSession
}
