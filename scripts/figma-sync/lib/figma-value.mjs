/**
 * Maps a resolved DTCG literal value + `$type` to what Figma's Variables
 * REST API expects — both the `resolvedType` used when creating a
 * variable, and the mode-value shape itself. Only the `$type`s actually
 * present in packages/tokens/tokens/Base.tokens.json today (color, number,
 * string, fontWeight, fontFamily) plus boolean (present in the DTCG spec,
 * absent from this file today but cheap to support correctly) are handled —
 * anything else fails loudly rather than guessing at an unverified mapping,
 * since there's no live Figma file to check the guess against yet
 * (docs/plans/figma-sync-action-plan.md §8).
 *
 * Figma Variables have no native font-weight type, so `fontWeight` projects
 * onto `STRING`, same as `string` does — two DTCG types sharing one Figma
 * resolvedType (see docs/plans/font-weight-token-type-plan.md). `fontFamily`
 * shares it too, for the same reason plus Figma having no font-stack/array
 * concept — only the first (primary) font of the array is ever sent (see
 * docs/plans/font-family-token-type-plan.md). `dimension` maps onto `FLOAT`
 * instead — Figma variables are always raw px floats, no rem concept, so a
 * rem-unit dimension token is converted (×16) on the way out (see
 * docs/plans/dimension-token-type-plan.md). `shadow` doesn't go through this
 * table/switch at all — see figmaShadowSubValuesFor below. Figma has no
 * shadow-object variable type, so one shadow token maps to 5 separate Figma
 * variables (one per sub-value), not 1 (see
 * docs/plans/shadow-token-type-plan.md).
 */

import { parseReferencePath, resolveLiteral } from './alias.mjs'

const RESOLVED_TYPE_BY_DTCG_TYPE = {
  color: 'COLOR',
  number: 'FLOAT',
  string: 'STRING',
  boolean: 'BOOLEAN',
  fontWeight: 'STRING',
  fontFamily: 'STRING',
  dimension: 'FLOAT',
}

// 1rem = 16px, this repo's fixed base font size (matches
// packages/tokens/src/config.base.ts's basePxFontSize).
const PX_PER_REM = 16

// Figma doesn't understand a numeric font weight — its "Font Weight"
// variable binding expects the font's named style (e.g. "Bold"), not "700".
// Generic DTCG first-listed keyword per weight
// (https://www.designtokens.org/tr/drafts/format/#font-weight), Title Case
// + hyphenated, matching apps/toky's FONT_WEIGHT_OPTIONS labels. A
// best-effort default — the real BaloiseCreateHeadline/BaloiseCreateText
// style names in Figma may differ and should be verified
// (docs/plans/font-weight-token-type-plan.md).
export const FONT_WEIGHT_KEYWORD_BY_NUMBER = {
  100: 'Thin',
  200: 'Extra-Light',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semi-Bold',
  700: 'Bold',
  800: 'Extra-Bold',
  900: 'Black',
  950: 'Extra-Black',
}

export function resolvedTypeFor(dtcgType) {
  const resolvedType = RESOLVED_TYPE_BY_DTCG_TYPE[dtcgType]
  if (!resolvedType) {
    throw new Error(`Unsupported token $type "${dtcgType}" — no known Figma resolvedType mapping.`)
  }
  return resolvedType
}

/**
 * @param {string} dtcgType
 * @param {unknown} literalValue already-resolved (non-reference) `$value`
 */
