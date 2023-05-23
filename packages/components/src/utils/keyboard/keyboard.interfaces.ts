export type BalKeyboardInfo = {
  keyboardFocus: boolean
}

export type BalKeyboardListenerFn = (info: BalKeyboardInfo) => void

export interface BalKeyboardObserver {
  el: HTMLElement
  keyboardListener(info: BalKeyboardInfo): void
}
