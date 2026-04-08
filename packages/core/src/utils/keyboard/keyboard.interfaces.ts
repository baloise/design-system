export type KeyboardInfo = {
  keyboardFocus: boolean
}

export type KeyboardListenerFn = (info: KeyboardInfo) => void

export interface KeyboardObserver {
  el: HTMLElement
  keyboardListener(info: KeyboardInfo): void
}
