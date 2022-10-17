import Hammer from 'hammerjs'

type SwipeObserver = () => void

export const SwipeHandler = () => {
  let manager: HammerManager | undefined
  let target: HTMLElement | undefined
  const observersSwipeLeft: SwipeObserver[] = []
  const observersSwipeRight: SwipeObserver[] = []

  return {
    addEventListener: (el: HTMLElement) => {
      target = el
      manager = new Hammer(target)
      manager.on('swipeleft', () => observersSwipeLeft.forEach(observer => observer()))
      manager.on('swiperight', () => observersSwipeRight.forEach(observer => observer()))
    },
    removeEventListener: () => manager?.destroy(),
    onSwipeLeft: (callback: () => void) => observersSwipeLeft.push(callback),
    onSwipeRight: (callback: () => void) => observersSwipeRight.push(callback),
  }
}
