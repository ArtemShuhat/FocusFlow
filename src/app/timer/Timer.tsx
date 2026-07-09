import type { usePomodoroTimer } from './hooks/usePomodoroTimer'
import { TimerButtons } from './ui/TimerButtons'
import { TimerDisplay } from './ui/TimerDisplay'
import {
	TimerVariantConfig,
	getTimerVariant,
	timerThemes
} from './ui/timerConfig'

interface TimerProps {
	timer: ReturnType<typeof usePomodoroTimer>
}

export default function Timer({ timer }: TimerProps) {
	const variant = getTimerVariant(timer.mode, timer.status)
	const config = TimerVariantConfig[variant]
	const theme = timerThemes[config.accent]

	const isBreak = timer.mode === 'longBreak' || timer.mode === 'shortBreak'

	const primaryButton =
		timer.status === 'paused'
			? { label: 'RESUME', onClick: timer.start }
			: {
					label: isBreak ? 'BREAK' : 'START',
					onClick: timer.start,
					disabled: timer.status === 'running'
				}

	const secondaryButton = isBreak
		? { label: 'SKIP', onClick: () => timer.setMode('focus') }
		: timer.status === 'running'
			? { label: 'PAUSE', onClick: timer.pause }
			: timer.status === 'paused'
				? { label: 'END', onClick: timer.reset }
				: null

	return (
		<div className='mt-5 rounded-3xl border border-white/4 bg-[#191411] transition-colors duration-300'>
			<TimerDisplay
				formattedTime={timer.formattedTime}
				progress={timer.progress}
				badge={config.badge}
				message={config.message}
				theme={theme}
				reset={timer.reset}
			/>

			<TimerButtons
				primaryButton={primaryButton}
				secondaryButton={secondaryButton}
				theme={theme}
			/>
		</div>
	)
}
