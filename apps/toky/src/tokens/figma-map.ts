// Figma → DTCG value/alias mapping for Pull (from Figma) — the reverse of
// scripts/figma-sync/lib/figma-value.mjs's figmaValueFor/resolvedTypeFor and
// lib/alias.mjs's forward alias resolution. Not imported from there (Node-only,
// outside apps/toky's module boundary) — see docs/adr/0002.
import type { FigmaId } from './types'

// STRING and FLOAT are both non-bijective: 'string'/'fontWeight'/'fontFamily'
// all project onto STRING, and now 'number'/'dimension' both project onto
// FLOAT (Figma has no font-weight/font-stack/rem concept — see
// docs/plans/font-weight-token-type-plan.md,
// docs/plans/font-family-token-type-plan.md,
// docs/plans/dimension-token-type-plan.md), so this table alone can't tell
// same-resolvedType siblings apart. figma-pull.ts's deriveValue resolves the
// ambiguity for a *matched* variable by using the locally-linked token's own
// $type (and, for dimension, its unit) as a hint instead of calling
// dtcgTypeFor at all. This table (and its 'string'/'number' defaults) is
// only reached for a brand-new Figma variable with no local counterpart — an
// accepted edge case, since new token definitions originate in code
// (Base.tokens.json), not by a designer inventing a variable straight in
// Figma. A pulled-in fontWeight/fontFamily variable lands as 'string', and a
// pulled-in dimension variable lands as 'number' (raw px), until a human
// retypes it in code.
//
// 'shadow' doesn't go through this table at all — a shadow token maps to 5
// Figma variables, not 1, so figma-pull.ts handles it with a dedicated
// pass (deriveShadowPullEntries) rather than dtcgTypeFor/deriveValue's
// one-variable-in, one-token-out shape. See
// docs/plans/shadow-token-type-plan.md.
const DTCG_TYPE_BY_RESOLVED_TYPE: Record<string, string> = {
  COLOR: 'color',
  FLOAT: 'number',
  STRING: 'string',
  BOOLEAN: 'boolean',
}

export function dtcgTypeFor(resolvedType: string): string {
  const dtcgType = DTCG_TYPE_BY_RESOLVED_TYPE[resolvedType]
  if (!dtcgType) {
    throw new Error(`Unsupported Figma resolvedType "${resolvedType}" — no known DTCG $type mapping.`)
  }
  return dtcgType
}

// Inverse of scripts/figma-sync/lib/figma-value.mjs's
// FONT_WEIGHT_KEYWORD_BY_NUMBER — reimplemented here rather than imported
// (Node-only module, outside apps/toky's boundary — see this file's header).
// Exact-case match only: this is meant to recognize exactly what our own
// push side generates, not to guess at manual Figma edits typed in a
// different case/spacing (docs/plans/font-weight-token-type-plan.md).
const FONT_WEIGHT_NUMBER_BY_KEYWORD: Record<string, number> = {
  'Thin': 100,
  'Extra-Light': 200,
  'Light': 300,
  'Regular': 400,
  'Medium': 500,
  'Semi-Bold': 600,
  'Bold': 700,
  'Extra-Bold': 800,
  'Black': 900,
  'Extra-Black': 950,
}

// Returns undefined for a string that doesn't match one of the 10 known
// DTCG font-weight keywords — the caller treats that as unsupported rather
// than guessing, matching this codebase's "fail loudly" pattern elsewhere.
export function fontWeightNumberFromKeyword(value: unknown): number | undefined {
  return typeof value === 'string' ? FONT_WEIGHT_NUMBER_BY_KEYWORD[value] : undefined
}

export interface FigmaColor {
  r: number
  g: number
  b: number
  a: number
}

export interface DtcgColorValue {
  colorSpace: 'srgb'
  components: [number, number, number]
  alpha: number
  hex: string
}

