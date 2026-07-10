import { ChevronDown, Plus, Settings, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { useBlockedSites } from './hooks/useBlockedSites'
import { useBlockerSettings } from './hooks/useBlockerSettings'
import { AddBlockedSiteModal } from './ui/AddBlockedSiteModal'
import { Button } from '@/shared/ui/Button'
import { SettingsBlockedSiteModal } from './ui/BlockedSiteSettingsModal'
import { SiteFavicon } from './ui/SiteFavicon'
import { toast } from 'sonner'
import { BlockedSitesPreferencesModal } from './ui/BlockedSitesPreferencesModal'

const VISIBLE_SITES_COUNT = 5

export function BlockedSection() {
	const { sites, addSite, updateSite, removeSite } = useBlockedSites()
	const { settings, updateSettings } = useBlockerSettings()
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const hasHiddenSites = sites.length > VISIBLE_SITES_COUNT
	const visibleSites = isExpanded ? sites : sites.slice(0, VISIBLE_SITES_COUNT)

	const [editingSiteId, setEditingSiteId] = useState<string | null>(null)
	const editingSite = sites.find(site => site.id === editingSiteId) ?? null

	return (
		<>
			<div className='mt-8 flex justify-between items-center mb-2'>
				<h3 className='font-menlo text-[10px] tracking-[1.7px] text-muted'>
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
					<button
						aria-label='Open blocker settings'
						type='button'
						onClick={() => setIsPreferencesModalOpen(true)}
						className='flex h-9 w-9 items-center justify-center  transition	text-muted cursor-pointer hover:text-white/65 rounded-full hover:bg-white/10 p-2 duration-200'
					>
						<Settings2 className='h-7 w-7' />
					</button>
				</div>
			</div>
			<div className='mb-1'>
				{visibleSites.map(site => (
					<div
						className='group flex items-center justify-between gap-2.5 rounded-2xl bg-surface px-3.5 py-5.5 border border-white/4 transition hover:brightness-120 h-10 mb-1'
						key={site.id}
					>
						<div className='flex items-center gap-2 min-w-0'>
							<div className='flex h-8 w-8 items-center justify-center rounded-lg'>
								<SiteFavicon hostname={site.hostname} />
							</div>

							<p className='min-w-0 truncate text-white font-normal tracking-wider text-base'>
								{site.hostname}
							</p>
						</div>

						<div className='flex items-center gap-1'>
							<button
								className='flex h-8 w-8 items-center justify-center rounded-2xl text-muted opacity-0 transition hover:bg-white/10 hover:text-white/65 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer'
								onClick={() => setEditingSiteId(site.id)}
								aria-label={`Open settings for ${site.hostname}`}
								type='button'
							>
								<Settings className='h-5 w-5' />
							</button>
						</div>
					</div>
				))}
			</div>
			<Button
				type='button'
				variant='custom'
				size='md'
				onClick={() => setIsAddModalOpen(true)}
				className='w-full border border-dashed border-orangeActive/40 bg-surface normal-case text-orangeActive hover:brightness-120 !py-2	'
			>
				<Plus className='h-4 w-4' strokeWidth={2.5} />
				<p className='text-base font-semibold normal-case'>Add Site</p>
			</Button>
			<AddBlockedSiteModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onSubmit={async (value, enabled) => {
					await addSite(value, { enabled })
					setIsAddModalOpen(false)

					toast.success('Site added')
				}}
			/>
			<SettingsBlockedSiteModal
				isOpen={editingSite !== null}
				site={editingSite}
				onClose={() => setEditingSiteId(null)}
				onSubmit={async (id, value, enabled) => {
					await updateSite(id, { value, enabled })
					setEditingSiteId(null)
					toast.success('Site settings updated')
				}}
				onDelete={async id => {
					await removeSite(id)
					setEditingSiteId(null)
					toast.success('Site removed')
				}}
			/>
			<BlockedSitesPreferencesModal
				isOpen={isPreferencesModalOpen}
				settings={settings}
				onClose={() => setIsPreferencesModalOpen(false)}
				onSubmit={async nextSettings => {
					await updateSettings(nextSettings)
					setIsPreferencesModalOpen(false)
					toast.success('Blocker settings updated')
				}}
			/>
		</>
	)
}
