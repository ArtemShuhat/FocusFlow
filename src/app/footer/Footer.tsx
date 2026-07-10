import { CircleQuestionMark, Info } from 'lucide-react'
import { useState } from 'react'
import { AboutModal } from './ui/AboutModal'

export function Footer() {
	const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)

	return (
		<>
			<footer className='mb-2 mt-10 flex justify-between text-muted'>
				<button
					type='button'
					onClick={() => setIsAboutModalOpen(true)}
					className='flex cursor-pointer items-center gap-2 transition hover:text-white'
				>
					<Info className='h-5 w-5' />
					<span className='text-sm'>About</span>
				</button>
				<a
					href='https://mail.google.com/mail/?view=cm&fs=1&to=focusflow.app.support@gmail.com'
					target='_blank'
					rel='noreferrer'
					className='flex cursor-pointer items-center gap-2 transition hover:text-white'
				>
					<CircleQuestionMark className='h-5 w-5' />
					<span className='text-sm'>Support</span>
				</a>
			</footer>

			<AboutModal
				isOpen={isAboutModalOpen}
				onClose={() => setIsAboutModalOpen(false)}
			/>
		</>
	)
}
