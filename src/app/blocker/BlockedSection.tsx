import { Settings2 } from 'lucide-react'

export function BlockedSection() {
	return (
		<>
			<div className='mt-8 flex justify-between items-center'>
				<h3 className='font-menlo text-[10px] tracking-[1.7px] text-muted font-[700]'>
					BLOCKED SITES
				</h3>
				<button>
					<Settings2 className='h-5 text-muted' />
				</button>
			</div>
			<div>
				<div className='group flex items-center gap-2.5 rounded-xl bg-surface px-3 py-2 border border-white/10 transition hover:brightness-120'></div>
			</div>
		</>
	)
}
