import { Settings } from 'lucide-react'
import { TimerSettingsModal } from '../timer/ui/TimerSettingsModal'
import { useState } from 'react'
import type { TimerSettings } from '../timer/model/types'

interface HeaderProps {
	timerSettings: TimerSettings
	isTimerSettingsLoading: boolean
	onTimerSettingsSubmit: (settings: TimerSettings) => Promise<void>
}

export function Header({
	timerSettings,
	isTimerSettingsLoading,
	onTimerSettingsSubmit
}: HeaderProps) {
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

	async function handleTimerSettingsSubmit(settings: TimerSettings) {
		await onTimerSettingsSubmit(settings)
		setIsSettingsModalOpen(false)
	}

	return (
		<header className='flex justify-between items-center mt-4'>
			<div className='flex items-center gap-2'>
				<img src='/logo.png' alt='logo FocusFlow' className='w-10 h-10' />
				<h1 className='text-2xl font-semibold tracking-wide'>
					<span className='text-white'>Focus</span>Flow
				</h1>
			</div>
			<div className='flex justify-between gap-5 text-muted '>
				<button
					type='button'
					aria-label='Open timer settings'
					disabled={isTimerSettingsLoading}
					onClick={() => setIsSettingsModalOpen(true)}
					className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 text-muted transition duration-200 hover:bg-white/10 hover:text-white/65 disabled:cursor-wait disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-muted'
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
