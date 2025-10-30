import { HTMLStencilElement } from '@stencil/core/internal'

// eslint-disable-next-line @typescript-eslint/ban-types
export type BalResizeInfo = {
  width: boolean
  height: boolean
}

export type BalResizeListenerFn = (info: BalResizeInfo) => void

export interface BalResizeObserver {
  el: HTMLElement | HTMLStencilElement
  resizeListener(info: BalResizeInfo): void
}
