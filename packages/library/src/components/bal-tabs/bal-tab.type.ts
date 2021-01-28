import { EventEmitter } from '@stencil/core'

export interface BalTabOption {
  value: string
  label: string
  href: string
  active: boolean
  disabled: boolean
  done: boolean
  failed: boolean
  hasBubble: boolean
  navigate: EventEmitter<BalTabOption>
}