export function figmaValueFor(dtcgType, literalValue) {
  switch (dtcgType) {
    case 'color': {
      // DTCG color: { colorSpace: 'srgb', components: [r, g, b], alpha, hex }.
      // Figma color variable value: { r, g, b, a }, each a 0-1 float — the
      // same 0-1 range DTCG's "components" already uses for srgb, so this
      // is a direct field rename, not a conversion.
      const { components, alpha } = literalValue
      const [r, g, b] = components
      return { r, g, b, a: alpha }
    }
    case 'number':
    case 'string':
    case 'boolean':
      return literalValue
    case 'fontWeight': {
      // Figma doesn't accept a numeric weight — it needs the font's named
      // style (e.g. "Bold"), not "700".
      const keyword = FONT_WEIGHT_KEYWORD_BY_NUMBER[literalValue]
      if (!keyword) {
        throw new Error(`Unsupported fontWeight value "${literalValue}" — no known Figma keyword mapping.`)
      }
      return keyword
    }
    case 'fontFamily': {
      // Figma has no font-stack concept — only the primary (first) font is
      // ever sent, never the fallback chain.
      if (!Array.isArray(literalValue) || literalValue.length === 0) {
        throw new Error(`Unsupported fontFamily value "${JSON.stringify(literalValue)}" — expected a non-empty array.`)
      }
      return String(literalValue[0])
    }
    case 'dimension': {
      const { value, unit } = literalValue ?? {}
      if (typeof value !== 'number' || (unit !== 'px' && unit !== 'rem')) {
        throw new Error(
          `Unsupported dimension value "${JSON.stringify(literalValue)}" — expected {value, unit: 'px'|'rem'}.`,
        )
      }
      return unit === 'rem' ? value * PX_PER_REM : value
    }
    default:
      throw new Error(`Unsupported token $type "${dtcgType}" — no known Figma value mapping.`)
  }
}

// The DTCG literal a "no shadow" empty-array token (e.g. Alias.Shadow.Box.None) decomposes to —
// an explicit all-zero, fully transparent single layer, rather than leaving the token unsynced
// (see isSyncableShadowToken below). Visually equivalent to no shadow at all in Figma.
const ZERO_TRANSPARENT_SHADOW_LAYER = {
  color: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 0, hex: '#000000' },
  offsetX: { value: 0, unit: 'px' },
  offsetY: { value: 0, unit: 'px' },
  blur: { value: 0, unit: 'px' },
  spread: { value: 0, unit: 'px' },
}

/**
 * `shadow` doesn't fit figmaValueFor's one-DTCG-value -> one-Figma-value shape — Figma has no
 * shadow-object variable type, so a shadow token needs 5 separate Figma variables (offsetX,
 * offsetY, blur, spread as FLOAT; color as COLOR), one per sub-value. Figma also has no
 * multi-layer-shadow variable concept, so an array `$value` is lossy either way it's handled: an
 * empty array ("no shadow") decomposes to `ZERO_TRANSPARENT_SHADOW_LAYER` above; a non-empty
 * (multi-layer) array decomposes its first (closest/most prominent) layer only — an approximation,
 * not a guess, since there's no single-layer Figma equivalent for the rest until Figma adds
 * multi-layer shadow variable support.
 *
 * @param {unknown} literalValue already-resolved (non-reference) `$value` of a shadow token —
 *   either a single-layer object or an array of layers (possibly empty)
 * @returns {{ offsetX: number, offsetY: number, blur: number, spread: number, color: { r: number, g: number, b: number, a: number } } | null}
 */
export function figmaShadowSubValuesFor(literalValue) {
  const layer = Array.isArray(literalValue) ? (literalValue[0] ?? ZERO_TRANSPARENT_SHADOW_LAYER) : literalValue

  if (typeof layer !== 'object' || layer === null) return null

  const { color, offsetX, offsetY, blur, spread } = layer
  return {
    offsetX: figmaValueFor('dimension', offsetX),
    offsetY: figmaValueFor('dimension', offsetY),
    blur: figmaValueFor('dimension', blur),
    spread: figmaValueFor('dimension', spread),
    color: figmaValueFor('color', color),
  }
}

