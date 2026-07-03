import { Toaster as Sonner, type ToasterProps } from 'sonner'
import {
	CircleCheckIcon,
	InfoIcon,
	TriangleAlertIcon,
	OctagonXIcon,
	Loader2Icon
} from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme='dark'
			className='toaster group'
			icons={{
				success: <CircleCheckIcon className='size-4' />,
				info: <InfoIcon className='size-4' />,
				warning: <TriangleAlertIcon className='size-4' />,
				error: <OctagonXIcon className='size-4' />,
				loading: <Loader2Icon className='size-4 animate-spin' />
			}}
			style={
				{
					'--normal-bg': '#2A221D',
					'--normal-text': '#ffffff',
					'--normal-border': '#ffffff',
					'--border-radius': '16px'
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast:
						'font-mono shadow-[0_14px_40px_rgba(0,0,0,0.7),0_0_18px_rgba(242,166,24,0.12)]',
					title: 'text-white',
					description: 'text-muted',
					icon: 'text-orangeActive'
				}
			}}
			{...props}
		/>
	)
}

export { Toaster }
