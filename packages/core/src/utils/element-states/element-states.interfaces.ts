import { HTMLStencilElement } from '@stencil/core/internal'

export type ElementStateInfo = {
  hovered: boolean
  pressed: boolean
}

export type ElementStateListenerFn = (info: ElementStateInfo) => void

export interface ElementStateObserver {
  el: HTMLElement | HTMLStencilElement
  listenToElementState(info: ElementStateInfo): void
}
