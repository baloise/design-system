import { EventEmitter } from '@stencil/core'
import { Attributes } from '../../utils/attributes'

export interface BalTabOption {
  value: string
  label: string
  icon?: string
  href: string
  target: BalProps.BalButtonTarget
  active: boolean
  disabled: boolean
  done: boolean
  hidden: boolean
  failed: boolean
  bubble: boolean | string
  prevent: boolean
  passed?: boolean
  index?: number
  context?: BalProps.BalTabsInterface
  navigate: EventEmitter<MouseEvent>
  trackingData?: Attributes
}

export interface TabLineProps {
  context?: BalProps.BalTabsInterface
  inverted: boolean
  isReady: boolean
  vertical: boolean | 'mobile' | 'tablet'
  lineWidth?: number
  lineOffsetLeft?: number
  lineHeight?: number
  lineOffsetTop?: number
}

export interface TabProps {
  value: string | undefined
  expanded: boolean
  border: boolean
  float: BalProps.BalTabsFloat
  spaceless: boolean
  clickable: boolean
  isReady: boolean
  inverted: boolean
  iconPosition: BalProps.BalTabsIconPosition
  tabs: BalTabOption[]
  context: BalProps.BalTabsInterface
  onSelectTab: (event: MouseEvent, tab: BalTabOption) => void
  lineWidth?: number
  lineOffsetLeft?: number
  lineHeight?: number
  lineOffsetTop?: number
  vertical: boolean | 'mobile' | 'tablet'
  selectOnMobile: boolean
}

export interface TabItemProps {
  icon: string | undefined
  active: boolean
  inverted: boolean
  vertical: boolean | 'mobile' | 'tablet'
  expanded: boolean
  disabled: boolean
  bubble: boolean | string
  href: string | undefined
  target: BalProps.BalButtonTarget
  label: string | undefined
  context: BalProps.BalTabsInterface
  iconPosition: BalProps.BalTabsIconPosition
  trackingData?: Attributes
  onSelectTab: (event: MouseEvent) => void
}
