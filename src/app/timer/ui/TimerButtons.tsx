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
		<div className='grid grid-cols-2 gap-3 mb-4 mx-4'>
			<Button
				variant='custom'
				className={theme.button}
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
			>
				<Pause className='h-5' />
				{secondaryButton?.label}
			</Button>
		</div>
	)
}
