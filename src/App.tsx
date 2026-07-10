import { toast } from 'sonner'
import './App.css'
import { BlockedSection } from './app/blocker/BlockedSection'
import { Header } from './app/header/Header'
import { usePomodoroTimer } from './app/timer/hooks/usePomodoroTimer'
import { useTimerSettings } from './app/timer/hooks/useTimerSettings'
import { LONG_BREAK_EVERY } from './app/timer/model/constants'
import type { TimerSettings } from './app/timer/model/types'
import Timer from './app/timer/Timer'
import {
	getTimerVariant,
	timerThemes,
	TimerVariantConfig
} from './app/timer/ui/timerConfig'
import { TimerSessionProgress } from './app/timer/ui/TimerSessionProgress'
import { Toaster } from './shared/ui/Sonner'
import { SoonSection } from './app/soon/SoonSection'
import { Footer } from './app/footer/Footer'

export function App() {
	const { settings, updateSettings } = useTimerSettings()
	const timer = usePomodoroTimer(settings.soundVolume)
	const totalPoints = LONG_BREAK_EVERY
	const currentPoint = timer.cycleIndex
	const isBreak = timer.mode === 'longBreak' || timer.mode === 'shortBreak'
	const completedPoints = isBreak ? currentPoint : currentPoint - 1

	const variant = getTimerVariant(timer.mode, timer.status)
	const config = TimerVariantConfig[variant]
	const theme = timerThemes[config.accent]

	async function handleTimerSettingsSubmit(nextSettings: TimerSettings) {
		await updateSettings(nextSettings)

		timer.setDuration(nextSettings.durations)

		toast.success('Timer settings updated')
	}

	return (
		<>
			<Header
				timerSettings={settings}
				onTimerSettingsSubmit={handleTimerSettingsSubmit}
			/>
			<TimerSessionProgress
				currentPoint={currentPoint}
				completedPoints={completedPoints}
				totalPoints={totalPoints}
				cycleIndex={timer.cycleIndex}
				theme={theme}
			/>
			<Timer timer={timer} />
			<BlockedSection />
			<SoonSection />
			<Footer />
			<Toaster position='bottom-center' />
		</>
	)
}
