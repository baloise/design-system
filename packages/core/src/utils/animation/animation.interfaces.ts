import { HTMLStencilElement } from '@stencil/core/internal'

export interface AnimationObserver {
  el: HTMLElement | HTMLStencilElement
  animationListener(data: AnimationObserverInfo): void
}

export interface AnimationObserverInfo {
  target: HTMLElement | HTMLStencilElement
}
