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

import { resolveLiteral } from './alias.mjs'

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

/**
 * `shadow` doesn't fit figmaValueFor's one-DTCG-value -> one-Figma-value shape — Figma has no
 * shadow-object variable type, so a shadow token needs 5 separate Figma variables (offsetX,
 * offsetY, blur, spread as FLOAT; color as COLOR), one per sub-value. Single-layer shadows only
 * (see docs/plans/shadow-token-type-plan.md) — a multi-layer shadow (an array) or the empty-array
 * "none" shadow isn't synced to Figma at all; this returns null for either case rather than
 * guessing which layer to push.
 *
 * @param {unknown} literalValue already-resolved (non-reference) `$value` of a shadow token
 * @returns {{ offsetX: number, offsetY: number, blur: number, spread: number, color: { r: number, g: number, b: number, a: number } } | null}
 */
export function figmaShadowSubValuesFor(literalValue) {
  if (Array.isArray(literalValue) || typeof literalValue !== 'object' || literalValue === null) {
    return null
  }
  const { color, offsetX, offsetY, blur, spread } = literalValue
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

// Single-layer-only (docs/plans/shadow-token-type-plan.md) — a multi-layer shadow (an array) or
// the empty-array "none" shadow isn't decomposed into Figma variables at all; it's simply not
// eligible for Figma sync, same as any other unsupported shape.
export function isSyncableShadowToken(token) {
  return token.type === 'shadow' && (token.value.kind === 'reference' || !Array.isArray(token.value.value))
}

// Whether this token can have a Figma identity at all — every type otherwise handled here, plus a
// single-layer shadow. A multi-layer or empty-array ("none") shadow is quietly skipped everywhere
// this is checked, not an error — it was never eligible for sync to begin with.
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
 * Flattens a token's variableId into a list of plain string ids, tagged with which sub-property
 * (if any) each one represents — every other type has exactly one untagged id; a shadow token has
 * 5 (one per SHADOW_SUB_PROPERTIES entry), a border token has 3 (one per BORDER_SUB_PROPERTIES
 * entry). Used anywhere that needs to treat "this token's Figma identity" as a set of ids
 * regardless of how many it is (baseline bookkeeping, deletion detection) — see
 * docs/plans/shadow-token-type-plan.md and docs/plans/border-token-type-plan.md.
 *
 * Distinguished by shape, not a type tag: a shadow id-set carries 'offsetX' (border never does);
 * everything else object-shaped is treated as a border id-set.
 *
 * @param {unknown} variableId a token's raw $extensions.com.figma.variableId (string, object, or undefined)
 * @returns {{ id: string, subProperty: string | undefined }[]}
 */
export function flattenVariableId(variableId) {
  if (!variableId) return []
  if (typeof variableId === 'string') return [{ id: variableId, subProperty: undefined }]
  if (typeof variableId === 'object') {
    const subProperties = 'offsetX' in variableId ? SHADOW_SUB_PROPERTIES : BORDER_SUB_PROPERTIES
    return subProperties
      .filter(sub => variableId[sub])
      .map(sub => ({
        id: variableId[sub],
        subProperty: sub,
      }))
  }
  return []
}
