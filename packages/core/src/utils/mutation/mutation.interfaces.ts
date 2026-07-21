import { HTMLStencilElement } from '@stencil/core/internal'

export interface MutationObserverOptions extends MutationObserverInit {
  tags: string[]
  closest?: string
  waitAfterFramePrint?: boolean
}

export interface BalMutationObserver {
  el: HTMLStencilElement
  mutationObserverActive: boolean
  mutationListener(): void
}
