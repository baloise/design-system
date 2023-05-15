export type BalElementStateInfo = {
  hovered: boolean
  pressed: boolean
}

export type BalElementStateListenerFn = (info: BalElementStateInfo) => void

export interface BalElementStateObserver {
  el: HTMLElement
  elementStateListener: BalElementStateListenerFn
}
