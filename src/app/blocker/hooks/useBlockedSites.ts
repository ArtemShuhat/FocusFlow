import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'blockedSites'

interface BlockedSite {
	id: string
	hostname: string
	enabled: boolean
}

function normalizeHostname(value: string) {
	const url = value.includes('://') ? value : `https://${value}`

	return new URL(url).hostname.replace(/^www\./, '')
}

export function useBlockedSites() {
	const [sites, setSites] = useState<BlockedSite[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		chrome.storage.local.get(STORAGE_KEY).then(result => {
			const storedSites = result[STORAGE_KEY] as BlockedSite[] | undefined

			setSites(storedSites ?? [])
			setIsLoading(false)
		})

		// мб тут нужно сделать функцию чтобы вызывалось при рендере а не 1 раз

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
		const result = await chrome.storage.local.get(STORAGE_KEY)
		const currentSite: BlockedSite[] =
			(result[STORAGE_KEY] as BlockedSite[] | undefined) ?? []

		if (currentSite.some(site => site.hostname === hostname)) return

		const newSite: BlockedSite = {
			id: crypto.randomUUID(),
			hostname,
			enabled: true
		}

		await chrome.storage.local.set({
			[STORAGE_KEY]: [...currentSite, newSite]
		})
	}, [])

	const removeSite = useCallback(async (id: string) => {
		const result = await chrome.storage.local.get(STORAGE_KEY)
		const currentSite: BlockedSite[] =
			(result[STORAGE_KEY] as BlockedSite[] | undefined) ?? []

		await chrome.storage.local.set({
			[STORAGE_KEY]: currentSite.filter(site => site.id !== id)
		})
	}, [])

	const toggleSite = useCallback(async (id: string) => {
		const result = await chrome.storage.local.get(STORAGE_KEY)
		const currentSite: BlockedSite[] =
			(result[STORAGE_KEY] as BlockedSite[] | undefined) ?? []

		await chrome.storage.local.set({
			[STORAGE_KEY]: currentSite.map(site =>
				site.id === id ? { ...site, enabled: !site.enabled } : site
			)
		})
	}, [])

	return {
		sites,
		isLoading,
		addSite,
		removeSite,
		toggleSite
	}
}
