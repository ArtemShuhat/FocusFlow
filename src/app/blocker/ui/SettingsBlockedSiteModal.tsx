import { Globe, Trash2, X } from 'lucide-react'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Toggle } from '@/shared/ui/Toggle'
import type { BlockedSite } from '../model/types'
import { useBlockedSites } from '../hooks/useBlockedSites'

interface SettingsBlockedSiteModalProps {
	isOpen: boolean
	site: BlockedSite | null
	onClose: () => void
	onSubmit: (id: string, value: string, enabled: boolean) => Promise<void>
	onDelete: (id: string) => Promise<void>
}

export function SettingsBlockedSiteModal({
	isOpen,
	site,
	onClose,
	onSubmit,
	onDelete
}: SettingsBlockedSiteModalProps) {
	if (!isOpen || !site) return null

	return (
		<SettingsBlockedSiteForm
			key={site.id}
			site={site}
			onClose={onClose}
			onSubmit={onSubmit}
			onDelete={onDelete}
		/>
	)
}

interface SettingsBlockedSiteFormProps {
	site: BlockedSite
	onClose: () => void
	onSubmit: (id: string, value: string, enabled: boolean) => Promise<void>
	onDelete: (id: string) => Promise<void>
}

function SettingsBlockedSiteForm({
	site,
	onClose,
	onSubmit,
	onDelete
}: SettingsBlockedSiteFormProps) {
	const [url, setUrl] = useState(site.hostname)
	const [enabled, setEnabled] = useState(site.enabled)
	const { removeSite } = useBlockedSites()

	async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
		event.preventDefault()

		const trimmedUrl = url.trim()
		if (!trimmedUrl) return

		await onSubmit(site.id, trimmedUrl, enabled)
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-[2px]'>
			<form
				onSubmit={handleSubmit}
				className='relative w-[390px] max-w-full rounded-[28px] border border-orangeActive/45 bg-[#171310] px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.65),0_0_36px_rgba(242,166,24,0.12)]'
			>
				<button
					type='button'
					aria-label='Close site settings modal'
					onClick={onClose}
					className='absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-white'
				>
					<X className='h-6 w-6' />
				</button>

				<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orangeActive/35 bg-orangeActive/10 text-orangeActive shadow-[0_0_24px_rgba(242,166,24,0.22)]'>
					<Globe className='h-7 w-7' />
				</div>

				<div className='mt-7 text-center'>
					<h2 className='text-2xl font-bold text-white'>Site settings</h2>
					<p className='mt-3 text-sm text-muted'>
						Manage this blocked website.
					</p>
				</div>

				<div className='mt-7'>
					<label
						htmlFor='settings-blocked-site'
						className='font-menlo text-[10px] font-bold uppercase tracking-[1.9px] text-orangeActive'
					>
						URL
					</label>

					<input
						id='settings-blocked-site'
						type='text'
						value={url}
						onChange={event => setUrl(event.target.value)}
						className='mt-2 h-14 w-full rounded-2xl border border-orangeActive bg-transparent px-4 text-lg text-white outline-none transition placeholder:text-muted/70'
						required
					/>

					<p className='mt-3 text-sm text-muted'>
						You can change the domain or paste a full URL.
					</p>
				</div>

				<div className='mt-7 flex items-center justify-between gap-4 text-white'>
					<div>
						<p className='text-lg'>Block this site</p>
						<p className='mt-1 text-sm text-muted'>
							Turn off to temporarily allow access.
						</p>
					</div>

					<Toggle
						checked={enabled}
						onCheckedChange={setEnabled}
						ariaLabel='Block this site'
					/>
				</div>

				<div className='mt-7 flex min-w-0 items-center justify-between'>
					<div className='min-w-0'>
						<p className='text-lg text-red-400'>Delete site</p>
						<p className='mt-1 text-sm text-muted'>
							Remove it from your blocked sites list.
						</p>
					</div>
					<button
						type='button'
						aria-label={`Delete ${site.hostname}`}
						onClick={() => onDelete(site.id)}
						className='flex h-10 w-10 items-center justify-center rounded-full border border-transparent transition hover:bg-hoverMuted'
					>
						<Trash2 className='h-7 w-7 shrink-0 text-red-400' />
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
						Cancel
					</Button>
					<Button
						type='submit'
						variant='primary'
						size='md'
						className='normal-case hover:brightness-95'
					>
						Save changes
					</Button>
				</div>
			</form>
		</div>
	)
}
