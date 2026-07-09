import { Settings } from 'lucide-react'
import { TimerSettingsModal } from '../timer/ui/TimerSettingsModal'
import { useState } from 'react'
import type { TimerSettings } from '../timer/model/types'

interface HeaderProps {
	timerSettings: TimerSettings
	onTimerSettingsSubmit: (settings: TimerSettings) => Promise<void>
}

export function Header({ timerSettings, onTimerSettingsSubmit }: HeaderProps) {
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

	async function handleTimerSettingsSubmit(settings: TimerSettings) {
		await onTimerSettingsSubmit(settings)
		setIsSettingsModalOpen(false)
	}

	return (
		<header className='flex justify-between items-center mt-4'>
			<h1 className='font-mono text-2xl font-semibold'>
				<span className='text-white'>Focus</span>Flow
			</h1>
			<div className='flex justify-between gap-5 text-muted '>
				<button
					onClick={() => setIsSettingsModalOpen(true)}
					className='flex h-10 w-10 items-center justify-center transition text-muted cursor-pointer hover:text-white/65 rounded-full hover:bg-white/10 p-2 duration-200'
				>
					<Settings className='w-7 h-7' />
				</button>

				<TimerSettingsModal
					isOpen={isSettingsModalOpen}
					onClose={() => setIsSettingsModalOpen(false)}
					onSubmit={handleTimerSettingsSubmit}
					settings={timerSettings}
				/>
			</div>
		</header>
	)
}
