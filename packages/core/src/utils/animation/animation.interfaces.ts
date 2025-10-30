import { HTMLStencilElement } from '@stencil/core/internal'

export interface BalAnimationObserver {
  el: HTMLElement | HTMLStencilElement
  animationListener(data: BalAnimationObserverInfo): void
}

export interface BalAnimationObserverInfo {
  target: HTMLElement | HTMLStencilElement
}
