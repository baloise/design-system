import { readFileSync } from 'node:fs'
import type { Rule } from 'unocss'
import { flattenTokens, type RuleMetadata } from '../utils'

/**
 * Build border-radius rules dynamically from base.tokens.json.
 * Source: 🔗 Alias › 🔵 Radius
 *
 * For each radius token the following classes are emitted:
 *   radius[-<name>]             — all corners  (base token → just `radius`)
 *   radius-top[-<name>]         — top-left + top-right
 *   radius-bottom[-<name>]      — bottom-left + bottom-right
 *   radius-top-left[-<name>]    — single corner
 *   radius-top-right[-<name>]   — single corner
 *   radius-bottom-left[-<name>] — single corner
 *   radius-bottom-right[-<name>]— single corner
 */
export function buildBorderRules(tokensJsonPath: string): {
  rules: Rule[]
  safelist: string[]
  metadata: RuleMetadata[]
} {
  const json = JSON.parse(readFileSync(tokensJsonPath, 'utf8'))
  const tokens = flattenTokens((json['🔗 Alias']?.['🔵 Radius'] ?? {}) as Record<string, unknown>)

  const rules: Rule[] = []
  const safelist: string[] = []
  const metadata: RuleMetadata[] = []

  for (const token of tokens) {
    // ds-alias-radius-base → '' (no suffix), ds-alias-radius-none → '-none'
    const segment = token.name.replace('ds-alias-radius-', '')
    const suffix = segment === 'base' ? '' : `-${segment}`
    const val = `var(--${token.name})`

    const add = (cls: string, props: Record<string, string>) => {
      rules.push([cls, props])
      safelist.push(cls)
      const properties = Object.keys(props).map(k => k.replace(' !important', ''))
      metadata.push({
        class: cls,
        property: properties.length === 1 ? properties[0] : properties,
        token: token.name,
      })
    }

    add(`radius${suffix}`, { 'border-radius': `${val} !important` })

    add(`radius-top${suffix}`, {
      'border-top-left-radius': `${val} !important`,
      'border-top-right-radius': `${val} !important`,
    })
    add(`radius-bottom${suffix}`, {
      'border-bottom-left-radius': `${val} !important`,
      'border-bottom-right-radius': `${val} !important`,
    })
    add(`radius-top-left${suffix}`, { 'border-top-left-radius': `${val} !important` })
    add(`radius-top-right${suffix}`, { 'border-top-right-radius': `${val} !important` })
    add(`radius-bottom-left${suffix}`, { 'border-bottom-left-radius': `${val} !important` })
    add(`radius-bottom-right${suffix}`, { 'border-bottom-right-radius': `${val} !important` })
  }

  return { rules, safelist, metadata }
}
