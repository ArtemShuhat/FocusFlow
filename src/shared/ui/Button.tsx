type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'custom'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
}

export function Button({
	variant = 'secondary',
	className = '',
	...props
}: ButtonProps) {
	const variants = {
		primary:
			'bg-orangeActive text-black shadow-[0_0_18px_rgba(245,158,11,0.35)]',
		secondary: 'bg-[#1c1713] text-white border border-white/10',
		ghost: 'bg-transparent text-white hover:bg-white/5',
		custom: ''
	}

	return (
		<button
			className={`cursor-pointer inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold uppercase transition
				disabled:cursor-not-allowed disabled:saturate-90
				${variants[variant]}
				${className}
			`}
			{...props}
		/>
	)
}
