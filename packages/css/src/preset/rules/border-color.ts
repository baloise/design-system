import type { Rule } from 'unocss'
import { readFileSync } from 'node:fs'
import { flattenTokens, metadataFromRules, type RuleMetadata } from '../utils'

/**
 * Generate border-color utility classes from design tokens.
 * Reads from 🔗 Alias › ▭ Border › Color tokens
 *
 * Creates rules for:
 * - `.border-{color}` — all sides
 * - `.border-top-{color}` — top side only
 * - `.border-bottom-{color}` — bottom side only
 * - `.border-left-{color}` — left side only
 * - `.border-right-{color}` — right side only
 * - `.border-none`, `.border-top-none`, `.border-bottom-none`, `.border-left-none`, `.border-right-none` — remove borders
 * - `.border-top`, `.border-bottom`, `.border-left`, `.border-right` — default borders
 * - `.border-width-*` — border width utilities
 */
export function buildBorderColorRules(tokensJsonPath: string) {
  const tokensJson = JSON.parse(readFileSync(tokensJsonPath, 'utf-8'))

  // Extract border color tokens: 🔗 Alias › ▭ Border › Color
  const borderColorTokens = flattenTokens(tokensJson['🔗 Alias']?.['▭ Border']?.Color || {})

  const rules: Rule[] = []
  const metadata: RuleMetadata[] = []
  const safelist: string[] = []

  // Define border sides to generate
  const sides = [
    { prefix: '', properties: ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'] },
    { prefix: 'top-', properties: ['border-top-color'] },
    { prefix: 'bottom-', properties: ['border-bottom-color'] },
    { prefix: 'left-', properties: ['border-left-color'] },
    { prefix: 'right-', properties: ['border-right-color'] },
  ]

  // Generate rules for each color token and each side
  for (const token of borderColorTokens) {
    // Extract color name from token (e.g., 'ds-alias-border-color-danger' → 'danger')
    const colorName = token.name.replace('ds-alias-border-color-', '')

    for (const side of sides) {
      const className = `border-${side.prefix}${colorName}`
      const cssVarRef = `var(--${token.name})`

      // Build CSS object
      const css: Record<string, string> = {
        'border-top-style': 'solid',
        'border-right-style': 'solid',
        'border-bottom-style': 'solid',
        'border-left-style': 'solid',
      }

      // Set color for relevant side(s)
      for (const prop of side.properties) {
        css[prop] = cssVarRef + ' !important'
      }

      rules.push([className, css])
      safelist.push(className)
      metadata.push({
        class: className,
        property: side.properties,
        token: token.name,
      })
    }
  }

  // Add static border utility rules (not from tokens)
  const borderStaticRules: [string, Record<string, string>][] = [
    // Default borders
    [
      'border',
      {
        'border-top-width': '1px',
        'border-right-width': '1px',
        'border-bottom-width': '1px',
        'border-left-width': '1px',
        'border-top-style': 'solid',
        'border-right-style': 'solid',
        'border-bottom-style': 'solid',
        'border-left-style': 'solid',
        'border-color': '#ccc !important',
      },
    ],
    ['border-top', { 'border-top-width': '1px', 'border-top-style': 'solid', 'border-top-color': '#ccc !important' }],
    [
      'border-bottom',
      { 'border-bottom-width': '1px', 'border-bottom-style': 'solid', 'border-bottom-color': '#ccc !important' },
    ],
    [
      'border-left',
      { 'border-left-width': '1px', 'border-left-style': 'solid', 'border-left-color': '#ccc !important' },
    ],
    [
      'border-right',
      { 'border-right-width': '1px', 'border-right-style': 'solid', 'border-right-color': '#ccc !important' },
    ],

    // Remove borders
    ['border-none', { border: 'none !important' }],
    ['border-top-none', { 'border-top': 'none !important' }],
    ['border-bottom-none', { 'border-bottom': 'none !important' }],
    ['border-left-none', { 'border-left': 'none !important' }],
    ['border-right-none', { 'border-right': 'none !important' }],

    // Border widths
    ['border-width', { 'border-width': '1px !important' }],
    ['border-width-none', { 'border-width': '0 !important' }],
    ['border-width-md', { 'border-width': '2px !important' }],
  ]

  for (const [className, css] of borderStaticRules) {
    rules.push([className, css])
    safelist.push(className)
    // Static rules don't have token references
    const properties = Object.keys(css)
    metadata.push({
      class: className,
      property: properties.length === 1 ? properties[0] : properties,
      token: 'static',
    })
  }

  return { rules, safelist, metadata }
}
