import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // @baloise/ds-react is a symlinked workspace package (pnpm workspace
    // protocol), so without deduping, Vite can resolve two separate React
    // copies - the app's own and the one visible through the symlink -
    // causing invalid hook calls.
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
})