function channelToHexByte(value: number): string {
  return Math.round(Math.min(1, Math.max(0, value)) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase()
}

// Figma's color value carries no hex field (unlike our DTCG leaves, which
// always do) — see figma-value.mjs's figmaValueFor, which only ever reads
// components/alpha off the DTCG side, never writes hex to the Figma side.
// `hex` is always 6 digits (RGB only) — alpha is carried separately in its
// own field, never baked into the hex string. Confirmed against real data:
// Base.tokens.json's translucent colors (e.g. Component.Close.Color.
// Background.Hover, alpha 0.1) still store a plain 6-digit hex.
export function dtcgColorFromFigma({ r, g, b, a }: FigmaColor): DtcgColorValue {
  const hex = `#${channelToHexByte(r)}${channelToHexByte(g)}${channelToHexByte(b)}`
  return { colorSpace: 'srgb', components: [r, g, b], alpha: a, hex }
}

// Tolerance-based per ADR-0002 — Figma's REST API round-trips floats (e.g.
// 0.5 becomes 0.5000000074505806), so bit-exact comparison would flag
// spurious "changes" on every pull. Comparing at hex/byte precision (the
// resolution that's actually visually/data meaningful) absorbs that drift.
// `hex` alone only covers r/g/b — alpha is compared the same way (rounded to
// a byte) since it's carried as its own field, not baked into hex.
export function isColorEqual(a: FigmaColor, b: FigmaColor): boolean {
  const colorA = dtcgColorFromFigma(a)
  const colorB = dtcgColorFromFigma(b)
  return colorA.hex === colorB.hex && channelToHexByte(colorA.alpha) === channelToHexByte(colorB.alpha)
}

// Compares two already-DTCG-shaped literal values (both sides have already
// gone through dtcgColorFromFigma by the time figma-pull.ts calls this — see
// isColorEqual above for comparing raw Figma {r,g,b,a} colors directly).
// Colors compare by `hex` + byte-rounded `alpha`, the same tolerance
// ADR-0002 calls for; every other type compares exactly.
export function isLiteralValueEqual(dtcgType: string, a: unknown, b: unknown): boolean {
  if (dtcgType === 'color') {
    const colorA = a as DtcgColorValue | undefined
    const colorB = b as DtcgColorValue | undefined
    if (!colorA || !colorB) return colorA === colorB
    return colorA.hex === colorB.hex && channelToHexByte(colorA.alpha) === channelToHexByte(colorB.alpha)
  }
  if (dtcgType === 'shadow') {
    // Field-by-field, not JSON.stringify — a plain string compare would be
    // sensitive to object key insertion order, which Base.tokens.json's own
    // authored layers and dtcgShadowLayerFromFigma's reconstructed ones
    // aren't guaranteed to share.
    type ShadowLayerLike = { color: unknown; offsetX: unknown; offsetY: unknown; blur: unknown; spread: unknown }
    const shadowA = a as ShadowLayerLike | undefined
    const shadowB = b as ShadowLayerLike | undefined
    if (!shadowA || !shadowB) return shadowA === shadowB
    return (
      isLiteralValueEqual('color', shadowA.color, shadowB.color) &&
      isLiteralValueEqual('dimension', shadowA.offsetX, shadowB.offsetX) &&
      isLiteralValueEqual('dimension', shadowA.offsetY, shadowB.offsetY) &&
      isLiteralValueEqual('dimension', shadowA.blur, shadowB.blur) &&
      isLiteralValueEqual('dimension', shadowA.spread, shadowB.spread)
    )
  }
  if (dtcgType === 'border') {
    // Field-by-field, same reasoning as shadow above. `color`/`width` compare as resolved
    // literals (color/dimension) — `style` compares as a bare string, since
    // dtcgBorderFromFigma resolves it back to a `{🔗 Alias.▭ Border.Style.<Keyword>}` reference
    // string (decision 4), not a literal, so both sides are always already-comparable strings.
    type BorderLike = { color: unknown; width: unknown; style: unknown }
    const borderA = a as BorderLike | undefined
    const borderB = b as BorderLike | undefined
    if (!borderA || !borderB) return borderA === borderB
    return (
      isLiteralValueEqual('color', borderA.color, borderB.color) &&
      isLiteralValueEqual('dimension', borderA.width, borderB.width) &&
      borderA.style === borderB.style
    )
  }
  if (dtcgType === 'responsiveDimension') {
    // Field-by-field, same reasoning as shadow/border/typography above — but unlike those, this
    // isn't a real DTCG $type (docs/plans/responsive-dimension-token-plan.md decision 2 keeps
    // responsive dimension tokens as `$type: "dimension"`); it's a synthetic value this function's
    // callers (figma-pull.ts) pass in explicitly when they already know they're comparing two
    // {mobile, tablet, desktop} breakpoint maps, not a token's real resolved $type. Each breakpoint
    // is free literal-or-reference (decision 3) — 'dimension' already compares either shape
    // correctly via the JSON.stringify fallback below (dimension has no dedicated branch of its
    // own), same as border's width.
    type ResponsiveDimensionLike = { mobile: unknown; tablet: unknown; desktop: unknown }
    const responsiveA = a as ResponsiveDimensionLike | undefined
    const responsiveB = b as ResponsiveDimensionLike | undefined
    if (!responsiveA || !responsiveB) return responsiveA === responsiveB
    return (
      isLiteralValueEqual('dimension', responsiveA.mobile, responsiveB.mobile) &&
      isLiteralValueEqual('dimension', responsiveA.tablet, responsiveB.tablet) &&
      isLiteralValueEqual('dimension', responsiveA.desktop, responsiveB.desktop)
    )
  }
  if (dtcgType === 'typography') {
    // Field-by-field, same reasoning as shadow/border above. fontFamily/fontWeight compare as bare
    // strings — both sides are already-resolved reference strings by the time this runs (decision
    // 4), the same "always a reference, so both sides are already comparable strings" situation as
    // border's `style`. fontSize/lineHeight compare as resolved literals (dimension/number).
    type TypographyLike = { fontFamily: unknown; fontSize: unknown; fontWeight: unknown; lineHeight: unknown }
    const typographyA = a as TypographyLike | undefined
    const typographyB = b as TypographyLike | undefined
    if (!typographyA || !typographyB) return typographyA === typographyB
    return (
      typographyA.fontFamily === typographyB.fontFamily &&
      isLiteralValueEqual('dimension', typographyA.fontSize, typographyB.fontSize) &&
      typographyA.fontWeight === typographyB.fontWeight &&
      typographyA.lineHeight === typographyB.lineHeight
    )
  }
  return JSON.stringify(a) === JSON.stringify(b)
}

// figmaVariableName's inverse (scripts/figma-sync/lib/write.mjs:12-14 —
// path.join('/')). Used only when a Figma variable has no matching
// figmaId (a brand-new variable) and its path has to be derived from its name.
export function pathFromFigmaVariableName(name: string): string[] {
  return name.split('/').filter(Boolean)
}

export interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS'
  id: string
}

