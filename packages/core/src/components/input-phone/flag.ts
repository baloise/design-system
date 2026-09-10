import { getAssetPath } from '@stencil/core'

/**
 * Flags are copied to `assets/flags` for both the www and dist Stencil
 * outputs. `getAssetPath` resolves that folder relative to the loader's
 * resources URL (www: `/build/` → `/assets/flags`; dist: `design-system/` →
 * `dist/assets/flags`).
 */
export function getFlagUrl(code: string): string {
  return getAssetPath(`../assets/flags/${code.toUpperCase()}.svg`)
}
