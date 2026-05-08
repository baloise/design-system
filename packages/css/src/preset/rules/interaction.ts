import type { Rule } from 'unocss'
import { metadataFromRules, type RuleMetadata } from '../utils'

export const interactionRules: Rule[] = [
  // user-select
  ['select-none', { 'user-select': 'none !important' }],
  ['select-text', { 'user-select': 'text !important' }],
  ['select-all', { 'user-select': 'all !important' }],
  ['select-auto', { 'user-select': 'auto !important' }],

  // cursor
  ['cursor-auto', { cursor: 'auto !important' }],
  ['cursor-pointer', { cursor: 'pointer !important' }],
  ['cursor-wait', { cursor: 'wait !important' }],
  ['cursor-move', { cursor: 'move !important' }],
  ['cursor-not-allowed', { cursor: 'not-allowed !important' }],

  // pointer-events
  ['pointer-events-auto', { 'pointer-events': 'auto !important' }],
  ['pointer-events-none', { 'pointer-events': 'none !important' }],
]

export const interactionSafelist: string[] = interactionRules.map(r => r[0] as string)
export const interactionMetadata: RuleMetadata[] = metadataFromRules(interactionRules as Array<[string, Record<string, string>]>)