export function isFigmaAlias(value: unknown): value is FigmaVariableAlias {
  return typeof value === 'object' && value !== null && (value as { type?: unknown }).type === 'VARIABLE_ALIAS'
}

// A shadow token's Figma identity is 5 variableIds (offsetX, offsetY, blur, spread, color), not 1
// — see docs/plans/shadow-token-type-plan.md. Mirrors
// scripts/figma-sync/lib/figma-value.mjs's SHADOW_SUB_PROPERTIES (reimplemented, not imported —
// Node-only module, outside apps/toky's boundary, per this file's header).
export const SHADOW_SUB_PROPERTIES = ['offsetX', 'offsetY', 'blur', 'spread', 'color'] as const
export type ShadowSubProperty = (typeof SHADOW_SUB_PROPERTIES)[number]

export function isShadowFigmaId(value: unknown): value is Record<ShadowSubProperty, string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    SHADOW_SUB_PROPERTIES.every(sub => typeof (value as Record<string, unknown>)[sub] === 'string')
  )
}

// A border token's Figma identity is 3 variableIds (color, width, style), not 1 — see
// docs/plans/border-token-type-plan.md. Mirrors
// scripts/figma-sync/lib/figma-value.mjs's BORDER_SUB_PROPERTIES (reimplemented, not imported —
// Node-only module, outside apps/toky's boundary, per this file's header).
export const BORDER_SUB_PROPERTIES = ['color', 'width', 'style'] as const
export type BorderSubProperty = (typeof BORDER_SUB_PROPERTIES)[number]

export function isBorderFigmaId(value: unknown): value is Record<BorderSubProperty, string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    BORDER_SUB_PROPERTIES.every(sub => typeof (value as Record<string, unknown>)[sub] === 'string')
  )
}

// A typography token's Figma identity is 4 variableIds (fontFamily, fontSize, fontWeight,
// lineHeight), not 1 — see docs/plans/typography-token-type-plan.md. Mirrors
// scripts/figma-sync/lib/figma-value.mjs's TYPOGRAPHY_SUB_PROPERTIES (reimplemented, not imported —
// Node-only module, outside apps/toky's boundary, per this file's header).
export const TYPOGRAPHY_SUB_PROPERTIES = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight'] as const
export type TypographySubProperty = (typeof TYPOGRAPHY_SUB_PROPERTIES)[number]

