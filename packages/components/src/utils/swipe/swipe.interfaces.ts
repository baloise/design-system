export type BalSwipeInfo = {
  left: boolean
  right: boolean
}

export type BalSwipeListenerFn = (info: BalSwipeInfo) => void

export interface BalSwipeObserver {
  el: HTMLElement
  swipeListener: BalSwipeListenerFn
}
