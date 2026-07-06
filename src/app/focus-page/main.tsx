import { createRoot } from 'react-dom/client'
import '@/index.css'
import { FocusPage } from './ui/FocusPage'
import { StrictMode } from 'react'

createRoot(document.getElementById('focus-root')!).render(
	<StrictMode>
		<FocusPage />
	</StrictMode>
)
