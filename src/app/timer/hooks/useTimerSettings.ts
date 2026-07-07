import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_TIMER_SETTINGS } from '../model/constants'
import { getTimerSettings, setTimerSettings } from '../model/storage'
import type { TimerSettings } from '../model/types'

export function useTimerSettings() {
	const [settings, setSettings] = useState(DEFAULT_TIMER_SETTINGS)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getTimerSettings().then(storedSettings => {
			setSettings(storedSettings)
			setIsLoading(false)
		})
	}, [])

	const updateSettings = useCallback(async (nextSettings: TimerSettings) => {
		await setTimerSettings(nextSettings)
		setSettings(nextSettings)
	}, [])

	return {
		settings,
		isLoading,
		updateSettings
	}
}
