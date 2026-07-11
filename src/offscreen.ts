import { playTimerSound } from './app/timer/lib/playTimerSound'
import { TIMER_SOUND_MESSAGE_TYPE } from './app/timer/model/constants'

chrome.runtime.onMessage.addListener(message => {
	if (message?.target !== 'offscreen') return
	if (message.type !== TIMER_SOUND_MESSAGE_TYPE) return
	if (typeof message.volume !== 'number') return

	playTimerSound(message.volume)
})
