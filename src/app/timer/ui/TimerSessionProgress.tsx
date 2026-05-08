interface TimerSessionProgressProps {
	currentPoint: number
	totalPoints: number
	cycleIndex: number
}

export function TimerSessionProgress({
	currentPoint,
	totalPoints,
	cycleIndex
}: TimerSessionProgressProps) {
	const safePoint = Math.min(Math.max(currentPoint, 1), totalPoints)

	const progress = totalPoints <= 1 ? 0 : (safePoint - 1) / (totalPoints - 1)

	return (
		<>
			<div className='mt-8 mb-2 flex items-center gap-2 justify-between'>
				<div className='inline-flex items-center gap-2'>
					<span className='h-2 w-2 rounded-full border border-orangeActive bg-orangeActive' />
					<p className='font-mono font-normal text-[13px]'>FOCUS SESSION</p>
				</div>

				<span className='text-xs uppercase text-white/35 font-menlo tracking-[1.7px]'>
					CYCLE {cycleIndex}
				</span>
			</div>
			<div className='relative h-5 w-full'>
				<div className='absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/15' />

				<div
					className='absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-orangeActive'
					style={{ width: `${progress * 100}%` }}
				/>

				{Array.from({ length: totalPoints }).map((_, index) => {
					const point = index + 1
					const isActive = point <= safePoint
					const isCurrent = point === safePoint
					const left = totalPoints <= 1 ? 0 : (index / (totalPoints - 1)) * 100

					return (
						<span
							key={point}
							className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
								isActive
									? 'border-orangeActive bg-orangeActive'
									: 'border-white/25 bg-[#191411]'
							} ${isCurrent ? 'shadow-[0_0_14px_rgba(242,166,24,0.9)]' : ''}`}
							style={{ left: `${left}%` }}
						/>
					)
				})}
			</div>
		</>
	)
}