// Sub-property suffixes appended to a shadow token's path to name its 5 decomposed Figma
// variables, e.g. '🌐 Global/🗂️ Elevation/Shadow/1/OffsetX'. Order matches
// figmaShadowSubValuesFor's return shape; FLOAT for the first 4, COLOR for the last.
export const SHADOW_SUB_PROPERTIES = ['offsetX', 'offsetY', 'blur', 'spread', 'color']
export const SHADOW_SUB_PROPERTY_SUFFIX = {
  offsetX: 'OffsetX',
  offsetY: 'OffsetY',
  blur: 'Blur',
  spread: 'Spread',
  color: 'Color',
}
export const SHADOW_SUB_PROPERTY_RESOLVED_TYPE = {
  offsetX: 'FLOAT',
  offsetY: 'FLOAT',
  blur: 'FLOAT',
  spread: 'FLOAT',
  color: 'COLOR',
}

// Every shadow token is eligible for sync — reference, single-layer object, multi-layer array, or
// empty array all decompose via figmaShadowSubValuesFor above (which handles the array cases'
// lossy-but-visible fallback), so there's no unsyncable shadow shape left to exclude here.
export function isSyncableShadowToken(token) {
  return token.type === 'shadow'
}

// Whether this token can have a Figma identity at all — every type otherwise handled here, plus
// every shadow shape (isSyncableShadowToken is now unconditional for `shadow`).
export function isPushableToken(token) {
  return token.type !== 'shadow' || isSyncableShadowToken(token)
}

/**
 * `border` doesn't fit figmaValueFor's one-DTCG-value -> one-Figma-value shape either — Figma has
 * no border-object variable type, so a border token needs 3 separate Figma variables (color,
 * width, style), one per sub-value. Unlike shadow, there's no unsyncable shape to filter out first
 * (no multi-layer/array case) — every border composite token is eligible.
 *
 * Unlike shadow's sub-values (always inline literals), `color`/`width`/`style` are each a
 * `{reference}` string (docs/plans/border-token-type-plan.md decision 4), so this needs a
 * `tokenIndex` to follow them to a literal — see `resolveLiteral` in `./alias.mjs`.
 *
 * @param {unknown} literalValue already-resolved (non-reference) `$value` of a border token —
 *   its `color`/`width`/`style` fields may themselves still be `{reference}` strings
 * @param {Map<string, import('./tokens.mjs').Token>} tokenIndex
 * @returns {{ color: { r: number, g: number, b: number, a: number }, width: number, style: string } | null}
 */
export function figmaBorderSubValuesFor(literalValue, tokenIndex) {
  if (typeof literalValue !== 'object' || literalValue === null) return null
  const { color, width, style } = literalValue
  const colorLiteral = resolveLiteral(color, tokenIndex)
  const widthLiteral = resolveLiteral(width, tokenIndex)
  const styleLiteral = resolveLiteral(style, tokenIndex)
  if (typeof styleLiteral !== 'string') return null
  return {
    color: figmaValueFor('color', colorLiteral),
    width: figmaValueFor('dimension', widthLiteral),
    style: styleLiteral,
  }
}

// Sub-property suffixes appended to a border token's path to name its 3 decomposed Figma
// variables, e.g. '🔗 Alias/▭ Border/Composite/Grey/BorderColor'. Order matches
// figmaBorderSubValuesFor's return shape.
export const BORDER_SUB_PROPERTIES = ['color', 'width', 'style']
export const BORDER_SUB_PROPERTY_SUFFIX = {
  color: 'BorderColor',
  width: 'BorderWidth',
  style: 'BorderStyle',
}
export const BORDER_SUB_PROPERTY_RESOLVED_TYPE = {
  color: 'COLOR',
  width: 'FLOAT',
  style: 'STRING',
}

// Every border composite token is eligible for sync — no unsyncable shape to exclude (unlike
// shadow's multi-layer/empty-array case).
export function isSyncableBorderToken(token) {
  return token.type === 'border'
}

