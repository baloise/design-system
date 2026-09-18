import { cpSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * `ds-input-phone`'s flag SVGs (see `packages/core`'s `flag.ts`/`getFlagUrl()`) are requested at a
 * fixed runtime path (`<base>/assets/flags/<CODE>.svg`, per `initializeDesignSystem`'s `setAssetPath()`
 * call — see `packages/core/CONTEXT.md`'s "Asset path" section) that this app, like any consumer, must
 * serve itself. Copying them into `public/assets/flags` at the start of every dev/build run — rather
 * than checking the copy into git — keeps this in sync with `@baloise/ds-core`'s own copy automatically.
 */
function copyPhoneFlags(): Plugin {
  return {
    name: 'copy-ds-input-phone-flags',
    buildStart() {
      const src = fileURLToPath(new URL('../../packages/core/assets/flags', import.meta.url))
      const dest = join(dirname(fileURLToPath(import.meta.url)), 'public/assets/flags')
      if (existsSync(src)) {
        cpSync(src, dest, { recursive: true })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copyPhoneFlags()],
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
