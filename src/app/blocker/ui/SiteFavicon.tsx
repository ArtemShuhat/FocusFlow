import { Globe } from 'lucide-react'
import { useState } from 'react'

interface SiteFaviconProps {
	hostname: string
}

export function SiteFavicon({ hostname }: SiteFaviconProps) {
	const [hasError, setHasError] = useState(false)

	const faviconURL = new URL(chrome.runtime.getURL('/_favicon/'))
	faviconURL.searchParams.set('pageUrl', `https://${hostname}`)
	faviconURL.searchParams.set('size', '32')

	if (hasError) {
		return <Globe className='h-5 w-5 text-muted/60' />
	}

	return (
		<img
			src={faviconURL.toString()}
			alt=''
			className='h-5 w-5 rounded-sm'
			onError={() => setHasError(true)}
		/>
	)
}
