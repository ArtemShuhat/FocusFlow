import './App.css'
import { Header } from './app/header/Header'
import { usePomodoroTimer } from './app/timer/hooks/usePomodoroTimer'
import Timer from './app/timer/Timer'
import { TimerSessionProgress } from './app/timer/ui/TimerSessionProgress'

export function App() {
	const timer = usePomodoroTimer()

	const currentPoint = Math.min(timer.focusCompleted + 1, 4)

	return (
		<>
			<Header />
			<TimerSessionProgress
				currentPoint={currentPoint}
				totalPoints={4}
				cycleIndex={timer.cycleIndex}
			/>
			<Timer timer={timer} />
		</>
	)
}
