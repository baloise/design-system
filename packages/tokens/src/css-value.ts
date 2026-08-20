import { tokenNameToCssVar } from './css-naming.js'

/**
 * Mirrors the `ds/color/rgba` transform: DTCG color values already carry a `hex` field in this
 * token set (see `tokens/Base.tokens.json`), so this only needs to add an `rgba()` wrapper when
 * `alpha < 1`.
 */
export const colorValueToCss = (value: unknown): string | null => {
  if (typeof value !== 'object' || value === null || !('hex' in value)) {
    return null
  }
  const { hex, alpha } = value as { hex: string; alpha?: number }
  if (typeof hex !== 'string') {
    return null
  }
  if (typeof alpha === 'number' && alpha < 1) {
    const stripped = hex.replace('#', '')
    const r = parseInt(stripped.substring(0, 2), 16)
    const g = parseInt(stripped.substring(2, 4), 16)
    const b = parseInt(stripped.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  return hex
}

const ROUND_TOKEN_NAME_MARKERS = ['line-height', 'lineheight', 'opacity']

/**
 * Mirrors `ds/size/round`. Case-insensitive because callers pass different name casings
 * depending on the platform's name transform - kebab-case for CSS/SCSS (`ds/css/name`), PascalCase
 * for JS (`ds/js/name`).
 */
export const roundNumberValue = (value: number, tokenName: string): number => {
  const lowerName = tokenName.toLowerCase()
  if (ROUND_TOKEN_NAME_MARKERS.some(marker => lowerName.includes(marker))) {
    return Math.round(value * 10) / 10
  }
  return value
}

const NUMBER_ONLY_PATH_MARKERS = [
  'LineHeight',
  'FontWeight',
  'Opacity',
  '🌫️ Opacity',
  'ZIndex',
  'Z-Index',
  '🗂️ ZIndex',
  '🗂️ Z-Index',
  'Interaction',
  '✨ Interaction',
]
const PIXEL_PATH_MARKERS = ['📐 Breakpoint', 'Breakpoint', '🗃️ Container', 'Container']

/** Mirrors `ds/size/rem`: converts a px number into rem, unless the token's path says otherwise. */
export const numberValueToCssSize = (value: number, path: string[]): string | number => {
  if (`${value}`.endsWith('px') || `${value}`.endsWith('rem')) {
    return value
  }
  if (NUMBER_ONLY_PATH_MARKERS.some(marker => path.includes(marker))) {
    return Math.round(value * 10) / 10
  }
  if (PIXEL_PATH_MARKERS.some(marker => path.includes(marker))) {
    return `${value}px`
  }
  if (value === 9999) {
    return `${value}px`
  }
  return `${value / 16}rem`
}

/**
 * Turns a resolved DTCG token value into a CSS-ready string, for the live token preview
 * (`apps/toky`) to send as a `--ds-*` custom property value. Mirrors the `ds/color/rgba` /
 * `ds/size/round` / `ds/size/rem` Style Dictionary transforms via the functions above, so the
 * preview never drifts from what the build actually produces (see ADR-0021). Returns `null` for
 * value shapes it doesn't recognize, so the caller can skip that token rather than send garbage.
 */
export const resolvedValueToCss = (value: unknown, type: string, path: string[]): string | null => {
  if (type === 'color') {
    return colorValueToCss(value)
  }
  if (type === 'number' && typeof value === 'number') {
    const cssVarName = tokenNameToCssVar(path)
    const rounded = roundNumberValue(value, cssVarName)
    return `${numberValueToCssSize(rounded, path)}`
  }
  if (type === 'string' && typeof value === 'string') {
    return value
  }
  return null
}
