import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/BACR-Website/',
  build: {
    // tools/prerender.mjs uses this to rewrite SSR asset imports
    // (`/src/assets/logo.png`) to the hashed files Vite actually emits.
    manifest: true,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.{js,jsx}'],
  },
})
