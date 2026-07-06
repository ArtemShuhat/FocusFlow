import type { FocusQuote } from './quotes'

export function getRandomQuotes(quotes: FocusQuote[], count: number) {
	return [...quotes].sort(() => Math.random() - 0.5).slice(0, count)
}
