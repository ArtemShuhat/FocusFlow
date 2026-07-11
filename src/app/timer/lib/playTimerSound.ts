import timerSound from '@/assets/sounds/sound-timer.mp3'

export function playTimerSound(volume: number) {
	const audio = new Audio(timerSound)

	audio.volume = Math.min(1, Math.max(0, volume / 100))
	audio.play().catch(error => {
		console.warn('Failed to play timer sound', error)
	})
}
