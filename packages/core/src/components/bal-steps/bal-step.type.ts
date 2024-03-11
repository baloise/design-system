import { EventEmitter } from '@stencil/core'
import { Attributes } from '../../utils/attributes'

export interface BalStepOption {
  value: string
  label: string
  href: string
  target: BalProps.BalButtonTarget
  active: boolean
  disabled: boolean
  done: boolean
  invisible: boolean
  failed: boolean
  prevent: boolean
  passed?: boolean
  index?: number
  navigate?: EventEmitter<MouseEvent>
  trackingData?: Attributes
  hidden?: boolean // deprecated use invisible instead
}
