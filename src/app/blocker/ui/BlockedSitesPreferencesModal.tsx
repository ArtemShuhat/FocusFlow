import { Clock, SlidersHorizontal, X } from 'lucide-react'
import { useState, type SyntheticEvent } from 'react'
import { Button } from '@/shared/ui/Button'
import { Toggle } from '@/shared/ui/Toggle'
import type { BlockerSettings } from '../model/types'

interface BlockedSitesPreferencesModalProps {
	isOpen: boolean
	settings: BlockerSettings
	onSubmit: (settings: BlockerSettings) => Promise<void>
	onClose: () => void
}

export function BlockedSitesPreferencesModal({
	isOpen,
	settings,
	onClose,
	onSubmit
}: BlockedSitesPreferencesModalProps) {
	const [onlyBlockWhenTimerRunning, setOnlyBlockWhenTimerRunning] = useState(
		settings.onlyBlockWhenTimerRunning
	)
	const [redirectToFocusScreen, setRedirectToFocusScreen] = useState(
		settings.redirectToFocusScreen
	)
	const [isSubmitting, setIsSubmitting] = useState(false)

	if (!isOpen) return null

	async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
		event.preventDefault()
		if (isSubmitting) return

		setIsSubmitting(true)
		await onSubmit({
			onlyBlockWhenTimerRunning,
			redirectToFocusScreen
		})
		setIsSubmitting(false)
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-[2px]'>
			<form
				onSubmit={handleSubmit}
				className='relative w-[390px] max-w-full rounded-[28px] border border-orangeActive/45 bg-[#171310] px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.65),0_0_36px_rgba(242,166,24,0.12)]'
			>
				<button
					type='button'
					aria-label='Close blocked sites preferences modal'
					onClick={onClose}
					className='absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-white'
				>
					<X className='h-6 w-6' />
				</button>

				<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orangeActive/35 bg-orangeActive/10 text-orangeActive shadow-[0_0_24px_rgba(242,166,24,0.22)]'>
					<SlidersHorizontal className='h-7 w-7' />
				</div>

				<div className='mt-7 text-center'>
					<h2 className='text-2xl font-bold text-white'>
						Blocked sites settings
					</h2>
					<p className='mt-3 text-sm text-muted'>
						Control when and how site blocking works.
					</p>
				</div>

				<div className='mt-7 space-y-3'>
					<div className='flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-white/10 px-4 py-4 text-white'>
						<div className='min-w-0 `'>
							<p className='text-base font-semibold'>
								Only block when timer is running
							</p>
							<p className='mt-1 text-sm text-muted'>
								When "off" sites are always blocked.
							</p>
						</div>

						<Toggle
							checked={onlyBlockWhenTimerRunning}
							onCheckedChange={setOnlyBlockWhenTimerRunning}
							ariaLabel='Only block when timer is running'
						/>
					</div>

					<div className='flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-white/10 px-4 py-4 text-white'>
						<div className='min-w-0'>
							<p className='text-base font-semibold'>
								Redirect to Focus screen
							</p>
							<p className='mt-1 text-sm text-muted'>
								Show focus page instead of blocked website.
							</p>
						</div>

						<Toggle
							checked={redirectToFocusScreen}
							onCheckedChange={setRedirectToFocusScreen}
							ariaLabel='Redirect to Focus screen'
						/>
					</div>

					<button
						type='button'
						className='flex min-h-20 w-full items-center gap-4 rounded-2xl border border-white/10 px-4 py-4 text-left text-muted transition hover:bg-white/[0.03] hover:text-white'
					>
						<Clock className='h-7 w-7 shrink-0 text-orangeActive' />
						<div>
							<p className='font-menlo text-[10px] font-bold uppercase tracking-[1.9px] text-orangeActive'>
								Quick action
							</p>
							<p className='mt-2 text-base'>Pause blocking for 15 min</p>
						</div>
					</button>
				</div>

				<div className='mt-7 grid grid-cols-2 gap-4'>
					<Button
						type='button'
						variant='secondary'
						size='md'
						onClick={onClose}
						className='border-white/35 bg-transparent normal-case hover:bg-white/5'
					>
						Close
					</Button>
					<Button
						type='submit'
						variant='primary'
						size='md'
						disabled={isSubmitting}
						className='normal-case hover:brightness-95'
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	)
}
