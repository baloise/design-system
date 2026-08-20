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

interface DtcgBorderValue {
  color: unknown
  width: unknown
  style: unknown
}

/**
 * Turns a border token's {color, width, style} into a CSS-ready border shorthand value, e.g.
 * '0.125rem solid #d8d8d8'. Reuses colorValueToCss/dimensionValueToCss per sub-value rather than
 * Style Dictionary's own built-in `border/css/shorthand` transform, which renders each sub-value
 * as a `var(--ds-*)` reference to its sibling custom property instead of a resolved literal —
 * diverging from this codebase's convention (see shadowValueToCss, and
 * docs/plans/border-token-type-plan.md decision 6).
 *
 * Unlike shadow's sub-values (always inline literals), border's `color`/`width` are references to
 * separate real `color`/`dimension` tokens. By the time this transform runs in the actual build
 * (after `color/css`/`size/rem` have processed those referenced tokens), Style Dictionary has
 * already substituted their *post-transform* string value (e.g. '#d0d0d0', '0.125rem') into this
 * composite's $value — so color/width may arrive pre-stringified rather than as raw DTCG objects.
 * Toky's live preview (via resolvedValueToCss), which calls this directly on raw resolved values
 * with no prior color/dimension transform, still needs the raw-object path.
 */
export const borderValueToCss = (value: unknown): string | null => {
  if (typeof value !== 'object' || value === null) return null
  const { color, width, style } = value as DtcgBorderValue
  const cssColor = typeof color === 'string' ? color : colorValueToCss(color)
  const cssWidth = typeof width === 'string' ? width : dimensionValueToCss(width)
  if (cssColor === null || cssWidth === null || typeof style !== 'string') return null
  return `${cssWidth} ${style} ${cssColor}`
}

interface DtcgTypographyValue {
  fontFamily: unknown
  fontSize: unknown
  fontWeight: unknown
  lineHeight: unknown
}

export interface TypographyCssValue {
  fontFamily: string
  fontSize: string
  fontWeight: string
  lineHeight: string
}

// Suffix appended to a typography token's own CSS var name for each of its 4 longhand custom
// properties, e.g. `--ds-typography-heading-1-font-family` (see
// docs/plans/typography-token-type-plan.md decision 5 — 4 separate declarations, never a `font`
// shorthand). Exported so both the real build's format step and Toky's live preview build the
// exact same 4 names from one token path.
export const TYPOGRAPHY_CSS_SUFFIXES: Record<keyof TypographyCssValue, string> = {
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  lineHeight: 'line-height',
}

/**
 * Turns a typography token's {fontFamily, fontSize, fontWeight, lineHeight} into 4 CSS-ready
 * strings, one per sub-property. Reuses fontFamilyValueToCss/dimensionValueToCss per sub-value,
 * same reasoning as shadowValueToCss/borderValueToCss.
 *
 * fontFamily/fontWeight are always references in this codebase (docs/plans/typography-token-type-
 * plan.md decision 4), so by the time this runs in the real build (after `ds/font-family`/
 * `ds/font-weight` have processed the referenced tokens), Style Dictionary has already substituted
 * their *post-transform* string value — same "may arrive pre-stringified" duality borderValueToCss
 * documents. fontSize/lineHeight are free literal-or-reference, so either sub-value may arrive as a
 * raw DTCG value (literal, untouched by any sibling transform) or an already-transformed string
 * (referenced a real Font.Size or Font.LineHeight token). Toky's live preview (via
 * computePreviewTokens) always calls this on raw resolved values, never pre-stringified ones.
 */
export const typographyValueToCss = (value: unknown): TypographyCssValue | null => {
  if (typeof value !== 'object' || value === null) return null
  const { fontFamily, fontSize, fontWeight, lineHeight } = value as DtcgTypographyValue

  const cssFontFamily =
    typeof fontFamily === 'string' ? fontFamily : Array.isArray(fontFamily) ? fontFamilyValueToCss(fontFamily) : null
  const cssFontSize = typeof fontSize === 'string' ? fontSize : dimensionValueToCss(fontSize)
  const cssFontWeight =
    typeof fontWeight === 'string' ? fontWeight : typeof fontWeight === 'number' ? `${fontWeight}` : null
  const cssLineHeight =
    typeof lineHeight === 'string' ? lineHeight : typeof lineHeight === 'number' ? `${lineHeight}` : null

  if (cssFontFamily === null || cssFontSize === null || cssFontWeight === null || cssLineHeight === null) return null

  return { fontFamily: cssFontFamily, fontSize: cssFontSize, fontWeight: cssFontWeight, lineHeight: cssLineHeight }
}

