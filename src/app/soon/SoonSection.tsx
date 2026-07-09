import {
	ChartColumn,
	ListPlus,
	RefreshCw,
	Sparkles,
	type LucideIcon
} from 'lucide-react'

interface SoonFeature {
	title: string
	description: string
	Icon: LucideIcon
}

const soonFeatures: SoonFeature[] = [
	{
		title: 'Statistics',
		description: 'Deep insights into your focus habits.',
		Icon: ChartColumn
	},
	{
		title: 'Account sync',
		description: 'Seamless sync across all your devices.',
		Icon: RefreshCw
	},
	{
		title: 'Task creation',
		description: 'Add and manage tasks right in the panel.',
		Icon: ListPlus
	}
]

export function SoonSection() {
	return (
		<section className='mt-10' aria-labelledby='soon-section-title'>
			<div className='mb-3 flex items-center justify-between gap-3'>
				<h2
					id='soon-section-title'
					className='font-menlo text-[10px] tracking-[1.7px] text-muted'
				>
					SOON
				</h2>
				<span className='inline-flex h-7 items-center gap-2 rounded-full bg-orangeActive/10 px-3 font-menlo text-[10px]	 uppercase tracking-[1.7px] text-orangeActive'>
					<Sparkles className='h-4 w-4' aria-hidden='true' />
					In development
				</span>
			</div>

			<ul className='space-y-1.5' aria-label='Upcoming FocusFlow features'>
				{soonFeatures.map(({ title, description, Icon }) => (
					<li key={title}>
						<article className='flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-white/4 bg-surface px-3.5 py-3'>
							<div className='flex min-w-0 items-center gap-3'>
								<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brownHover text-orangeActive'>
									<Icon className='h-5 w-5' aria-hidden='true' />
								</div>

								<div className='min-w-0'>
									<h3 className='truncate text-base font-semibold text-white'>
										{title}
									</h3>
									<p className='truncate text-xs text-muted'>{description}</p>
								</div>
							</div>

							<span className='shrink-0 rounded-full bg-hoverMuted px-2.5 py-1 font-menlo text-[9px] uppercase tracking-[1.5px] text-muted'>
								Soon
							</span>
						</article>
					</li>
				))}
			</ul>
		</section>
	)
}
