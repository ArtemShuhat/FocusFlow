interface TimerArcProps {
	progress: number
	color: string
}

function polarToCartesian(
	centerX: number,
	centerY: number,
	radius: number,
	angleInDegrees: number
) {
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180

	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians)
	}
}

function describeArc(
	centerX: number,
	centerY: number,
	radius: number,
	startAngle: number,
	endAngle: number
) {
	const start = polarToCartesian(centerX, centerY, radius, startAngle)
	const end = polarToCartesian(centerX, centerY, radius, endAngle)
	const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

	return [
		'M',
		start.x,
		start.y,
		'A',
		radius,
		radius,
		0,
		largeArcFlag,
		1,
		end.x,
		end.y
	].join(' ')
}

export function TimerArc({ progress, color }: TimerArcProps) {
	const size = 220
	const center = size / 2
	const radius = 82

	const startAngle = -130
	const endAngle = 130

	const safeProgress = Math.min(1, Math.max(0, progress))

	const arcPath = describeArc(center, center, radius, startAngle, endAngle)
	const arcLength = Math.PI * radius * ((endAngle - startAngle) / 180)
	const dashOffset = arcLength * (1 - safeProgress)

	const dotAngle = startAngle + (endAngle - startAngle) * safeProgress
	const startDot = polarToCartesian(center, center, radius, startAngle)

	return (
		<svg
			viewBox={`0 0 ${size} ${size}`}
			className='absolute left-1/2 top-0 h-[220px] w-[220px] -translate-x-1/2'
		>
			<path
				d={arcPath}
				fill='none'
				stroke='rgba(255,255,255,0.12)'
				strokeWidth='3'
				strokeLinecap='round'
				strokeDasharray='1 6'
			/>

			<path
				d={arcPath}
				fill='none'
				stroke={color}
				strokeWidth='4'
				strokeLinecap='round'
				strokeDasharray={arcLength}
				strokeDashoffset={dashOffset}
				className='transition-[stroke-dashoffset] duration-300 ease-linear'
			/>

			<g
				style={{
					transformOrigin: `${center}px ${center}px`,
					transform: `rotate(${dotAngle - startAngle}deg)`,
					transition: 'transform 300ms linear'
				}}
			>
				<circle
					cx={startDot.x}
					cy={startDot.y}
					r='5'
					fill={color}
					className='drop-shadow-[0_0_8px_rgba(242,166,24,0.9)]'
				/>
			</g>
		</svg>
	)
}