// The $extensions key a responsive dimension token's breakpoint values live under — see
// docs/plans/responsive-dimension-token-plan.md. Duplicated (not shared) from
// apps/toky/src/tokens/types.ts's identical constant, since the two packages have no common
// module to import it from — same "two independent implementations agree on a vocabulary" pattern
// as `com.figma.variableId` (see packages/tokens/CONTEXT.md's Figma Sync section).
export const RESPONSIVE_DIMENSION_EXTENSION_KEY = 'com.helvetia.responsive'

export interface ResponsiveDimensionCssValue {
  mobile: string
  tablet: string
  desktop: string
}

// Suffix appended to a responsive dimension token's own CSS var name for each of its 3 breakpoint
// declarations, e.g. `--ds-space-lg-mobile` — matches the -mobile/-tablet/-desktop convention the
// pre-existing sibling-token responsive pattern already uses (see formatter.ts's
// `ds/css/variables-responsive`), so that pattern's existing name-suffix-based -device media-query
// splitting needs zero changes to also handle these (see docs/plans/responsive-dimension-token-
// plan.md Phase 2's "key design win").
export const RESPONSIVE_DIMENSION_CSS_SUFFIXES: Record<keyof ResponsiveDimensionCssValue, string> = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
}

/**
 * Turns a responsive dimension token's already-reference-resolved {mobile, tablet, desktop}
 * breakpoint map into 3 CSS-ready size strings. "Already-resolved" mirrors typographyValueToCss's
 * own precondition — this doesn't walk $extensions or resolve `{reference}` strings itself;
 * callers do that first (Toky's flatten.ts via `resolvedResponsive`; formatter.ts's own
 * dictionary-based lookup for the real build, since Style Dictionary never resolves references
 * living inside $extensions the way it automatically does for $value — see the plan's "Open
 * technical question"). Returns null (not a partial object) if any breakpoint is unresolvable,
 * same "don't half-render" discipline as typographyValueToCss.
 */
export const responsiveDimensionValueToCss = (value: unknown): ResponsiveDimensionCssValue | null => {
  if (typeof value !== 'object' || value === null) return null
  const { mobile, tablet, desktop } = value as { mobile: unknown; tablet: unknown; desktop: unknown }
  const cssMobile = dimensionValueToCss(mobile)
  const cssTablet = dimensionValueToCss(tablet)
  const cssDesktop = dimensionValueToCss(desktop)
  if (cssMobile === null || cssTablet === null || cssDesktop === null) return null
  return { mobile: cssMobile, tablet: cssTablet, desktop: cssDesktop }
}

/**
 * Turns a resolved DTCG token value into a CSS-ready string, for the live token preview
 * (`apps/toky`) to send as a `--ds-*` custom property value. Mirrors the `ds/color/rgba` /
 * `ds/size/round` / `ds/size/rem` Style Dictionary transforms via the functions above, so the
 * preview never drifts from what the build actually produces (see ADR-0021). Returns `null` for
 * value shapes it doesn't recognize, so the caller can skip that token rather than send garbage.
 *
 * No `'typography'` branch: unlike every other type here, one typography token maps to 4 CSS
 * custom properties, not 1 (decision 5) — this function's single-`string`-or-`null` return shape
 * can't carry that. Callers needing typography go straight to `typographyValueToCss` instead and
 * fan the result out to 4 `--ds-*-{font-family,font-size,font-weight,line-height}` names
 * themselves (see `apps/toky/src/tokens/css-preview.ts` and the `ds/css/variables-*` formatters).
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
  if (type === 'border') {
    return borderValueToCss(value)
  }
  if (type === 'string' && typeof value === 'string') {
    return value
  }
  return null
}
