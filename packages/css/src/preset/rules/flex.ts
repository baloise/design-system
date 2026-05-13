import type { Rule } from 'unocss'
import { metadataFromRules, type RuleMetadata } from '../utils'

const sizes = ['none', 'auto', '2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const
type Size = (typeof sizes)[number]

const aliases: Record<string, Size> = {
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

function sv(size: Size | string): string {
  return `var(--ds-alias-space-${size}-device)`
}

export const flexRules: Rule[] = [
  // display
  ['flex', { display: 'flex !important' }],
  ['inline-flex', { display: 'inline-flex !important' }],

  // flex-direction
  ['flex-direction-row', { 'flex-direction': 'row !important' }],
  ['flex-direction-row-reverse', { 'flex-direction': 'row-reverse !important' }],
  ['flex-direction-column', { 'flex-direction': 'column !important' }],
  ['flex-direction-column-reverse', { 'flex-direction': 'column-reverse !important' }],

  // flex-wrap
  ['flex-wrap', { 'flex-wrap': 'wrap !important' }],
  ['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse !important' }],
  ['flex-nowrap', { 'flex-wrap': 'nowrap !important' }],

  // flex sizing
  ['flex-1', { flex: '1 1 0% !important' }],
  ['flex-auto', { flex: '1 1 auto !important' }],
  ['flex-initial', { flex: '0 1 auto !important' }],
  ['flex-none', { flex: 'none !important' }],

  // align-content
  ...(['start', 'end', 'center', 'baseline', 'space-between', 'space-around', 'space-evenly'] as const).map(
    v => [`align-content-${v}`, { 'align-content': `${v} !important` }] as Rule,
  ),

  // align-items
  ...(['start', 'end', 'center', 'baseline', 'stretch'] as const).map(
    v => [`align-items-${v}`, { 'align-items': `${v} !important` }] as Rule,
  ),

  // align-self
  ...(['start', 'end', 'center', 'baseline', 'stretch'] as const).map(
    v => [`align-self-${v}`, { 'align-self': `${v} !important` }] as Rule,
  ),

  // justify-content
  ...(['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'] as const).map(
    v => [`justify-content-${v}`, { 'justify-content': `${v} !important` }] as Rule,
  ),

  // gap variants already in spacing.ts — but flex also owns these semantically
  // (no duplication: spacing.ts and this file both emit them, UnoCSS deduplicates)
]

// gap, column-gap, row-gap with size tokens (same pattern as spacing)
for (const gapProp of ['gap', 'column-gap', 'row-gap'] as const) {
  for (const size of sizes) {
    flexRules.push([`${gapProp}-${size}`, { [gapProp]: `${sv(size)} !important` }])
    for (const [alias, canonical] of Object.entries(aliases)) {
      if (canonical === size) {
        flexRules.push([`${gapProp}-${alias}`, { [gapProp]: `${sv(size)} !important` }])
      }
    }
  }
}

export const flexSafelist: string[] = flexRules.map(r => r[0] as string)
export const flexMetadata: RuleMetadata[] = metadataFromRules(flexRules as Array<[string, Record<string, string>]>)
