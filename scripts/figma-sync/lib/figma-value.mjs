/**
 * Maps a resolved DTCG literal value + `$type` to what Figma's Variables
 * REST API expects — both the `resolvedType` used when creating a
 * variable, and the mode-value shape itself. Only the three `$type`s
 * actually present in packages/tokens/tokens/Base.tokens.json today
 * (color, number, string) plus boolean (present in the DTCG spec, absent
 * from this file today but cheap to support correctly) are handled —
 * anything else fails loudly rather than guessing at an unverified
 * mapping, since there's no live Figma file to check the guess against
 * yet (docs/plans/figma-sync-action-plan.md §8).
 */

const RESOLVED_TYPE_BY_DTCG_TYPE = {
  color: 'COLOR',
  number: 'FLOAT',
  string: 'STRING',
  boolean: 'BOOLEAN',
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
    default:
      throw new Error(`Unsupported token $type "${dtcgType}" — no known Figma value mapping.`)
  }
}
