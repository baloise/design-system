import { HTMLStencilElement } from '@stencil/core/internal'

export type WindowResizeListenerFn = () => void

export interface WindowResizeObserver {
  el: HTMLElement | HTMLStencilElement
  listenToWindowResize(): void
}
