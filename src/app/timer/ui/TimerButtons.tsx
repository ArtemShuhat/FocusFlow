import { Button } from '@/shared/ui/Button'
import { Pause, Play } from 'lucide-react'

type TimerButtonConfig = {
	label: string
	onClick: () => void
	disabled?: boolean
}

interface TimerButtonsProps {
	primaryButton: TimerButtonConfig
	secondaryButton: TimerButtonConfig | null
	theme: {
		button: string
	}
}

export function TimerButtons({
	primaryButton,
	secondaryButton,
	theme
}: TimerButtonsProps) {
	return (
		<div
			key={primaryButton.label + secondaryButton?.label}
			className='grid grid-cols-2 gap-3 mb-4 mx-4 animate-[fadeIn_180ms_ease-out]'
		>
			<Button
				variant='custom'
				className={`${theme.button} hover:brightness-80`}
				onClick={primaryButton.onClick}
				disabled={primaryButton.disabled}
			>
				<Play className='h-5' />
				{primaryButton.label}
			</Button>

			<Button
				variant='secondary'
				onClick={secondaryButton?.onClick}
				disabled={secondaryButton?.disabled}
				className='hover:brightness-90'
			>
				<Pause className='h-5' />
				{secondaryButton?.label}
			</Button>
		</div>
	)
}
