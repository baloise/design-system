// eslint-disable-next-line @typescript-eslint/ban-types
export type BalResizeInfo = {}

export type BalResizeListenerFn = (info: BalResizeInfo) => void

export interface BalResizeObserver {
  el: HTMLElement
  resizeListener(info: BalResizeInfo): void
}
