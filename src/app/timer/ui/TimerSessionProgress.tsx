interface TimerSessionProgressProps {
	currentPoint: number
	totalPoints: number
	cycleIndex: number
	theme: {
		text: string
		bg: string
		button: string
		badge: string
		glow: string
		arc: string
	}
}

export function TimerSessionProgress({
	currentPoint,
	totalPoints,
	cycleIndex,
	theme
}: TimerSessionProgressProps) {
	const safePoint = Math.min(Math.max(currentPoint, 1), totalPoints)

	const progress = totalPoints <= 1 ? 0 : (safePoint - 1) / (totalPoints - 1)

	return (
		<>
			<div className='mt-8 mb-2 flex items-center gap-2 justify-between'>
				<div className='inline-flex items-center gap-2'>
					<span
						className='h-2 w-2 rounded-full border transition-colors duration-300'
						style={{
							borderColor: theme.arc,
							backgroundColor: theme.arc
						}}
					/>
					<p
						className='font-mono font-normal text-[13px]'
						style={{
							color: theme.arc,
						}}
					>
						FOCUS SESSION
					</p>
				</div>

				<span className='text-xs uppercase text-white/35 font-menlo tracking-[1.7px]'>
					CYCLE {cycleIndex}
				</span>
			</div>
			<div className='relative h-5 w-full'>
				<div className='absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/15' />

				<div
					className='absolute left-0 top-1/2 h-[2px] -translate-y-1/2'
					style={{
						width: `${progress * 100}%`,
						backgroundColor: theme.arc
					}}
				/>

				{Array.from({ length: totalPoints }).map((_, index) => {
					const point = index + 1
					const isActive = point <= safePoint
					const isCurrent = point === safePoint
					const left = totalPoints <= 1 ? 0 : (index / (totalPoints - 1)) * 100

					return (
						<span
							key={point}
							className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300 ${
								isCurrent ? 'shadow-[0_0_14px_rgba(242,166,24,0.9)]' : ''
							}`}
							style={{
								left: `${left}%`,
								borderColor: isActive ? theme.arc : 'rgba(255,255,255,0.25)',
								backgroundColor: isActive ? theme.arc : '#191411',
								boxShadow: isCurrent ? `0 0 14px ${theme.arc}` : undefined
							}}
						/>
					)
				})}
			</div>
		</>
	)
}
