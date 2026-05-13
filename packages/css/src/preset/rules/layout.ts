import type { Rule } from 'unocss'
import { metadataFromRules, type RuleMetadata } from '../utils'

export const layoutRules: Rule[] = [
  // display
  ['hidden', { display: 'none !important' }],
  ['block', { display: 'block !important' }],
  ['inline', { display: 'inline !important' }],
  ['inline-block', { display: 'inline-block !important' }],
  ['flex', { display: 'flex !important' }],
  ['inline-flex', { display: 'inline-flex !important' }],

  // position
  ['static', { position: 'static !important' }],
  ['relative', { position: 'relative !important' }],
  ['absolute', { position: 'absolute !important' }],
  ['fixed', { position: 'fixed !important' }],
  ['sticky', { position: 'sticky !important' }],

  // overflow
  ['overflow-auto', { overflow: 'auto !important' }],
  ['overflow-hidden', { overflow: 'hidden !important' }],
  ['overflow-visible', { overflow: 'visible !important' }],
  ['overflow-scroll', { overflow: 'scroll !important' }],
  ['overflow-x-auto', { 'overflow-x': 'auto !important' }],
  ['overflow-x-hidden', { 'overflow-x': 'hidden !important' }],
  ['overflow-x-visible', { 'overflow-x': 'visible !important' }],
  ['overflow-x-scroll', { 'overflow-x': 'scroll !important' }],
  ['overflow-y-auto', { 'overflow-y': 'auto !important' }],
  ['overflow-y-hidden', { 'overflow-y': 'hidden !important' }],
  ['overflow-y-visible', { 'overflow-y': 'visible !important' }],
  ['overflow-y-scroll', { 'overflow-y': 'scroll !important' }],

  // vertical-align
  ['vertical-align-top', { 'vertical-align': 'top !important' }],
  ['vertical-align-middle', { 'vertical-align': 'middle !important' }],
  ['vertical-align-bottom', { 'vertical-align': 'bottom !important' }],

  // inset helpers
  ['top-0', { top: '0 !important' }],
  ['top-auto', { top: 'auto !important' }],
  ['top-50', { top: '50% !important' }],
  ['top-100', { top: '100% !important' }],
  ['top-1rem', { top: '1rem !important' }],
  ['top-0-5rem', { top: '0.5rem !important' }],
  ['top-0-25rem', { top: '0.25rem !important' }],
  ['right-0', { right: '0 !important' }],
  ['right-auto', { right: 'auto !important' }],
  ['right-50', { right: '50% !important' }],
  ['right-100', { right: '100% !important' }],
  ['right-1rem', { right: '1rem !important' }],
  ['bottom-0', { bottom: '0 !important' }],
  ['bottom-auto', { bottom: 'auto !important' }],
  ['bottom-50', { bottom: '50% !important' }],
  ['bottom-100', { bottom: '100% !important' }],
  ['bottom-1rem', { bottom: '1rem !important' }],
  ['left-0', { left: '0 !important' }],
  ['left-auto', { left: 'auto !important' }],
  ['left-50', { left: '50% !important' }],
  ['left-100', { left: '100% !important' }],
  ['left-1rem', { left: '1rem !important' }],
]

export const layoutSafelist: string[] = layoutRules.map(r => r[0] as string)
export const layoutMetadata: RuleMetadata[] = metadataFromRules(layoutRules as Array<[string, Record<string, string>]>)
