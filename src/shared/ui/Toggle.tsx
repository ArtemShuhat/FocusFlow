interface ToggleProps {
	checked: boolean
	onCheckedChange: (checked: boolean) => void
	ariaLabel: string
	disabled?: boolean
}

export function Toggle({
	checked,
	onCheckedChange,
	ariaLabel,
	disabled = false
}: ToggleProps) {
	return (
		<button
			type='button'
			role='switch'
			aria-label={ariaLabel}
			aria-checked={checked}
			disabled={disabled}
			onClick={() => onCheckedChange(!checked)}
			className={`flex h-7 w-[52px] items-center rounded-full p-1 transition disabled:cursor-not-allowed disabled:opacity-60 ${
				checked ? 'bg-orangeActive' : 'bg-white/15'
			}`}
		>
			<span
				className={`h-5 w-5 rounded-full bg-white transition ${
					checked ? 'translate-x-7.5' : 'translate-x-0.5'
				}`}
			/>
		</button>
	)
}
