/**
 * Figma variable alias binding — the write-side counterpart to
 * lib/tokens.mjs's {Reference} parsing. A DTCG reference resolves to the
 * *target* token's Figma variableId, and that id becomes a
 * VARIABLE_ALIAS mode-value — never a flattened literal
 * (docs/adr/0013-native-variable-aliasing.md).
 */

export function pathKey(path) {
  return path.join('.')
}

/**
 * A {Reference} string is always relative to the full Base tree — a brand
 * override changes what a token's *literal* resolves to, never what a
 * reference *points at* — so alias resolution only ever needs Base's
 * flattened tokens, regardless of which brand's tree is being written.
 */
export function buildTokenIndex(baseTokens) {
  return new Map(baseTokens.map(token => [pathKey(token.path), token]))
}

/**
 * Resolves a reference-kind token to the Token it points at. Throws
 * (rather than silently dropping the alias) if the reference target
 * doesn't exist — a broken reference is a data problem this run should
 * surface, not swallow.
 */
export function resolveAliasTarget(token, tokenIndex) {
  if (token.value.kind !== 'reference') {
    throw new Error(`resolveAliasTarget called on a non-reference token: ${pathKey(token.path)}`)
  }

  const target = tokenIndex.get(pathKey(token.value.path))
  if (!target) {
    throw new Error(`Token ${pathKey(token.path)} references ${pathKey(token.value.path)}, which does not exist.`)
  }
  return target
}

const REFERENCE_PATTERN = /^\{(.+)\}$/

/**
 * Parses a bare `{reference}` string into its path segments, without following it — unlike
 * `resolveLiteral`, which follows a reference through as many hops as it takes to a literal, this
 * is for callers (responsive dimension breakpoints) that need to know *whether* a raw sub-value is
 * a reference at all, and if so bind directly to that one target's own Figma variable rather than
 * flattening through it to a literal.
 *
 * @param {unknown} rawValue
 * @returns {string[] | null} the reference's path segments, or null if `rawValue` isn't a `{reference}` string
 */
export function parseReferencePath(rawValue) {
  if (typeof rawValue !== 'string') return null
  const match = REFERENCE_PATTERN.exec(rawValue)
  return match ? match[1].split('.') : null
}

/**
 * A border composite token's `color`/`width`/`style` sub-values are each a bare reference
 * *string* (not a whole-token reference) pointing into the same Base tree — e.g.
 * `"{🔗 Alias.▭ Border.Color.Grey}"`, itself a reference to `🌐 Global.🌈 Color.Grey.3`
 * (docs/plans/border-token-type-plan.md decision 4). Unlike shadow's sub-values, which are always
 * inline literals, these need following through the reference chain to a literal, however many
 * hops that takes — this is the only place in the pipeline that needs multi-hop resolution.
 *
 * @param {unknown} rawValue a border sub-value: either a `{reference}` string or an already-literal value
 * @param {Map<string, import('./tokens.mjs').Token>} tokenIndex
 * @returns {unknown} the fully-resolved literal value
 */
export function resolveLiteral(rawValue, tokenIndex) {
  if (typeof rawValue !== 'string') return rawValue
  const match = REFERENCE_PATTERN.exec(rawValue)
  if (!match) return rawValue

  const refPath = match[1].split('.')
  let current = tokenIndex.get(pathKey(refPath))
  if (!current) {
    throw new Error(`Reference to ${pathKey(refPath)} does not exist.`)
  }

  const seen = new Set()
  while (current.value.kind === 'reference') {
    const key = pathKey(current.path)
    if (seen.has(key)) {
      throw new Error(`Circular reference detected resolving ${pathKey(refPath)} at ${key}.`)
    }
    seen.add(key)
    current = resolveAliasTarget(current, tokenIndex)
  }
  return current.value.value
}