export function isTypographyFigmaId(value: unknown): value is Record<TypographySubProperty, string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    TYPOGRAPHY_SUB_PROPERTIES.every(sub => typeof (value as Record<string, unknown>)[sub] === 'string')
  )
}

// A responsive dimension token's Figma identity is 3 variableIds (mobile, tablet, desktop), not 1
// — see docs/plans/responsive-dimension-token-plan.md decision 8. Mirrors
// scripts/figma-sync/lib/figma-value.mjs's RESPONSIVE_DIMENSION_SUB_PROPERTIES (reimplemented, not
// imported — Node-only module, outside apps/toky's boundary, per this file's header).
export const RESPONSIVE_DIMENSION_SUB_PROPERTIES = ['mobile', 'tablet', 'desktop'] as const
export type ResponsiveDimensionSubProperty = (typeof RESPONSIVE_DIMENSION_SUB_PROPERTIES)[number]

export function isResponsiveDimensionFigmaId(value: unknown): value is Record<ResponsiveDimensionSubProperty, string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    RESPONSIVE_DIMENSION_SUB_PROPERTIES.every(sub => typeof (value as Record<string, unknown>)[sub] === 'string')
  )
}

/**
 * Flattens a token's figmaId into a list of plain string ids, tagged with which sub-property (if
 * any) each one represents — every other type has exactly one untagged id; a shadow token has 5,
 * a border token has 3, a typography token has 4. Mirrors
 * scripts/figma-sync/lib/figma-value.mjs's flattenVariableId. Distinguished by shape, not a type
 * tag — see that function's comment.
 */
export function flattenFigmaId(figmaId: FigmaId | null | undefined): {
  id: string
  subProperty?: ShadowSubProperty | BorderSubProperty | TypographySubProperty | ResponsiveDimensionSubProperty
}[] {
  if (!figmaId) return []
  if (typeof figmaId === 'string') return [{ id: figmaId }]
  const record = figmaId as Record<string, string>
  const subProperties: readonly (
    ShadowSubProperty | BorderSubProperty | TypographySubProperty | ResponsiveDimensionSubProperty
  )[] =
    'offsetX' in record
      ? SHADOW_SUB_PROPERTIES
      : 'fontFamily' in record
        ? TYPOGRAPHY_SUB_PROPERTIES
        : 'mobile' in record
          ? RESPONSIVE_DIMENSION_SUB_PROPERTIES
          : BORDER_SUB_PROPERTIES
  return subProperties.filter(sub => record[sub]).map(sub => ({ id: record[sub], subProperty: sub }))
}

// 1px = 1/16 rem, this repo's fixed base font size (matches
// packages/tokens/src/config.base.ts's basePxFontSize and
// scripts/figma-sync/lib/figma-value.mjs's PX_PER_REM).
const PX_PER_REM = 16

/**
 * Reconstructs one DTCG shadow layer from its 5 already-fetched Figma sub-values — the inverse of
 * scripts/figma-sync/lib/figma-value.mjs's figmaShadowSubValuesFor. `localUnit` supplies each
 * dimension sub-value's unit (rem: convert Figma's raw px float back by /16; px: unconverted) —
 * read from the matched local token's own current value where one exists, defaulting to 'rem'
 * otherwise (matches the standalone dimension type's same default).
 */
export function dtcgShadowLayerFromFigma(
  subValues: Record<ShadowSubProperty, unknown>,
  localUnit: (sub: 'offsetX' | 'offsetY' | 'blur' | 'spread') => 'px' | 'rem',
): { color: DtcgColorValue; offsetX: unknown; offsetY: unknown; blur: unknown; spread: unknown } | null {
  const color = subValues.color
  if (typeof color !== 'object' || color === null || !('r' in color)) return null
  const dtcgColor = dtcgColorFromFigma(color as FigmaColor)

  const dimension = (sub: 'offsetX' | 'offsetY' | 'blur' | 'spread') => {
    const raw = subValues[sub]
    if (typeof raw !== 'number') return null
    const unit = localUnit(sub)
    return { value: unit === 'rem' ? raw / PX_PER_REM : raw, unit }
  }

  const offsetX = dimension('offsetX')
  const offsetY = dimension('offsetY')
  const blur = dimension('blur')
  const spread = dimension('spread')
  if (offsetX === null || offsetY === null || blur === null || spread === null) return null

  return { color: dtcgColor, offsetX, offsetY, blur, spread }
}

