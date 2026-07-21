import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    // @baloise/ds-css uses modern CSS (e.g. `::details-content`) that Vite's
    // default lightningcss minifier doesn't parse yet. esbuild's CSS minifier
    // is more lenient and handles it fine.
    cssMinify: 'esbuild',
  },
  resolve: {
    // @baloise/ds-react is pnpm-linked in from outside this app (see
    // docs/adr/0004-react-smoke-test-app-outside-workspace.md), so without
    // deduping, Vite resolves two separate React copies - the app's own and
    // the one visible through the linked package - causing invalid hook calls.
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
