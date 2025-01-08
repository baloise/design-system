// eslint-disable-next-line @typescript-eslint/ban-types
export type BalResizeInfo = {
  width: boolean
  height: boolean
}

export type BalResizeListenerFn = (info: BalResizeInfo) => void

export interface BalResizeObserver {
  el: HTMLElement
  resizeListener(info: BalResizeInfo): void
}
