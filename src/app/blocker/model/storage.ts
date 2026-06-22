export const STORAGE_KEY = 'blockedSites'

export interface BlockedSite {
	id: string
	hostname: string
	enabled: boolean
}

export function normalizeHostname(value: string) {
	const url = value.includes('://') ? value : `https://${value}`

	return new URL(url).hostname.replace(/^www\./, '')
}

export async function getBlockedSites() {
	const result = await chrome.storage.local.get(STORAGE_KEY)
	return (result[STORAGE_KEY] as BlockedSite[] | undefined) ?? []
}

export async function setBlockedSites(sites: BlockedSite[]) {
	await chrome.storage.local.set({ [STORAGE_KEY]: sites })
}
