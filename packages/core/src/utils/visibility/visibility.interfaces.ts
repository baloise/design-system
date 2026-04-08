import { HTMLStencilElement } from '@stencil/core/internal'

export interface VisibilityObserver {
  el: HTMLElement | HTMLStencilElement
  visibilityListener(): void
}
