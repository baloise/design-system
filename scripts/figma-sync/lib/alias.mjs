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
