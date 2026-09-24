import { Flags } from '@helvetia-design/assets'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

/**
 * Flags are bundled as inline SVG strings in `@helvetia-design/assets` (same build-time approach as
 * `ds-icon`, see docs/adr/0033-ds-input-phone-bundled-svg-flags.md) — no runtime asset path or
 * consumer-side asset copy is needed.
 */
export function getFlagSvg(code: string): string {
  const flag: string | undefined = (Flags as Record<string, string>)[`Flag${upperFirst(camelCase(code))}`]
  if (!flag) {
    console.error(`Flag for country code "${code}" not found in @helvetia-design/assets.`)
    return ''
  }
  return flag
}
