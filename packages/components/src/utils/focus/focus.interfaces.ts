export interface BalFocusObserver {
  el: HTMLElement
  hasFocus: boolean
  focusInListener(ev: FocusEvent): void
  focusOutListener(ev: FocusEvent): void
}

export type BalFocusInfo = {
  isFocusIn: boolean
  isFocusOut: boolean
  ev: FocusEvent
}

export type BalFocusListenerFn = (info: BalFocusInfo) => void
