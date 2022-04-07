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
  prevent: boolean
  navigate: EventEmitter<MouseEvent>
}

export interface TabProps {
  value: string | undefined
  expanded: boolean
  border: boolean
  clickable: boolean
  action: boolean
  actionLabel: string
  tabs: BalTabOption[]
  onSelectTab: (event: MouseEvent, tab: BalTabOption) => void
  onActionClick: (event: MouseEvent) => void
  lineWidth?: number
  lineOffsetLeft?: number
}

export interface TabItemProps {
  href: string | undefined
  label: string | undefined
  onSelectTab: (event: MouseEvent) => void
}
