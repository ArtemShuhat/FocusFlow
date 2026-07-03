import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'custom'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
}

export function Button({
	variant = 'secondary',
	size = 'md',
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

	const sizes = {
		sm: 'h-9 px-3 text-[14px]',
		md: 'px-6 py-3 text-sm',
		lg: 'h-14 px-6 text-base'
	}

	return (
		<button
			className={`cursor-pointer inline-flex items-center justify-center gap-2 rounded-2xl font-bold uppercase transition
				disabled:cursor-not-allowed disabled:saturate-90
				${variants[variant]}
				${sizes[size]}
				${className}
			`}
			{...props}
		/>
	)
}
