import { HTMLStencilElement } from '@stencil/core/internal'

export type DsSwipeInfo = {
  left: boolean
  right: boolean
}

export type DsSwipeListenerFn = (info: DsSwipeInfo) => void

export interface DsSwipeObserver {
  el: HTMLElement | HTMLStencilElement
  listenToSwipe(info: DsSwipeInfo): void
}
