import { HTMLStencilElement } from '@stencil/core/internal'

export type BalSwipeInfo = {
  left: boolean
  right: boolean
}

export type BalSwipeListenerFn = (info: BalSwipeInfo) => void

export interface BalSwipeObserver {
  el: HTMLElement | HTMLStencilElement
  swipeListener(info: BalSwipeInfo): void
}
