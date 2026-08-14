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

// The only categories still $type: "number" — everything unit-bearing (Space, Radius, Border,
// FontSize, Breakpoint, Container, ...) migrated to $type: "dimension" (see
// docs/plans/dimension-token-type-plan.md). What's left is always unitless; LineHeight/Opacity
// round to 1 decimal, ZIndex/Interaction pass through as-is.
const NUMBER_ONLY_PATH_MARKERS = [
  'LineHeight',
  'Opacity',
  '🌫️ Opacity',
  'ZIndex',
  'Z-Index',
  '🗂️ ZIndex',
  '🗂️ Z-Index',
  'Interaction',
  '✨ Interaction',
]

/** Mirrors `ds/size/round`: rounds a LineHeight/Opacity-path number to 1 decimal; passes everything else through unchanged. */
export const numberValueToCssSize = (value: number, path: string[]): number => {
  if (NUMBER_ONLY_PATH_MARKERS.some(marker => path.includes(marker))) {
    return Math.round(value * 10) / 10
  }
  return value
}

const CSS_GENERIC_FONT_KEYWORDS = new Set([
  'inherit',
  'initial',
  'unset',
  'revert',
  'revert-layer',
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'ui-serif',
  'ui-sans-serif',
  'ui-monospace',
  'ui-rounded',
  'math',
  'emoji',
  'fangsong',
])

/** Quote iff the name isn't a bare CSS identifier and isn't a generic keyword (e.g. sans-serif, inherit). */
const needsFontNameQuoting = (name: string): boolean =>
  !CSS_GENERIC_FONT_KEYWORDS.has(name.toLowerCase()) && /[^a-zA-Z0-9-]/.test(name)

/**
 * Joins a fontFamily token's array (or single string, per DTCG) into a CSS-ready font-family
 * declaration, quoting only entries that need it. Generic keywords and simple identifiers stay
 * bare — quoting `sans-serif` or `inherit` would make CSS look for a font literally named that,
 * instead of the real generic fallback/keyword behavior.
 */
export const fontFamilyValueToCss = (value: unknown): string => {
  const names = Array.isArray(value) ? value : [value]
  return names.map(name => (needsFontNameQuoting(String(name)) ? `"${name}"` : String(name))).join(', ')
}

/**
 * Turns a dimension token's {value, unit} into a CSS-ready size, e.g. {value: 1.5, unit: 'rem'} ->
 * '1.5rem'. A trivial passthrough — the source $value already holds the number in its own native
 * unit (see docs/plans/dimension-token-type-plan.md), so there's no rem<->px conversion to do here;
 * that only happens at the Figma push/pull boundary, where Figma's px-only reality lives.
 */
export const dimensionValueToCss = (value: unknown): string | null => {
  if (typeof value !== 'object' || value === null || !('value' in value) || !('unit' in value)) {
    return null
  }
  const { value: num, unit } = value as { value: unknown; unit: unknown }
  if (typeof num !== 'number' || (unit !== 'px' && unit !== 'rem')) {
    return null
  }
  return `${num}${unit}`
}

interface DtcgShadowLayer {
  color: unknown
  offsetX: unknown
  offsetY: unknown
  blur: unknown
  spread: unknown
  inset?: boolean
}

/** One shadow layer -> one CSS box-shadow value, e.g. 'inset 0px 4px 0.25rem 0px rgba(0, 0, 0, 0.15)'. */
const shadowLayerToCss = (layer: DtcgShadowLayer): string | null => {
  const color = colorValueToCss(layer.color)
  const offsetX = dimensionValueToCss(layer.offsetX)
  const offsetY = dimensionValueToCss(layer.offsetY)
  const blur = dimensionValueToCss(layer.blur)
  const spread = dimensionValueToCss(layer.spread)
  if (color === null || offsetX === null || offsetY === null || blur === null || spread === null) {
    return null
  }
  return `${layer.inset ? 'inset ' : ''}${offsetX} ${offsetY} ${blur} ${spread} ${color}`
}

/**
 * Turns a shadow token's value (a single shadow object, an array of them, or an empty array for
 * "no shadow") into a CSS-ready box-shadow value. Reuses colorValueToCss/dimensionValueToCss per
 * sub-value rather than Style Dictionary's own built-in shadow transform, which renders color as
 * `rgb(0% 0% 0% / 0.25)` (colorjs.io's default) instead of this codebase's `rgba(0, 0, 0, 0.25)`/
 * hex convention — see docs/plans/shadow-token-type-plan.md.
 */
export const shadowValueToCss = (value: unknown): string | null => {
  if (Array.isArray(value)) {
    if (value.length === 0) return 'none'
    const layers = value.map(v => shadowLayerToCss(v as DtcgShadowLayer))
    return layers.every((layer): layer is string => layer !== null) ? layers.join(', ') : null
  }
  if (typeof value === 'object' && value !== null) {
    return shadowLayerToCss(value as DtcgShadowLayer)
  }
  return null
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
  if (type === 'fontWeight' && (typeof value === 'number' || typeof value === 'string')) {
    return `${Number(value)}`
  }
  if (type === 'fontFamily') {
    return fontFamilyValueToCss(value)
  }
  if (type === 'dimension') {
    return dimensionValueToCss(value)
  }
  if (type === 'shadow') {
    return shadowValueToCss(value)
  }
  if (type === 'string' && typeof value === 'string') {
    return value
  }
  return null
}
