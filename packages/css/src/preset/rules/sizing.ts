import type { Rule } from 'unocss'
import { metadataFromRules, type RuleMetadata } from '../utils'

// h- and w- fixed rem values (1–30)
const remRange = Array.from({ length: 30 }, (_, i) => i + 1)

// w- fraction classes: w-1 through w-12 (twelfths)
const fractions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

const keywords = ['full', 'screen', 'auto', 'min', 'max', 'fit'] as const

function kwVal(kw: string): string {
  switch (kw) {
    case 'full':
      return '100%'
    case 'screen':
      return '100vh'
    default:
      return `${kw}-content`
  }
}

function kwWVal(kw: string): string {
  switch (kw) {
    case 'full':
      return '100%'
    case 'screen':
      return '100vw'
    default:
      return `${kw}-content`
  }
}

export const sizingRules: Rule[] = [
  // height keywords
  ...keywords.map(kw => [`h-${kw}`, { height: `${kwVal(kw)} !important` }] as Rule),
  // height rem
  ...remRange.map(n => [`h-${n}rem`, { height: `${n}rem !important` }] as Rule),

  // width keywords
  ...keywords.map(kw => [`w-${kw}`, { width: `${kwWVal(kw)} !important` }] as Rule),
  // width rem
  ...remRange.map(n => [`w-${n}rem`, { width: `${n}rem !important` }] as Rule),
  // width fractions (w-1 through w-12 = 1/12 … 12/12)
  ...fractions.map(n => [`w-${n}`, { width: `${Math.round((n / 12) * 10000) / 100}% !important` }] as Rule),

  // min-height
  ['min-h-0', { 'min-height': '0 !important' }],
  ['min-h-auto', { 'min-height': 'auto !important' }],
  ['min-h-full', { 'min-height': '100% !important' }],
  ['min-h-screen', { 'min-height': '100vh !important' }],
  ['min-h-min', { 'min-height': 'min-content !important' }],
  ['min-h-max', { 'min-height': 'max-content !important' }],
  ['min-h-fit', { 'min-height': 'fit-content !important' }],

  // max-height
  ['max-h-0', { 'max-height': '0 !important' }],
  ['max-h-auto', { 'max-height': 'auto !important' }],
  ['max-h-full', { 'max-height': '100% !important' }],
  ['max-h-screen', { 'max-height': '100vh !important' }],

  // min-width
  ['min-w-0', { 'min-width': '0 !important' }],
  ['min-w-auto', { 'min-width': 'auto !important' }],
  ['min-w-full', { 'min-width': '100% !important' }],
  ['min-w-screen', { 'min-width': '100vw !important' }],
  ['min-w-min', { 'min-width': 'min-content !important' }],
  ['min-w-max', { 'min-width': 'max-content !important' }],
  ['min-w-fit', { 'min-width': 'fit-content !important' }],

  // max-width
  ['max-w-0', { 'max-width': '0 !important' }],
  ['max-w-auto', { 'max-width': 'auto !important' }],
  ['max-w-full', { 'max-width': '100% !important' }],
  ['max-w-screen', { 'max-width': '100vw !important' }],
  ['max-w-min', { 'max-width': 'min-content !important' }],
  ['max-w-max', { 'max-width': 'max-content !important' }],
  ['max-w-fit', { 'max-width': 'fit-content !important' }],
]

export const sizingSafelist: string[] = sizingRules.map(r => r[0] as string)
export const sizingMetadata: RuleMetadata[] = metadataFromRules(sizingRules as Array<[string, Record<string, string>]>)
