import { ChevronDown, Globe, Plus, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { useBlockedSites } from './hooks/useBlockedSites'
import { AddBlockedSiteModal } from './ui/AddBlockedSiteModal'
import { Button } from '@/shared/ui/Button'
import { SettingsBlockedSiteModal } from './ui/SettingsBlockedSiteModal'

const VISIBLE_SITES_COUNT = 5

export function BlockedSection() {
	const { sites, addSite, updateSite } = useBlockedSites()
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const hasHiddenSites = sites.length > VISIBLE_SITES_COUNT
	const visibleSites = isExpanded ? sites : sites.slice(0, VISIBLE_SITES_COUNT)

	const [editingSiteId, setEditingSiteId] = useState<string | null>(null)
	const editingSite = sites.find(site => site.id === editingSiteId) ?? null

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

						<div className='flex items-center gap-1'>
							<button
								className='flex h-8 w-8 items-center justify-center rounded-2xl text-muted/50 opacity-0 transition hover:bg-white/10 hover:text-white group-hover:opacity-100 focus-visible:opacity-100'
								onClick={() => setEditingSiteId(site.id)}
								aria-label={`Open settings for ${site.hostname}`}
								type='button'
							>
								<Settings2 className='h-5 w-5' />
							</button>
						</div>
					</div>
				))}
			</div>
			<Button
				type='button'
				variant='custom'
				size='sm'
				onClick={() => setIsAddModalOpen(true)}
				className='w-full border border-dashed border-orangeActive/40 bg-surface font-medium normal-case text-orangeActive hover:brightness-120'
			>
				<Plus className='h-6 w-6' />
				<span>Add</span>
			</Button>
			<AddBlockedSiteModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onSubmit={async (value, enabled) => {
					await addSite(value, { enabled })
					setIsAddModalOpen(false)
				}}
			/>
			<SettingsBlockedSiteModal
				onSubmit={async (id, value, enabled) => {
					await updateSite(id, { value, enabled })
					setEditingSiteId(null)
				}}
				isOpen={editingSite !== null}
				site={editingSite}
				onClose={() => setEditingSiteId(null)}
			/>
		</>
	)
}
