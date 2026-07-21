import { HTMLStencilElement } from '@stencil/core/internal'

export interface BalVisibilityObserver {
  el: HTMLElement | HTMLStencilElement
  visibilityListener(): void
}
