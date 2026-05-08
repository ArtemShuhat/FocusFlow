import { Coffee, Disc2, Pause, RotateCcw } from 'lucide-react'
import { TimerSessionProgress } from './TimerSessionProgress'

interface TimerHeaderProps {
	reset: () => void
	badge: string
	badgeClassName: string
}

export function TimerHeader({
	reset,
	badge,
	badgeClassName
}: TimerHeaderProps) {
	const BadgeIcon =
		badge === 'BREAK' ? Coffee : badge === 'PAUSED' ? Pause : Disc2

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<span
					
					className={`inline-flex items-center gap-1 rounded-full px-2 py-2 text-xs uppercase font-menlo tracking-[1.7px] transition-colors duration-300 ${badgeClassName}`}
				>
					<BadgeIcon className='h-5' />
					{badge}
				</span>
			</div>

			<div className='inline-flex gap-2 items-center'>
				<button
					type='button'
					className='text-xs font-bold text-white/45 cursor-pointer hover:text-white/65'
					onClick={reset}
				>
					<RotateCcw className='h-5 w-5' />
				</button>
			</div>
		</div>
	)
}
