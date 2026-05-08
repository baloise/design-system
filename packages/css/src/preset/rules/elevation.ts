import { readFileSync } from 'node:fs'
import type { Rule } from 'unocss'
import { flattenTokens, type RuleMetadata } from '../utils'

/**
 * Build elevation rules (z-index, opacity, shadow) dynamically from base.tokens.json.
 *
 * Sources:
 *  - 🔗 Alias › 🗂️ ZIndex     → z-index-* classes
 *  - 🔗 Alias › 🌫️ Opacity    → opacity-* classes
 *  - 🔗 Alias › 🌓 Shadow › Box → shadow* classes
 */
export function buildElevationRules(tokensJsonPath: string): {
  rules: Rule[]
  safelist: string[]
  metadata: RuleMetadata[]
} {
  const json = JSON.parse(readFileSync(tokensJsonPath, 'utf8'))
  const alias = json['🔗 Alias'] ?? {}

  const rules: Rule[] = []
  const safelist: string[] = []
  const metadata: RuleMetadata[] = []

  const addRule = (className: string, props: Record<string, string>, token: string) => {
    const key = Object.keys(props)[0]
    rules.push([className, props])
    safelist.push(className)
    metadata.push({
      class: className,
      property: key,
      token,
    })
  }

  // 1. Z-Index tokens
  const zIndexTokens = flattenTokens((alias['🗂️ ZIndex'] ?? {}) as Record<string, unknown>)
  for (const token of zIndexTokens) {
    const segment = token.name.replace('ds-alias-z-index-', '')
    const className = `z-index-${segment}`
    addRule(className, { 'z-index': `var(--${token.name}) !important` }, token.name)
  }

  // 2. Opacity tokens
  const opacityTokens = flattenTokens((alias['🌫️ Opacity'] ?? {}) as Record<string, unknown>)
  for (const token of opacityTokens) {
    const segment = token.name.replace('ds-alias-opacity-', '')
    const className = `opacity-${segment}`
    addRule(className, { opacity: `var(--${token.name}) !important` }, token.name)
  }

  // 3. Shadow (box) tokens
  const shadowTokens = flattenTokens((alias['🌓 Shadow']?.['Box'] ?? {}) as Record<string, unknown>)
  for (const token of shadowTokens) {
    // ds-alias-shadow-box-none → shadow-none
    // ds-alias-shadow-box-base → shadow (default, no suffix)
    const segment = token.name.replace('ds-alias-shadow-box-', '')
    const className = segment === 'base' ? 'shadow' : `shadow-${segment}`
    addRule(className, { 'box-shadow': `var(--${token.name}) !important` }, token.name)
  }

  return { rules, safelist, metadata }
}

export const elevationRules: Rule[] = []
export const elevationSafelist: string[] = []
