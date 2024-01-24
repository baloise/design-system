export interface MutationObserverOptions extends MutationObserverInit {
  tags: string[]
  closest?: string
  waitAfterFramePrint?: boolean
}

export interface BalMutationObserver {
  el: HTMLElement
  mutationObserverActive: boolean
  mutationListener(): void
}
