import { readFileSync } from 'node:fs'
import type { Rule } from 'unocss'
import { flattenTokens, type RuleMetadata } from '../utils'

/**
 * Build typography rules dynamically from base.tokens.json.
 *
 * Sources:
 *  - 🔗 Alias › 🔤 Text › Color      → text-* color classes
 *  - 🔗 Alias › 🔤 Text › Size       → text-* size classes
 *  - 🔗 Alias › 🔤 Text › Family     → font-family-* classes
 *  - 🔗 Alias › 🔤 Text › Weight     → font-weight-* classes
 *  - 🔗 Alias › 🔤 Text › LineHeight → line-height-* classes
 *
 * Static (non-token) classes: text-align-*, text-transform, white-space-*, text-overflow-*
 */
export function buildTypographyRules(tokensJsonPath: string): {
  rules: Rule[]
  safelist: string[]
  metadata: RuleMetadata[]
  rawCSS: string
} {
  const json = JSON.parse(readFileSync(tokensJsonPath, 'utf8'))
  const textAlias = json['🔗 Alias']?.['🔤 Text'] ?? {}

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

  // 1. Text color tokens
  const colorTokens = flattenTokens((textAlias['Color'] ?? {}) as Record<string, unknown>)
  for (const token of colorTokens) {
    const segment = token.name.replace('ds-alias-text-color-', '')
    const className = `text-${segment}`
    addRule(className, { color: `var(--${token.name}) !important` }, token.name)
  }

  // 2. Text size tokens — one responsive class per size using the -device token.
  // Each size group (None, XS, SM…) has Mobile/Tablet/Desktop sub-tokens; we
  // extract the canonical size name from the Mobile entry and reference the
  // -device CSS variable so the single class responds to breakpoints automatically.
  const sizeCategory = (textAlias['Size'] ?? {}) as Record<string, Record<string, { name?: string }>>
  const sizeAliases: Record<string, string> = {
    'xs': 'x-small',
    'sm': 'small',
    'base': 'normal',
    'md': 'medium',
    'lg': 'large',
    'xl': 'x-large',
    '2xl': 'xx-large',
    '3xl': 'xxx-large',
    '4xl': 'xxxx-large',
    '5xl': 'xxxxx-large',
  }
  for (const sizeGroup of Object.values(sizeCategory)) {
    const mobileName = sizeGroup['Mobile']?.name
    if (!mobileName) continue
    const size = mobileName.replace('ds-alias-text-size-', '').replace('-mobile', '')
    const tokenName = `ds-alias-text-size-${size}-device`
    addRule(`text-${size}`, { 'font-size': `var(--${tokenName}) !important` }, tokenName)
    if (size in sizeAliases) {
      const aliasName = `text-${sizeAliases[size]}`
      rules.push([aliasName, { 'font-size': `var(--${tokenName}) !important` }])
      safelist.push(aliasName)
    }
  }

  // 3. Text family tokens
  const familyTokens = flattenTokens((textAlias['Family'] ?? {}) as Record<string, unknown>)
  for (const token of familyTokens) {
    const segment = token.name.replace('ds-alias-text-family-', '')
    const className = `font-family-${segment}`
    addRule(className, { 'font-family': `var(--${token.name}) !important` }, token.name)
  }

  // 4. Text weight tokens
  const weightTokens = flattenTokens((textAlias['Weight'] ?? {}) as Record<string, unknown>)
  for (const token of weightTokens) {
    const segment = token.name.replace('ds-alias-text-weight-', '')
    const className = `font-weight-${segment}`
    addRule(className, { 'font-weight': `var(--${token.name}) !important` }, token.name)
  }

  // 5. Line-height tokens
  const lineTokens = flattenTokens((textAlias['LineHeight'] ?? {}) as Record<string, unknown>)
  for (const token of lineTokens) {
    const segment = token.name.replace('ds-alias-text-line-height-', '')
    const className = `line-height-${segment}`
    addRule(className, { 'line-height': `var(--${token.name}) !important` }, token.name)
  }

  // 6. Static (non-token) typography classes
  const staticRules: Rule[] = [
    ['text-align-left', { 'text-align': 'left !important' }],
    ['text-align-center', { 'text-align': 'center !important' }],
    ['text-align-right', { 'text-align': 'right !important' }],
    ['text-align-justify', { 'text-align': 'justify !important' }],
    ['uppercase', { 'text-transform': 'uppercase !important' }],
    ['lowercase', { 'text-transform': 'lowercase !important' }],
    ['capitalize', { 'text-transform': 'capitalize !important' }],
    ['text-overflow-ellipsis', { 'text-overflow': 'ellipsis !important' }],
    ['text-overflow-clip', { 'text-overflow': 'clip !important' }],
    ['white-space-nowrap', { 'white-space': 'nowrap !important' }],
    ['white-space-normal', { 'white-space': 'normal !important' }],
  ]
  rules.push(...staticRules)
  safelist.push(...staticRules.map(r => r[0] as string))

  // Raw CSS for pseudo-class text color variants
  const colorClassNames = colorTokens.map(t => t.name.replace('ds-alias-text-color-', ''))
  const rawCSS = colorClassNames
    .flatMap(name => [
      `.focus\\:text-${name}:focus { color: var(--ds-alias-text-color-${name}) !important; }`,
      `.hover\\:text-${name}:hover { color: var(--ds-alias-text-color-${name}) !important; }`,
      `.active\\:text-${name}:active { color: var(--ds-alias-text-color-${name}) !important; }`,
    ])
    .join('\n')

  return { rules, safelist, metadata, rawCSS }
}

export const typographyRules: Rule[] = []
export const typographySafelist: string[] = []
export const typographyRawCSS: string = ''
