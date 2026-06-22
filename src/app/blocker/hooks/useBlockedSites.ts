import { useCallback, useEffect, useState } from 'react'
import {
	getBlockedSites,
	normalizeHostname,
	setBlockedSites,
	STORAGE_KEY,
	type BlockedSite
} from '../model/storage'

export function useBlockedSites() {
	const [sites, setSites] = useState<BlockedSite[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getBlockedSites().then(storedSites => {
			setSites(storedSites)
			setIsLoading(false)
		})

		// мб тут нужно сделать функцию чтобы вызывалось при рендере, а не 1 раз

		function handleStorageChange(
			changes: Record<string, chrome.storage.StorageChange>,
			areaName: string
		) {
			if (areaName !== 'local' || !changes[STORAGE_KEY]) return

			const storedChanges = changes[STORAGE_KEY].newValue as
				| BlockedSite[]
				| undefined

			setSites(storedChanges ?? [])
		}

		chrome.storage.onChanged.addListener(handleStorageChange)

		return () => {
			chrome.storage.onChanged.removeListener(handleStorageChange)
		}
	}, [])

	const addSite = useCallback(async (value: string) => {
		const hostname = normalizeHostname(value)
		const currentSite = await getBlockedSites()

		if (currentSite.some(site => site.hostname === hostname)) return

		const newSite: BlockedSite = {
			id: crypto.randomUUID(),
			hostname,
			enabled: true
		}

		await setBlockedSites([...currentSite, newSite])
	}, [])

	const removeSite = useCallback(async (id: string) => {
		const currentSite = await getBlockedSites()

		await setBlockedSites(currentSite.filter(site => site.id !== id))
	}, [])

	const toggleSite = useCallback(async (id: string) => {
		const currentSite = await getBlockedSites()

		await setBlockedSites(
			currentSite.map(site =>
				site.id === id ? { ...site, enabled: !site.enabled } : site
			)
		)
	}, [])

	return {
		sites,
		isLoading,
		addSite,
		removeSite,
		toggleSite
	}
}
