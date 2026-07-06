import timerSound from '@/assets/sounds/sound-timer.mp3'

export function playTimerSound() {
	const audio = new Audio(timerSound)

	audio.volume = 0.9
	audio.play().catch(error => {
		console.warn('Failed to play timer sound', error)
	})
}
