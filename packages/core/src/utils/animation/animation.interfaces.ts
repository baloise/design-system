export interface BalAnimationObserver {
  el: HTMLElement
  animationListener(data: BalAnimationObserverInfo): void
}

export interface BalAnimationObserverInfo {
  target: HTMLElement
}
