import './App.css'
import { Header } from './app/header/Header'
import { usePomodoroTimer } from './app/timer/hooks/usePomodoroTimer'
import Timer from './app/timer/Timer'
import {
	getTimerVariant,
	timerThemes,
	TimerVariantConfig
} from './app/timer/ui/timerConfig'
import { TimerSessionProgress } from './app/timer/ui/TimerSessionProgress'

export function App() {
	const timer = usePomodoroTimer()
	const currentPoint = Math.min(timer.focusCompleted + 1, 4)

	const variant = getTimerVariant(timer.mode, timer.status)
	const config = TimerVariantConfig[variant]
	const theme = timerThemes[config.accent]

	return (
		<>
			<Header />
			<TimerSessionProgress
				currentPoint={currentPoint}
				totalPoints={4}
				cycleIndex={timer.cycleIndex}
				theme={theme}
			/>
			<Timer timer={timer} />
		</>
	)
}
