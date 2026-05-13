import { HTMLStencilElement } from '@stencil/core/internal'

export type ResizeInfo = {
  width: boolean
  height: boolean
}

export type ResizeListenerFn = (info: ResizeInfo) => void

export interface ResizeObserver {
  el: HTMLElement | HTMLStencilElement
  listenToResize(info: ResizeInfo): void
}