/**
 * `typography` doesn't fit figmaValueFor's one-DTCG-value -> one-Figma-value shape either — Figma
 * has no typography-object variable type, so a typography token needs 4 separate Figma variables
 * (fontFamily, fontSize, fontWeight, lineHeight), one per sub-value. Same "no unsyncable shape"
 * situation as border — no array/multi-layer case exists for typography either (see
 * docs/plans/typography-token-type-plan.md decision 5 — a typography token's $value is always a
 * single flat object).
 *
 * fontFamily/fontWeight are always `{reference}` strings (decision 4), same as border's
 * color/width/style — resolved to a literal via `resolveLiteral` first. fontSize/lineHeight are
 * free literal-or-reference, so `resolveLiteral` is a no-op passthrough for either shape (it only
 * follows a `{reference}` string, returning anything else unchanged).
 *
 * @param {unknown} literalValue already-resolved (non-reference) `$value` of a typography token —
 *   its `fontFamily`/`fontSize`/`fontWeight`/`lineHeight` fields may themselves still be
 *   `{reference}` strings
 * @param {Map<string, import('./tokens.mjs').Token>} tokenIndex
 * @returns {{ fontFamily: string, fontSize: number, fontWeight: string, lineHeight: number } | null}
 */
export function figmaTypographySubValuesFor(literalValue, tokenIndex) {
  if (typeof literalValue !== 'object' || literalValue === null) return null
  const { fontFamily, fontSize, fontWeight, lineHeight } = literalValue
  const fontFamilyLiteral = resolveLiteral(fontFamily, tokenIndex)
  const fontSizeLiteral = resolveLiteral(fontSize, tokenIndex)
  const fontWeightLiteral = resolveLiteral(fontWeight, tokenIndex)
  const lineHeightLiteral = resolveLiteral(lineHeight, tokenIndex)
  if (typeof lineHeightLiteral !== 'number') return null
  return {
    fontFamily: figmaValueFor('fontFamily', fontFamilyLiteral),
    fontSize: figmaValueFor('dimension', fontSizeLiteral),
    fontWeight: figmaValueFor('fontWeight', fontWeightLiteral),
    lineHeight: lineHeightLiteral,
  }
}

// Sub-property suffixes appended to a typography token's path to name its 4 decomposed Figma
// variables, e.g. '🌐 Global/🔤 Font/Typography/Test/FontFamily'. Order matches
// figmaTypographySubValuesFor's return shape.
export const TYPOGRAPHY_SUB_PROPERTIES = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight']
export const TYPOGRAPHY_SUB_PROPERTY_SUFFIX = {
  fontFamily: 'FontFamily',
  fontSize: 'FontSize',
  fontWeight: 'FontWeight',
  lineHeight: 'LineHeight',
}
export const TYPOGRAPHY_SUB_PROPERTY_RESOLVED_TYPE = {
  fontFamily: 'STRING',
  fontSize: 'FLOAT',
  fontWeight: 'STRING',
  lineHeight: 'FLOAT',
}

// Every typography token is eligible for sync — no unsyncable shape to exclude, same as border.
export function isSyncableTypographyToken(token) {
  return token.type === 'typography'
}

/**
 * A responsive dimension token doesn't fit figmaValueFor's one-DTCG-value -> one-Figma-value shape
 * either — Figma has no native responsive/breakpoint concept, so a responsive dimension token
 * needs 3 separate Figma variables (mobile, tablet, desktop), one per breakpoint (see
 * docs/plans/responsive-dimension-token-plan.md decision 8 — sibling variables, not modes, mirrors
 * shadow/border/typography's own fan-out rather than the brand-mode mechanism). Unlike shadow (a
 * distinct `$type`), this lives inside a plain `$type: "dimension"` token's `$extensions` (decision
 * 2) — `isSyncableResponsiveDimensionToken` below is what actually detects it, not a `$type` check
 * alone.
 *
 * Each breakpoint is free literal-or-reference (decision 3), same as border's width/color — but
 * unlike border/typography's sub-values (always flattened to a literal via `resolveLiteral`,
 * however many reference hops that takes), a breakpoint that's a *direct* `{reference}` string
 * stays a reference here: Figma has a real variable for the thing it points at (a `Global`/`Alias`
 * dimension primitive), so it's bound with a `VARIABLE_ALIAS` rather than flattened to a number —
 * the whole point being that the value shown in Figma stays a live link to that primitive, not a
 * copy of it. A multi-hop reference (a reference to a reference) still isn't supported here — only
 * one hop is checked; write.mjs falls back to treating an unresolvable case as ineligible, same
 * "not eligible" policy as elsewhere in this file, rather than guessing.
 *
 * @param {unknown} literalValue a responsive dimension token's raw `$extensions.com.helvetia.responsive`
 *   value — its `mobile`/`tablet`/`desktop` fields may themselves still be `{reference}` strings
 * @returns {{
 *   mobile: { kind: 'literal', value: number } | { kind: 'reference', path: string[] },
 *   tablet: { kind: 'literal', value: number } | { kind: 'reference', path: string[] },
 *   desktop: { kind: 'literal', value: number } | { kind: 'reference', path: string[] },
 * } | null}
 */
