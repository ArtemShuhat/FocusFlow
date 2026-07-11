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
								<span className='font-semibold text-white'>Artem</span>
							</p>
						</div>

						<nav
							aria-label='Author social links'
							className='mt-6 flex justify-center gap-3'
						>
							<a
								href='https://github.com/ArtemShuhat'
								target='_blank'
								rel='noreferrer'
								aria-label='Open Artem Shuhat GitHub profile'
								title='GitHub'
								className='group flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white/90 transition hover:bg-orangeActive/15 hover:text-orangeActive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeActive'
							>
								<GitHubLogo className='h-[22px] w-[22px] transition-transform group-hover:-translate-y-0.5' />
							</a>
							<a
								href='https://t.me/ArtemShuhat'
								target='_blank'
								rel='noreferrer'
								aria-label='Open Artem Shuhat Telegram profile'
								title='Telegram'
								className='group flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white/90 transition hover:bg-orangeActive/15 hover:text-orangeActive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeActive'
							>
								<TelegramLogo className='h-[22px] w-[22px] transition-transform group-hover:-translate-y-0.5' />
							</a>
						</nav>

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

function GitHubLogo({ className }: { className?: string }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 640 640'
			fill='currentColor'
			aria-hidden='true'
			className={className}
		>
			<path d='M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z' />
		</svg>
	)
}

function TelegramLogo({ className }: { className?: string }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 640 640'
			fill='currentColor'
			aria-hidden='true'
			className={className}
		>
			<path d='M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM435 240.7C431.3 279.9 415.1 375.1 406.9 419C403.4 437.6 396.6 443.8 390 444.4C375.6 445.7 364.7 434.9 350.7 425.7C328.9 411.4 316.5 402.5 295.4 388.5C270.9 372.4 286.8 363.5 300.7 349C304.4 345.2 367.8 287.5 369 282.3C369.2 281.6 369.3 279.2 367.8 277.9C366.3 276.6 364.2 277.1 362.7 277.4C360.5 277.9 325.6 300.9 258.1 346.5C248.2 353.3 239.2 356.6 231.2 356.4C222.3 356.2 205.3 351.4 192.6 347.3C177.1 342.3 164.7 339.6 165.8 331C166.4 326.5 172.5 322 184.2 317.3C256.5 285.8 304.7 265 328.8 255C397.7 226.4 412 221.4 421.3 221.2C423.4 221.2 427.9 221.7 430.9 224.1C432.9 225.8 434.1 228.2 434.4 230.8C434.9 234 435 237.3 434.8 240.6z' />
		</svg>
	)
}
