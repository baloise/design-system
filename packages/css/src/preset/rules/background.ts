import { readFileSync } from 'node:fs'
import type { Rule } from 'unocss'
import { flattenTokens, type RuleMetadata } from '../utils'

/** Derive the `bg-*` class name from a token name. */
function toClassName(name: string, strip: string): string {
  return 'bg-' + name.replace(strip, '')
}

/**
 * Build background-color rules dynamically from base.tokens.json.
 *
 * Mirrors the logic in libs/nx/src/executors/build-styles/generators/background.ts:
 *  - Alias tokens   (🔗 Alias › 🎨 Background › Color) → primary source
 *  - Global tokens  (🌐 Global › 🌈 Color)             → fills gaps not in alias
 */
export function buildBackgroundRules(tokensJsonPath: string): {
  rules: Rule[]
  safelist: string[]
  metadata: RuleMetadata[]
} {
  const json = JSON.parse(readFileSync(tokensJsonPath, 'utf8'))

  const seen = new Set<string>()
  const rules: Rule[] = []
  const safelist: string[] = []
  const metadata: RuleMetadata[] = []

  const addRule = (className: string, cssVar: string) => {
    if (seen.has(className)) return
    seen.add(className)
    rules.push([className, { 'background-color': `var(--${cssVar}) !important` }])
    safelist.push(className)
    metadata.push({
      class: className,
      property: 'background-color',
      token: cssVar,
    })
  }

  // 1. Alias background tokens
  const aliasTokens = flattenTokens((json['🔗 Alias']?.['🎨 Background']?.['Color'] ?? {}) as Record<string, unknown>)
  for (const token of aliasTokens) {
    const className = toClassName(token.name, 'ds-alias-background-color-')
    addRule(className, token.name)
  }

  // 2. Global color tokens (fill gaps not covered by alias tokens)
  const globalTokens = flattenTokens((json['🌐 Global']?.['🌈 Color'] ?? {}) as Record<string, unknown>)
  for (const token of globalTokens) {
    const className = toClassName(token.name, 'ds-global-color-')
    addRule(className, token.name)
  }

  return { rules, safelist, metadata }
}
