/**
 * Pure logic for scripts/generate-token-usage.mjs — kept dependency-free
 * (no fs/child_process) so it can be unit tested against in-memory fixtures.
 */

const LAYERS = ['🌐 Global', '🔗 Alias', '🧩 Component']

// Responsive tokens (Mobile/Tablet/Desktop siblings under the same group) get
// a custom style-dictionary format (packages/tokens/src/formatter.ts,
// `ds/css/variables-responsive`) that never emits a Tablet or Desktop token's
// own suffixed name — it collapses all three siblings into one shared
// `-device` custom property, overridden per breakpoint via media queries.
// Only the Mobile sibling's own suffixed name is ever emitted verbatim.
// So code that consumes the *responsive* value always reads `-device`, and
// that one reference means all three siblings are in use — not just one.
const RESPONSIVE_SUFFIX = /-(mobile|tablet|desktop)$/

/**
 * Walks style-dictionary's docs-format JSON (packages/tokens/dist/docs/base.tokens.json)
 * and collects every leaf token's original `path` (matches Toky's FlatToken.path)
 * alongside every CSS var name that a reference to it could compile down to,
 * restricted to the three Base-token layers.
 */
export function collectBaseTokens(docsJson) {
  const results = []

  function walk(node) {
    if (!node || typeof node !== 'object') return
    if (typeof node.name === 'string' && Array.isArray(node.path)) {
      const names = [node.name]
      if (RESPONSIVE_SUFFIX.test(node.name)) {
        names.push(node.name.replace(RESPONSIVE_SUFFIX, '-device'))
      }
      results.push({ path: node.path, names })
      return
    }
    for (const value of Object.values(node)) walk(value)
  }

  for (const layer of LAYERS) {
    if (docsJson[layer]) walk(docsJson[layer])
  }

  return results
}

/**
 * Every distinct `var(--name` reference in a file's contents, deduplicated
 * so a variable used twice in one file only counts as one "location" match.
 */
export function extractUsedVarNames(content) {
  const names = new Set()
  const pattern = /var\(--([a-zA-Z0-9-]+)/g
  let match
  while ((match = pattern.exec(content))) {
    names.add(match[1])
  }
  return names
}

/**
 * Cross-references `tokens` (from collectBaseTokens, each with one or more
 * candidate `names`) against `files`
 * (`{ package: 'core' | 'css', file: <relative path>, content: string }`)
 * to produce the code-usage map keyed by `path.join('.')`.
 */
export function computeUsage(tokens, files) {
  const locationsByVarName = new Map()

  for (const { package: pkg, file, content } of files) {
    for (const varName of extractUsedVarNames(content)) {
      const list = locationsByVarName.get(varName) ?? []
      list.push({ package: pkg, file })
      locationsByVarName.set(varName, list)
    }
  }

  const sortLocations = locations =>
    [...locations].sort((a, b) => a.package.localeCompare(b.package) || a.file.localeCompare(b.file))

  const usage = {}
  for (const token of tokens) {
    const key = token.path.join('.')
    const merged = new Map()
    for (const name of token.names) {
      for (const location of locationsByVarName.get(name) ?? []) {
        merged.set(`${location.package}/${location.file}`, location)
      }
    }
    usage[key] = { count: merged.size, locations: sortLocations([...merged.values()]) }
  }

  return usage
}
