import { ChevronDown, Globe, Plus, Settings2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useBlockedSites } from './hooks/useBlockedSites'

const VISIBLE_SITES_COUNT = 5

export function BlockedSection() {
	const [url, setUrl] = useState('')
	const { sites, addSite, isLoading, removeSite } = useBlockedSites()

	const [isExpanded, setIsExpanded] = useState(false)
	const hasHiddenSites = sites.length > VISIBLE_SITES_COUNT
	const visibleSites = isExpanded ? sites : sites.slice(0, VISIBLE_SITES_COUNT)

	return (
		<>
			<div className='mt-8 flex justify-between items-center mb-3'>
				<h3 className='font-menlo text-[10px] tracking-[1.7px] text-muted font-bold'>
					BLOCKED SITES
				</h3>
				<div className='flex items-center gap-1'>
					{hasHiddenSites && (
						<button
							aria-label={
								isExpanded
									? 'Collapse blocked sites list'
									: 'Expand blocked sites list'
							}
							type='button'
							onClick={() => setIsExpanded(value => !value)}
							className='flex h-7 w-7 items-center justify-center rounded-lg text-muted transition hover:bg-surface hover:text-foreground'
						>
							<ChevronDown
								className={`h-5 w-5 transition-transform ${
									isExpanded ? 'rotate-180' : ''
								}`}
							/>
						</button>
					)}
					<button aria-label='Open blocker settings' type='button'>
						<Settings2 className='h-5 text-muted' />
					</button>
				</div>
			</div>
			<div className='mb-1'>
				{visibleSites.map(site => (
					<div
						className='group flex items-center justify-between gap-2.5 rounded-2xl bg-surface px-3 py-2 border border-white/10 transition hover:brightness-120 h-10 mb-1'
						key={site.id}
					>
						<div className='flex items-center gap-2 min-w-0'>
							<div className='flex h-8 w-8 items-center justify-center rounded-lg'>
								<Globe className='h-5 w-5 text-muted/60' />
							</div>

							<p className='min-w-0 truncate text-white font-normal tracking-wider text-lg'>
								{site.hostname}
							</p>
						</div>

						<button
							className='flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition rounded-2xl hover:bg-destructive/25 h-8 w-8 hover:text-destructive text-muted/50'
							onClick={() => removeSite(site.id)}
							aria-label={`Remove ${site.hostname}`}
							type='button'
						>
							<Trash2 className='w-5 h-5' />
						</button>
					</div>
				))}
			</div>
			<form
				onSubmit={async event => {
					event.preventDefault()

					const trimmedUrl = url.trim()
					if (!trimmedUrl) return

					await addSite(trimmedUrl)
					setUrl('')
				}}
				className='group flex items-center justify-center gap-1 rounded-2xl bg-surface px-3 py-2 border border-orangeActive/40 border-dashed transition hover:brightness-120 text-[14px] font-medium h-9'
			>
				<Plus className='w-6 h-6' />
				<input
					value={url}
					onChange={event => setUrl(event.target.value)}
					placeholder='site.com'
					className='min-w-0 flex-1 bg-transparent outline-none'
					type='text'
				/>
				<button aria-label={'Add site'} type='submit'>
					Add
				</button>
			</form>
		</>
	)
}