// Mirrors packages/tokens/tokens/Base.tokens.json's 🔗 Alias.▭ Border.Style.* keys — the full set
// of CSS border-style keywords this codebase defines a token for (docs/plans/border-token-type-plan.md
// decision 2).
const BORDER_STYLE_ALIAS_NAME_BY_KEYWORD: Record<string, string> = {
  none: 'None',
  solid: 'Solid',
  dashed: 'Dashed',
  dotted: 'Dotted',
  double: 'Double',
  groove: 'Groove',
  ridge: 'Ridge',
  inset: 'Inset',
  outset: 'Outset',
}

/**
 * Resolves a Figma STRING sub-value (e.g. `"dashed"`) back to the `{🔗 Alias.▭ Border.Style.
 * <Keyword>}` reference it must round-trip to — `style` is always a reference in this codebase,
 * never a literal (docs/plans/border-token-type-plan.md decision 4), unlike `color`/`width` below
 * which reconstruct as literals. Returns `undefined` for a value that doesn't match one of the 9
 * known keywords, exact-case, same "recognize exactly what our own push side generates, don't
 * guess at a manual Figma edit" policy as `fontWeightNumberFromKeyword`.
 */
export function borderStyleReferenceFromKeyword(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const aliasName = BORDER_STYLE_ALIAS_NAME_BY_KEYWORD[value]
  return aliasName ? `{🔗 Alias.▭ Border.Style.${aliasName}}` : undefined
}

/**
 * Reconstructs one DTCG border value from its 3 already-fetched Figma sub-values — the inverse of
 * scripts/figma-sync/lib/figma-value.mjs's figmaBorderSubValuesFor. `localUnit` supplies the
 * width sub-value's unit, same convention as dtcgShadowLayerFromFigma above. `color`/`width`
 * reconstruct as literals (mirroring shadow); `style` reconstructs as a reference string — see
 * borderStyleReferenceFromKeyword.
 */
export function dtcgBorderFromFigma(
  subValues: Record<BorderSubProperty, unknown>,
  localUnit: () => 'px' | 'rem',
): { color: DtcgColorValue; width: unknown; style: string } | null {
  const color = subValues.color
  if (typeof color !== 'object' || color === null || !('r' in color)) return null
  const dtcgColor = dtcgColorFromFigma(color as FigmaColor)

  const rawWidth = subValues.width
  if (typeof rawWidth !== 'number') return null
  const unit = localUnit()
  const width = { value: unit === 'rem' ? rawWidth / PX_PER_REM : rawWidth, unit }

  const style = borderStyleReferenceFromKeyword(subValues.style)
  if (!style) return null

  return { color: dtcgColor, width, style }
}

/**
 * Reconstructs a responsive dimension token's 3 breakpoint values from its 3 already-fetched Figma
 * sub-values — the inverse of scripts/figma-sync/lib/figma-value.mjs's
 * figmaResponsiveDimensionSubValuesFor. `localUnit` supplies each breakpoint's own unit, same
 * per-sub-value convention as dtcgShadowLayerFromFigma. Unlike border's `style` (always
 * reconstructed as a reference — see borderStyleReferenceFromKeyword), every breakpoint always
 * reconstructs as a literal, never attempting to match back to a known primitive reference — same
 * simpler policy border's own free literal-or-reference `width` field already uses on pull.
 */
export function dtcgResponsiveDimensionFromFigma(
  subValues: Record<ResponsiveDimensionSubProperty, unknown>,
  localUnit: (sub: ResponsiveDimensionSubProperty) => 'px' | 'rem',
): Record<ResponsiveDimensionSubProperty, { value: number; unit: 'px' | 'rem' }> | null {
  const dimension = (sub: ResponsiveDimensionSubProperty) => {
    const raw = subValues[sub]
    if (typeof raw !== 'number') return null
    const unit = localUnit(sub)
    return { value: unit === 'rem' ? raw / PX_PER_REM : raw, unit }
  }

  const mobile = dimension('mobile')
  const tablet = dimension('tablet')
  const desktop = dimension('desktop')
  if (mobile === null || tablet === null || desktop === null) return null

  return { mobile, tablet, desktop }
}
