import { HTMLStencilElement } from '@stencil/core/internal'

export interface FocusObserver {
  el: HTMLElement | HTMLStencilElement
  hasFocus: boolean
  focusInListener(ev: FocusEvent): void
  focusOutListener(ev: FocusEvent): void
}

export type FocusInfo = {
  isFocusIn: boolean
  isFocusOut: boolean
  ev: FocusEvent
}

export type FocusListenerFn = (info: FocusInfo) => void
