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
 *  - Alias tokens   (🔗 Alias › 🎨 Background › Color) → primary source
 *  - Global tokens  (🌐 Global › 🌈 Color)             → fills gaps not in alias
 *
 * Each surface's `On{Name}` sibling (the WCAG-AA-safe text color for that
 * surface) is excluded from `.bg-*` generation and instead emits a
 * `.text-on-{name}` class, so `bg-primary text-on-primary` is always legible.
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

  const addRule = (className: string, cssVar: string, property: string) => {
    if (seen.has(className)) return
    seen.add(className)
    rules.push([className, { [property]: `var(--${cssVar}) !important` }])
    safelist.push(className)
    metadata.push({
      class: className,
      property,
      token: cssVar,
    })
  }

  // 1. Alias background tokens (On* siblings become text-on-* instead of bg-on-*)
  const aliasTokens = flattenTokens((json['🔗 Alias']?.['🎨 Surface'] ?? {}) as Record<string, unknown>)
  for (const token of aliasTokens) {
    const name = token.name.replace('ds-alias-surface-', '')
    if (name.startsWith('on-')) {
      addRule(`text-${name}`, token.name, 'color')
    } else {
      addRule(toClassName(token.name, 'ds-alias-surface-'), token.name, 'background-color')
    }
  }

  // 2. Global color tokens (fill gaps not covered by alias tokens)
  const globalTokens = flattenTokens((json['🌐 Global']?.['🌈 Color'] ?? {}) as Record<string, unknown>)
  for (const token of globalTokens) {
    const className = toClassName(token.name, 'ds-global-color-')
    addRule(className, token.name, 'background-color')
  }

  return { rules, safelist, metadata }
}
