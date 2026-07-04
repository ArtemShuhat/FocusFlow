export interface BlockedSite {
	id: string
	hostname: string
	enabled: boolean
}

export interface AddBlockedSiteOptions {
	enabled?: boolean
}

export interface BlockerSettings {
	onlyBlockWhenTimerRunning: boolean
	redirectToFocusScreen: boolean
}
