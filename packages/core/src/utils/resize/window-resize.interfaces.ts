// eslint-disable-next-line @typescript-eslint/ban-types

export type BalWindowResizeListenerFn = () => void

export interface BalWindowResizeObserver {
  el: HTMLElement
  windowResizeListener(): void
}
