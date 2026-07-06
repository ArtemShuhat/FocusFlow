import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				background: resolve(__dirname, 'src/background.ts'),
				focus: resolve(__dirname, 'focus.html')
			},
			output: {
				entryFileNames: chunkInfo =>
					chunkInfo.name === 'background'
						? 'background.js'
						: 'assets/[name]-[hash].js'
			}
		}
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	},
	server: {
		watch: {
			usePolling: true
		}
	}
})
