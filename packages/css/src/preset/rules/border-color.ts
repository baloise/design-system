import type { Rule } from 'unocss'
import { readFileSync } from 'node:fs'
import { flattenTokens, type RuleMetadata } from '../utils'

/**
 * Generate border utility classes from design tokens.
 * Reads from 🔗 Alias › ▭ Border › Composite (curated width+style+color shorthand
 * tokens) and Width tokens.
 *
 * Each class sets a single shorthand property for the side(s) it targets:
 *   .border-{name}         — border
 *   .border-top-{name}     — border-top
 *   .border-bottom-{name}  — border-bottom
 *   .border-left-{name}    — border-left
 *   .border-right-{name}   — border-right
 *
 * Remove helpers:
 *   .border-none, .border-top-none, .border-bottom-none, .border-left-none, .border-right-none
 *
 * Default helpers (alias to the Grey composite):
 *   .border, .border-top, .border-bottom, .border-left, .border-right
 *
 * Width helpers:
 *   .border-width-none (static 0), .border-width-base
 */
export function buildBorderColorRules(tokensJsonPath: string) {
  const tokensJson = JSON.parse(readFileSync(tokensJsonPath, 'utf-8'))

  const borderCompositeTokens = flattenTokens(tokensJson['🔗 Alias']?.['▭ Border']?.Composite || {})

  const rules: Rule[] = []
  const metadata: RuleMetadata[] = []
  const safelist: string[] = []

  const addRule = (className: string, css: Record<string, string>, tokenName: string) => {
    rules.push([className, css])
    safelist.push(className)
    const properties = Object.keys(css)
    metadata.push({
      class: className,
      property: properties.length === 1 ? properties[0] : properties,
      token: tokenName,
    })
  }

  // Each side descriptor: which single shorthand property it owns
  const sides = [
    { prefix: '', property: 'border' },
    { prefix: 'top-', property: 'border-top' },
    { prefix: 'bottom-', property: 'border-bottom' },
    { prefix: 'left-', property: 'border-left' },
    { prefix: 'right-', property: 'border-right' },
  ]

  // Composite shorthand classes from tokens
  for (const token of borderCompositeTokens) {
    const name = token.name.replace('ds-alias-border-composite-', '')
    for (const side of sides) {
      const className = `border-${side.prefix}${name}`
      addRule(className, { [side.property]: `var(--${token.name}) !important` }, token.name)
    }
  }

  // Default helpers (alias to the Grey composite)
  const greyToken = borderCompositeTokens.find(t => t.name === 'ds-alias-border-composite-grey')
  const defaultVar = greyToken ? `var(--${greyToken.name})` : 'var(--ds-alias-border-composite-grey)'
  for (const side of sides) {
    const className = side.prefix ? `border-${side.prefix.replace(/-$/, '')}` : 'border'
    addRule(className, { [side.property]: `${defaultVar} !important` }, 'ds-alias-border-composite-grey')
  }

  // Remove-border helpers
  addRule('border-none', { border: 'none !important' }, 'static')
  addRule('border-top-none', { 'border-top': 'none !important' }, 'static')
  addRule('border-bottom-none', { 'border-bottom': 'none !important' }, 'static')
  addRule('border-left-none', { 'border-left': 'none !important' }, 'static')
  addRule('border-right-none', { 'border-right': 'none !important' }, 'static')

  // Border-width helpers
  addRule('border-width-none', { 'border-width': '0 !important' }, 'static')
  addRule(
    'border-width-base',
    { 'border-width': 'var(--ds-alias-border-width-base) !important' },
    'ds-alias-border-width-base',
  )

  return { rules, safelist, metadata }
}
