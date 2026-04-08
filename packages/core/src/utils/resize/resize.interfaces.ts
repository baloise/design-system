import { HTMLStencilElement } from '@stencil/core/internal'

// eslint-disable-next-line @typescript-eslint/ban-types
export type ResizeInfo = {
  width: boolean
  height: boolean
}

export type ResizeListenerFn = (info: ResizeInfo) => void

export interface ResizeObserver {
  el: HTMLElement | HTMLStencilElement
  resizeListener(info: ResizeInfo): void
}
