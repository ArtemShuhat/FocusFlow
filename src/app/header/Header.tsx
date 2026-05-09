import { Clock, Settings } from 'lucide-react'

export function Header() {
	return (
		<header className=' flex justify-between items-center mt-4'>
			<h1 className='font-mono text-2xl font-semibold'>
				<span className='text-white'>Focus</span>Flow
			</h1>
			<div className='flex justify-between gap-5 text-muted '>
				<Clock className='w-6' />
				<Settings className='w-6' />
			</div>
		</header>
	)
}
