import { Info, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId } from 'react'
import { Button } from '@/shared/ui/Button'

interface AboutModalProps {
	isOpen: boolean
	onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
	const titleId = useId()
	const descriptionId = useId()

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-[2px]'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.05 }}
				>
					<motion.section
						role='dialog'
						aria-modal='true'
						aria-labelledby={titleId}
						aria-describedby={descriptionId}
						className='relative w-[390px] max-w-full rounded-[28px] border border-orangeActive/45 bg-[#171310] px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.65),0_0_36px_rgba(242,166,24,0.12)]'
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 6 }}
						transition={{ duration: 0.05, ease: 'easeOut' }}
					>
						<button
							type='button'
							aria-label='Close about modal'
							onClick={onClose}
							className='absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-white'
						>
							<X className='h-6 w-6' />
						</button>

						<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orangeActive/35 bg-orangeActive/10 text-orangeActive shadow-[0_0_24px_rgba(242,166,24,0.22)]'>
							<Info className='h-7 w-7' />
						</div>

						<div className='mt-4 text-center'>
							<h2 id={titleId} className='text-2xl font-bold text-white'>
								About FocusFlow
							</h2>
							<p id={descriptionId} className='mt-2 text-sm text-muted'>
								A focused workspace for your browser.
							</p>
						</div>

						<div className='mt-7 space-y-4 text-sm leading-6 text-muted'>
							<p>
								FocusFlow is a Chrome extension that combines a Pomodoro timer
								with a website blocker to help you protect your attention and
								build a calmer focus routine.
							</p>
							<p>
								Created and developed by{' '}
								<span className='font-semibold text-white'>Artem Shuhat</span>.
							</p>
						</div>

						<Button
							type='button'
							variant='primary'
							size='md'
							onClick={onClose}
							className='mt-7 w-full normal-case hover:brightness-95'
						>
							Close
						</Button>
					</motion.section>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
