import type { Rule } from 'unocss'
import { readFileSync } from 'node:fs'
import { flattenTokens, type RuleMetadata } from '../utils'

/**
 * Generate border utility classes from design tokens.
 * Reads from 🔗 Alias › ▭ Border › Color and Width tokens.
 *
 * Each class sets only the properties for the side(s) it targets:
 *   .border-{color}         — all sides: border-color + border-width + border-style
 *   .border-top-{color}     — top only:  border-top-color + border-top-width + border-top-style
 *   .border-bottom-{color}  — bottom only
 *   .border-left-{color}    — left only
 *   .border-right-{color}   — right only
 *
 * Remove helpers:
 *   .border-none, .border-top-none, .border-bottom-none, .border-left-none, .border-right-none
 *
 * Default-color helpers (uses base color token):
 *   .border, .border-top, .border-bottom, .border-left, .border-right
 *
 * Width helpers:
 *   .border-width-none, .border-width-base, .border-width-md
 */
export function buildBorderColorRules(tokensJsonPath: string) {
  const tokensJson = JSON.parse(readFileSync(tokensJsonPath, 'utf-8'))

  const borderColorTokens = flattenTokens(tokensJson['🔗 Alias']?.['▭ Border']?.Color || {})
  const borderWidthTokens = flattenTokens(tokensJson['🔗 Alias']?.['▭ Border']?.Width || {})

  // Build a lookup for width tokens by their short name (none, base, md, …)
  const widthVar = (key: string) => {
    const t = borderWidthTokens.find(t => t.name === `ds-alias-border-width-${key}`)
    return t ? `var(--${t.name})` : undefined
  }

  const widthBase = widthVar('base') ?? 'var(--ds-alias-border-width-base)'
  const widthNone = widthVar('none') ?? 'var(--ds-alias-border-width-none)'
  const widthMd = widthVar('md') ?? 'var(--ds-alias-border-width-md)'

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

  // Each side descriptor: which CSS properties it owns
  const sides = [
    {
      prefix: '',
      color: 'border-color',
      width: 'border-width',
      style: 'border-style',
    },
    {
      prefix: 'top-',
      color: 'border-top-color',
      width: 'border-top-width',
      style: 'border-top-style',
    },
    {
      prefix: 'bottom-',
      color: 'border-bottom-color',
      width: 'border-bottom-width',
      style: 'border-bottom-style',
    },
    {
      prefix: 'left-',
      color: 'border-left-color',
      width: 'border-left-width',
      style: 'border-left-style',
    },
    {
      prefix: 'right-',
      color: 'border-right-color',
      width: 'border-right-width',
      style: 'border-right-style',
    },
  ]

  // Color + width + style classes from tokens
  for (const token of borderColorTokens) {
    const colorName = token.name.replace('ds-alias-border-color-', '')
    for (const side of sides) {
      const className = `border-${side.prefix}${colorName}`
      addRule(
        className,
        {
          [side.color]: `var(--${token.name}) !important`,
          [side.width]: `${widthBase} !important`,
          [side.style]: 'solid',
        },
        token.name,
      )
    }
  }

  // Default-color helpers (uses base color token)
  const baseColorVar = 'var(--ds-alias-border-color-base)'
  for (const side of sides) {
    const className = side.prefix ? `border-${side.prefix.replace(/-$/, '')}` : 'border'
    addRule(
      className,
      {
        [side.color]: `${baseColorVar} !important`,
        [side.width]: `${widthBase} !important`,
        [side.style]: 'solid',
      },
      'ds-alias-border-color-base',
    )
  }

  // Remove-border helpers
  addRule('border-none', { border: 'none !important' }, 'static')
  addRule('border-top-none', { 'border-top': 'none !important' }, 'static')
  addRule('border-bottom-none', { 'border-bottom': 'none !important' }, 'static')
  addRule('border-left-none', { 'border-left': 'none !important' }, 'static')
  addRule('border-right-none', { 'border-right': 'none !important' }, 'static')

  // Border-width helpers
  addRule('border-width-none', { 'border-width': `${widthNone} !important` }, 'ds-alias-border-width-none')
  addRule('border-width-base', { 'border-width': `${widthBase} !important` }, 'ds-alias-border-width-base')
  addRule('border-width-md', { 'border-width': `${widthMd} !important` }, 'ds-alias-border-width-md')

  return { rules, safelist, metadata }
}
