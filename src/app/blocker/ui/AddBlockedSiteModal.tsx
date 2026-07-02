import { Globe, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'

interface AddBlockedSiteModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (value: string, enabled: boolean) => Promise<void>
}

export function AddBlockedSiteModal({
	isOpen,
	onClose,
	onSubmit
}: AddBlockedSiteModalProps) {
	const [url, setUrl] = useState('')
	const [enabledImmediately, setEnabledImmediately] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)

	if (!isOpen) return null

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const trimmedUrl = url.trim()
		if (!trimmedUrl || isSubmitting) return

		setIsSubmitting(true)
		await onSubmit(trimmedUrl, enabledImmediately)
		setIsSubmitting(false)
		setUrl('')
		setEnabledImmediately(true)
	}

	function handleCancel() {
		setUrl('')
		setEnabledImmediately(true)
		onClose()
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-[2px]'>
			<form
				onSubmit={handleSubmit}
				className='relative w-[390px] max-w-full rounded-[28px] border border-orangeActive/45 bg-[#171310]/95 px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.65),0_0_36px_rgba(242,166,24,0.12)]'
			>
				<button
					type='button'
					aria-label='Close add blocked site modal'
					onClick={handleCancel}
					className='absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-white'
				>
					<X className='h-6 w-6' />
				</button>

				<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orangeActive/35 bg-orangeActive/10 text-orangeActive shadow-[0_0_24px_rgba(242,166,24,0.22)]'>
					<Globe className='h-7 w-7' />
				</div>

				<div className='mt-6 text-center'>
					<h2 className='text-2xl font-bold text-white'>Add blocked site</h2>
					<p className='mt-3 text-sm text-muted'>
						Enter a domain or full URL to block it in FocusFlow.
					</p>
				</div>

				<div className='mt-7'>
					<label
						htmlFor='blocked-site'
						className='font-menlo text-[11px] font-bold uppercase tracking-[1.9px] text-orangeActive'
					>
						Website
					</label>

					<input
						id='blocked-site'
						value={url}
						onChange={event => setUrl(event.target.value)}
						placeholder='youtube.com or https://example.com'
						className='mt-3 h-14 w-full rounded-2xl border border-orangeActive bg-transparent px-4 text-lg text-white outline-none transition placeholder:text-muted/70 focus:shadow-[0_0_0_3px_rgba(242,166,24,0.16)]'
						type='text'
						required
					/>

					<p className='mt-3 text-sm text-muted'>
						We'll automatically normalize the hostname.
					</p>
				</div>

				<div className='mt-6 flex h-14 items-center justify-between rounded-2xl border border-white/10 px-4 text-white'>
					<span className='text-base'>Enable immediately</span>
					<button
						type='button'
						role='switch'
						aria-checked={enabledImmediately}
						onClick={() => setEnabledImmediately(value => !value)}
						className={`flex h-7 w-[52px] items-center rounded-full p-1 transition ${
							enabledImmediately ? 'bg-orangeActive' : 'bg-white/15'
						}`}
					>
						<span
							className={`h-5 w-5 rounded-full bg-white transition ${
								enabledImmediately ? 'translate-x-6' : 'translate-x-0'
							}`}
						/>
					</button>
				</div>

				<div className='mt-6 grid grid-cols-2 gap-4'>
					<button
						type='button'
						onClick={handleCancel}
						className='h-14 rounded-2xl border border-white/35 text-base font-bold text-white transition hover:bg-white/5'
					>
						Cancel
					</button>
					<button
						type='submit'
						disabled={isSubmitting}
						className='h-14 rounded-2xl bg-orangeActive text-base font-bold text-black shadow-[0_0_18px_rgba(242,166,24,0.34)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:saturate-75'
					>
						Add site
					</button>
				</div>
			</form>
		</div>
	)
}
