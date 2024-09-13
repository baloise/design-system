import { EventEmitter } from '@stencil/core'
import { Attributes } from '../../utils/attributes'

export interface BalTabOption {
  value: string
  label: string
  href: string
  tabPanelID?: string
  target: BalProps.BalButtonTarget
  active: boolean
  disabled: boolean
  invisible: boolean
  bubble: boolean | string
  prevent: boolean
  icon?: string
  passed?: boolean
  index?: number
  context?: BalProps.BalTabsContext
  navigate?: EventEmitter<Event>
  trackingData?: Attributes
  hidden?: boolean // deprecated use invisible instead
  noPanel?: boolean
  aria?: BalProps.BalTabItemAria
}

export interface TabLineProps {
  context?: BalProps.BalTabsContext
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
  context: BalProps.BalTabsContext
  onSelectTab: (ev: Event, tab: BalTabOption) => void
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
  context: BalProps.BalTabsContext
  iconPosition: BalProps.BalTabsIconPosition
  trackingData?: Attributes
  onSelectTab: (ev: Event) => void
}
