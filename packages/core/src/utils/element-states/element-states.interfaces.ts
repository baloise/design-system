import { HTMLStencilElement } from '@stencil/core/internal'

export type BalElementStateInfo = {
  hovered: boolean
  pressed: boolean
}

export type BalElementStateListenerFn = (info: BalElementStateInfo) => void

export interface BalElementStateObserver {
  el: HTMLElement | HTMLStencilElement
  elementStateListener(info: BalElementStateInfo): void
}
