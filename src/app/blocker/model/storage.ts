import { DEFAULT_BLOCKER_SETTINGS } from './constants'
import type { BlockedSite, BlockerSettings } from './types'

export const BLOCKED_SITES_STORAGE_KEY = 'blockedSites'
export const BLOCKER_SETTINGS_STORAGE_KEY = 'blockerSettings'
export const STORAGE_KEY = BLOCKED_SITES_STORAGE_KEY

export function normalizeHostname(value: string) {
	const url = value.includes('://') ? value : `https://${value}`

	return new URL(url).hostname.replace(/^www\./, '')
}

type StoredBlockedSite = {
	id?: string
	hostname: string
	enabled?: boolean
	enable?: boolean
}

function normalizeStoredBlockedSites(value: unknown): BlockedSite[] {
	if (!Array.isArray(value)) return []

	return value
		.filter((site): site is StoredBlockedSite => {
			return (
				typeof site === 'object' &&
				site !== null &&
				typeof site.hostname === 'string'
			)
		})
		.map(site => ({
			id: site.id ?? crypto.randomUUID(),
			hostname: site.hostname,
			enabled: site.enabled ?? site.enable ?? true
		}))
}

export async function getBlockedSites() {
	const result = await chrome.storage.local.get(BLOCKED_SITES_STORAGE_KEY)
	return normalizeStoredBlockedSites(result[BLOCKED_SITES_STORAGE_KEY])
}

export async function setBlockedSites(sites: BlockedSite[]) {
	await chrome.storage.local.set({ [BLOCKED_SITES_STORAGE_KEY]: sites })
}

export async function getBlockerSettings() {
	const result = await chrome.storage.local.get(BLOCKER_SETTINGS_STORAGE_KEY)

	return {
		...DEFAULT_BLOCKER_SETTINGS,
		...(result[BLOCKER_SETTINGS_STORAGE_KEY] as
			| Partial<BlockerSettings>
			| undefined)
	}
}

export async function setBlockerSettings(settings: BlockerSettings) {
	await chrome.storage.local.set({ [BLOCKER_SETTINGS_STORAGE_KEY]: settings })
}
