export interface MutationObserverOptions extends MutationObserverInit {
  tags: string[]
}

export interface BalMutationObserver {
  el: HTMLElement
  mutationObserverActive: boolean
  mutationListener(): void
}
