/** Recursively collect leaf tokens (objects with a `name` field). */
export function flattenTokens(obj: Record<string, unknown>): Array<{ name: string }> {
  const results: Array<{ name: string }> = []
  for (const val of Object.values(obj)) {
    if (val && typeof val === 'object') {
      if ('name' in val) {
        results.push(val as { name: string })
      } else {
        results.push(...flattenTokens(val as Record<string, unknown>))
      }
    }
  }
  return results
}

export interface RuleMetadata {
  class: string
  property: string | string[]
  token?: string
  value?: string
}

/** Derive metadata from a static rules array. Token is extracted from `var(--…)` values when present. */
export function metadataFromRules(rules: Array<[string, Record<string, string>]>): RuleMetadata[] {
  return rules.map(([cls, props]) => {
    const cssProps = Object.keys(props)
    const property = cssProps.length === 1 ? cssProps[0] : cssProps
    const firstVal = Object.values(props)[0] ?? ''
    const tokenMatch = firstVal.match(/var\(--([^)]+)\)/)
    const value = firstVal.replace(/\s*!important\s*$/, '').trim()
    return { class: cls, property, value, ...(tokenMatch ? { token: tokenMatch[1] } : {}) }
  })
}