export function figmaResponsiveDimensionSubEntriesFor(literalValue) {
  if (typeof literalValue !== 'object' || literalValue === null) return null
  const { mobile, tablet, desktop } = literalValue
  const entryFor = raw => {
    const refPath = parseReferencePath(raw)
    if (refPath) return { kind: 'reference', path: refPath }
    return { kind: 'literal', value: figmaValueFor('dimension', raw) }
  }
  return { mobile: entryFor(mobile), tablet: entryFor(tablet), desktop: entryFor(desktop) }
}

// Sub-property suffixes appended to a responsive dimension token's path to name its 3 decomposed
// Figma variables, e.g. '📱 Device/↔️ Space/Lg/Mobile'. Order matches
// figmaResponsiveDimensionSubValuesFor's return shape.
export const RESPONSIVE_DIMENSION_SUB_PROPERTIES = ['mobile', 'tablet', 'desktop']
export const RESPONSIVE_DIMENSION_SUB_PROPERTY_SUFFIX = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
}
export const RESPONSIVE_DIMENSION_SUB_PROPERTY_RESOLVED_TYPE = {
  mobile: 'FLOAT',
  tablet: 'FLOAT',
  desktop: 'FLOAT',
}

function isRawResponsiveDimensionValue(value) {
  return typeof value === 'object' && value !== null && 'mobile' in value && 'tablet' in value && 'desktop' in value
}

// A responsive dimension token is a `dimension` token carrying a well-formed
// `$extensions.com.helvetia.responsive` — every *other* dimension token (the overwhelming
// majority) stays on the single-Figma-variable path, so this can't just check `token.type` the
// way isSyncableBorderToken/isSyncableTypographyToken do.
export function isSyncableResponsiveDimensionToken(token) {
  return token.type === 'dimension' && isRawResponsiveDimensionValue(token.responsive)
}

// MVP scope for the "Design Responsive Tokens" collection — the collection replaces nothing; it
// *adds* one Device variable per in-scope token, whose 3 breakpoint modes each alias the matching
// Mobile/Tablet/Desktop sibling variable already written into "Design Tokens". Hardcoded rather than
// a new `$extensions` marker — deliberately provisional, expected to grow (e.g. to Component-level
// responsive tokens like `Component.Text.Space`/`Component.Logo.Size.*`, which already carry the
// responsive extension today but aren't in this list) by editing this array, not by touching token
// JSON schema. These 3 groups moved from `🔗 Alias` to their own `📱 Device` top-level layer (see
// docs/plans/device-token-layer-plan.md) — this array tracks that move, but the Figma-side
// mechanism itself (3 sibling variables in "Design Tokens" + this collection's derived 4th Device
// variable) is deliberately unchanged; consolidating the siblings themselves into this collection
// was considered and rejected (would drop per-brand override support for these tokens, since a
// Figma collection has exactly one mode axis and this one's is already spent on breakpoint).
const DEVICE_ELIGIBLE_PATH_PREFIXES = [
  ['📱 Device', '🔤 Text', 'Size'],
  ['📱 Device', '↔️ Space'],
  ['📱 Device', '🗃️ Container', 'Space'],
]

