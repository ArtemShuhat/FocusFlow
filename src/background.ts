import { getBlockedSites, STORAGE_KEY } from './app/blocker/model/storage'

const BLOCKING_RULE_ID_START = 1

async function syncBlockingRules() {
	const blockedSites = await getBlockedSites()

	const enabledSites = blockedSites.filter(site => site.enabled)

	const existingRules = await chrome.declarativeNetRequest.getDynamicRules()
	const blockingRules: chrome.declarativeNetRequest.Rule[] = enabledSites.map(
		(site, index) => ({
			id: BLOCKING_RULE_ID_START + index,
			priority: 1,
			action: {
				type: chrome.declarativeNetRequest.RuleActionType.BLOCK
			},
			condition: {
				urlFilter: `||${site.hostname}/`,
				resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME]
			}
		})
	)

	await chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: existingRules.map(rule => rule.id),
		addRules: blockingRules
	})
}

chrome.runtime.onInstalled.addListener(syncBlockingRules)
chrome.runtime.onStartup.addListener(syncBlockingRules)

chrome.storage.onChanged.addListener((changes, areaName) => {
	if (areaName !== 'local') return
	if (!changes[STORAGE_KEY]) return

	syncBlockingRules()
})
