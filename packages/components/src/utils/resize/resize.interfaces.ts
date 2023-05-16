export type BalResizeInfo = {
  left: boolean
  right: boolean
}

export type BalResizeListenerFn = (info: BalResizeInfo) => void

export interface BalResizeObserver {
  el: HTMLElement
  resizeListener: BalResizeListenerFn
}
