import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_BLOCKER_SETTINGS } from '../model/constants'
import { getBlockerSettings, setBlockerSettings } from '../model/storage'
import type { BlockerSettings } from '../model/types'

export function useBlockerSettings() {
	const [settings, setSettings] = useState(DEFAULT_BLOCKER_SETTINGS)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getBlockerSettings().then(storedSettings => {
			setSettings(storedSettings)
			setIsLoading(false)
		})
	}, [])

	const updateSettings = useCallback(async (nextSettings: BlockerSettings) => {
		await setBlockerSettings(nextSettings)
		setSettings(nextSettings)
	}, [])

	return {
		settings,
		isLoading,
		updateSettings
	}
}
