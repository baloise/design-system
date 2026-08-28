import { readFileSync } from 'node:fs'
import type { Rule, StaticRule } from 'unocss'
import { type RuleMetadata } from '../utils'

/**
 * Build spacing rules (margin, padding, gap) dynamically from base.tokens.json.
 * Source: 🔗 Alias › ↔️ Space
 *
 * Each size group (None, Auto, 2XS, …) contributes a set of margin/padding/gap
 * classes referencing the responsive `-device` CSS variable so that the classes
 * respond to breakpoints automatically via the token CSS. `Auto` has no
 * responsive variant, so it falls back to the plain (non-`-device`) CSS variable.
 * Backward-compat aliases (xx-small, x-small, …) are also emitted.
 */

const aliases: Record<string, string> = {
  'xx-small': '2xs',
  'x-small': 'xs',
  'small': 'sm',
  'normal': 'base',
  'medium': 'md',
  'large': 'lg',
  'x-large': 'xl',
  'xx-large': '2xl',
  'xxx-large': '3xl',
  'xxxx-large': '4xl',
}

const prefixProps: Array<[string, string[]]> = [
  ['m', ['margin']],
  ['mx', ['margin-left', 'margin-right']],
  ['my', ['margin-top', 'margin-bottom']],
  ['mt', ['margin-top']],
  ['mr', ['margin-right']],
  ['mb', ['margin-bottom']],
  ['ml', ['margin-left']],
  ['p', ['padding']],
  ['px', ['padding-left', 'padding-right']],
  ['py', ['padding-top', 'padding-bottom']],
  ['pt', ['padding-top']],
  ['pr', ['padding-right']],
  ['pb', ['padding-bottom']],
  ['pl', ['padding-left']],
]

function sv(size: string): string {
  if (size === 'auto') {
    return `var(--ds-alias-space-auto)`
  }
  return `var(--ds-alias-space-${size}-device)`
}

function makeRule(className: string, props: string[], size: string): StaticRule {
  return [className, Object.fromEntries(props.map(p => [p, `${sv(size)} !important`]))]
}

export function buildSpacingRules(tokensJsonPath: string): {
  rules: Rule[]
  safelist: string[]
  metadata: RuleMetadata[]
} {
  const json = JSON.parse(readFileSync(tokensJsonPath, 'utf8'))
  const spaceCategory = (json['🔗 Alias']?.['↔️ Space'] ?? {}) as Record<string, unknown>

  // Extract canonical size keys directly from the token JSON keys.
  // e.g. "2XS" → "2xs", "None" → "none"
  const sizes: string[] = Object.keys(spaceCategory).map(key => key.toLowerCase())

  const rules: Rule[] = []
  const safelist: string[] = []
  const metadata: RuleMetadata[] = []

  const addRule = (className: string, props: string[], size: string) => {
    rules.push(makeRule(className, props, size))
    safelist.push(className)
    metadata.push({
      class: className,
      property: props.length === 1 ? props[0] : props,
      token: size === 'auto' ? `ds-alias-space-auto` : `ds-alias-space-${size}-device`,
    })
  }

  for (const [prefix, props] of prefixProps) {
    for (const size of sizes) {
      addRule(`${prefix}-${size}`, props, size)
      for (const [alias, canonical] of Object.entries(aliases)) {
        if (canonical === size) {
          addRule(`${prefix}-${alias}`, props, size)
        }
      }
    }
  }

  for (const gapProp of ['gap', 'column-gap', 'row-gap']) {
    for (const size of sizes) {
      addRule(`${gapProp}-${size}`, [gapProp], size)
      for (const [alias, canonical] of Object.entries(aliases)) {
        if (canonical === size) {
          addRule(`${gapProp}-${alias}`, [gapProp], size)
        }
      }
    }
  }

  return { rules, safelist, metadata }
}

// Populated at build time via buildSpacingRules — empty stubs for module-level imports.
export const spacingRules: Rule[] = []
export const spacingSafelist: string[] = []
