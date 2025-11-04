import { HTMLStencilElement } from '@stencil/core/internal'

export type BalWindowResizeListenerFn = () => void

export interface BalWindowResizeObserver {
  el: HTMLElement | HTMLStencilElement
  windowResizeListener(): void
}
