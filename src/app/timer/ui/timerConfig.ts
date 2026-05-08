import type { TimerMode, TimerStatus } from '../model/types'

export function getTimerVariant(mode: TimerMode, status: TimerStatus) {
	const isBreak = mode === 'longBreak' || mode === 'shortBreak'

	if (isBreak && status === 'running') return 'breakRunning'
	if (isBreak && status === 'idle') return 'breakIdle'

	if (mode === 'focus' && status === 'running') return 'focusRunning'
	if (mode === 'focus' && status === 'paused') return 'focusPaused'

	return 'focusIdle'
}

export const TimerVariantConfig = {
	focusRunning: {
		badge: 'FOCUS',
		message: 'Stay focused. Get things done.',
		accent: 'orange',
		primaryButton: 'START',
		secondaryButton: 'PAUSE'
	},
	focusPaused: {
		badge: 'PAUSED',
		message: "Take a breath. You've got this.",
		accent: 'orange',
		primaryButton: 'RESUME',
		secondaryButton: 'END'
	},
	focusIdle: {
		badge: 'FOCUS',
		message: 'Ready when you are.',
		accent: 'orange',
		primaryButton: 'START',
		secondaryButton: null
	},
	breakRunning: {
		badge: 'BREAK',
		message: 'Rest. Recharge.',
		accent: 'cyan',
		primaryButton: 'BREAK',
		secondaryButton: 'SKIP'
	},
	breakIdle: {
		badge: 'BREAK',
		message: 'Ready when you are.',
		accent: 'cyan',
		primaryButton: 'START',
		secondaryButton: null
	}
} as const

export const timerThemes = {
	orange: {
		text: 'text-orangeActive',
		bg: 'bg-orangeActive',
		button:
			'bg-orangeActive text-black shadow-[0_0_18px_rgba(245,158,11,0.35)]',
		badge: 'bg-orangeActive/10 text-orangeActive',
		glow: '',
		arc: '#f2a618'
	},
	cyan: {
		text: 'text-cyan-300',
		bg: 'bg-cyan-300',
		button: 'bg-cyan-300 text-black shadow-[0_0_18px_rgba(103,232,249,0.25)]',
		badge: 'bg-cyan-300/10 text-cyan-300',
		glow: 'shadow-[0_0_20px_rgba(103,232,249,0.25)]',
		arc: '#67e8f9'
	}
} as const
