// eslint-disable-next-line @typescript-eslint/ban-types

import { HTMLStencilElement } from '@stencil/core/internal'

export type WindowResizeListenerFn = () => void

export interface WindowResizeObserver {
  el: HTMLElement | HTMLStencilElement
  listenToWindowResize(): void
}
