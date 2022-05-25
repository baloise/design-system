import { Props } from '../../'
import { EventEmitter } from '@stencil/core'

export interface BalTabOption {
  value: string
  label: string
  icon?: string
  href: string
  active: boolean
  disabled: boolean
  done: boolean
  failed: boolean
  passed: boolean
  bubble: boolean | string
  prevent: boolean
  context?: Props.BalTabsInterface
  navigate: EventEmitter<MouseEvent | CustomEvent>
}

export interface TabLineProps {
  inverted: boolean
  isReady: boolean
  vertical: boolean
  verticalOnMobile: boolean
  lineWidth?: number
  lineOffsetLeft?: number
  lineHeight?: number
  lineOffsetTop?: number
}

export interface TabProps {
  value: string | undefined
  expanded: boolean
  border: boolean
  clickable: boolean
  isReady: boolean
  inverted: boolean
  iconPosition: Props.BalTabsIconPosition
  tabs: BalTabOption[]
  context: Props.BalTabsInterface
  onSelectTab: (event: MouseEvent | CustomEvent, tab: BalTabOption) => void
  lineWidth?: number
  lineOffsetLeft?: number
  lineHeight?: number
  lineOffsetTop?: number
  vertical: boolean
  verticalOnMobile: boolean
  selectOnMobile: boolean
}

export interface TabItemProps {
  icon: string | undefined
  active: boolean
  inverted: boolean
  vertical: boolean
  verticalOnMobile: boolean
  expanded: boolean
  disabled: boolean
  bubble: boolean | string
  href: string | undefined
  label: string | undefined
  context: Props.BalTabsInterface
  iconPosition: Props.BalTabsIconPosition
  onSelectTab: (event: MouseEvent | CustomEvent) => void
}
