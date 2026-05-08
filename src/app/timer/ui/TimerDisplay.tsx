import { TimerArc } from './TimerArc'
import { TimerHeader } from './TimerHeader'

interface TimerDisplayProps {
	formattedTime: string
	reset: () => void
	progress: number
	badge: string
	message: string
	theme: {
		text: string
		bg: string
		badge: string
		glow: string
		arc: string
	}
}

export function TimerDisplay({
	formattedTime,
	reset,
	progress,
	badge,
	message,
	theme
}: TimerDisplayProps) {
	return (
		<div className='p-4'>
			<TimerHeader
				reset={reset}
				badge={badge}
				badgeClassName={theme.badge}
			/>

			<div className='relative h-[220px]'>
				<TimerArc progress={progress} color={theme.arc} />

				<div
					className={`absolute inset-x-0 top-[82px] text-center text-5xl font-bold ${theme.text} `}
				>
					{formattedTime}
				</div>
			</div>

			<div className='mb-5 text-center text-sm text-white/70'>{message}</div>
		</div>
	)
}