function pathStartsWith(path, prefix) {
  return prefix.every((segment, i) => path[i] === segment)
}

/**
 * Whether a responsive dimension token is in the "Design Responsive Tokens" collection's MVP scope
 * — i.e. whether it gets a 4th `device` id and a Device variable, on top of its 3 Mobile/Tablet/
 * Desktop siblings which every responsive dimension token already gets regardless of this. Callers
 * must check `isSyncableResponsiveDimensionToken` first; this doesn't re-check the shape.
 */
export function isDeviceEligibleResponsiveDimensionToken(token) {
  return DEVICE_ELIGIBLE_PATH_PREFIXES.some(prefix => pathStartsWith(token.path, prefix))
}

// The Device variable's name mirrors the existing CSS `-mobile/-tablet/-desktop` -> `-device`
// convention (packages/tokens/src/formatter.ts) — same path as the sibling variables, `Device`
// appended, e.g. '📱 Device/↔️ Space/Lg/Device'. Lives in the "Design Responsive Tokens" collection,
// not alongside its siblings, so the shared name isn't a collision (different collection = different
// id namespace).
export function figmaResponsiveDimensionDeviceVariableName(path) {
  return `${path.join('/')}/Device`
}

/**
 * Flattens a token's variableId into a list of plain string ids, tagged with which sub-property
 * (if any) each one represents — every other type has exactly one untagged id; a shadow token has
 * 5 (one per SHADOW_SUB_PROPERTIES entry), a border token has 3 (one per BORDER_SUB_PROPERTIES
 * entry), a typography token has 4 (one per TYPOGRAPHY_SUB_PROPERTIES entry), a responsive
 * dimension token has 3 (one per RESPONSIVE_DIMENSION_SUB_PROPERTIES entry). Used anywhere that
 * needs to treat "this token's Figma identity" as a set of ids regardless of how many it is
 * (baseline bookkeeping, deletion detection) — see docs/plans/shadow-token-type-plan.md,
 * docs/plans/border-token-type-plan.md, docs/plans/typography-token-type-plan.md, and
 * docs/plans/responsive-dimension-token-plan.md.
 *
 * Distinguished by shape, not a type tag: a shadow id-set carries 'offsetX' (the others never do),
 * a typography id-set carries 'fontFamily', a responsive dimension id-set carries 'mobile' —
 * everything else object-shaped is treated as a border id-set.
 *
 * @param {unknown} variableId a token's raw $extensions.com.figma.variableId (string, object, or undefined)
 * @returns {{ id: string, subProperty: string | undefined }[]}
 */
export function flattenVariableId(variableId) {
  if (!variableId) return []
  if (typeof variableId === 'string') return [{ id: variableId, subProperty: undefined }]
  if (typeof variableId === 'object') {
    const subProperties = subPropertiesForVariableIdShape(variableId)
    return subProperties
      .filter(sub => variableId[sub])
      .map(sub => ({
        id: variableId[sub],
        subProperty: sub,
      }))
  }
  return []
}

// Shared shape-detection used by flattenVariableId and write.mjs's resolveTempIds — kept in one
// place so a 4th composite type only needs one new branch, not one per caller.
export function subPropertiesForVariableIdShape(variableId) {
  if ('offsetX' in variableId) return SHADOW_SUB_PROPERTIES
  if ('fontFamily' in variableId) return TYPOGRAPHY_SUB_PROPERTIES
  // 'device' is a 4th id alongside mobile/tablet/desktop, present only for a Device-eligible
  // responsive dimension token (isDeviceEligibleResponsiveDimensionToken) — the filter in
  // flattenVariableId drops it for every other (still 3-key) responsive dimension token, so
  // listing it unconditionally here is safe.
  if ('mobile' in variableId) return [...RESPONSIVE_DIMENSION_SUB_PROPERTIES, 'device']
  return BORDER_SUB_PROPERTIES
}
