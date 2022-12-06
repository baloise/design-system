import Hammer from 'hammerjs'

type SwipeObserver = () => void

export const SwipeHandler = () => {
  let manager: HammerManager | undefined
  let target: HTMLElement | undefined
  let observersSwipeLeft: SwipeObserver[] = []
  let observersSwipeRight: SwipeObserver[] = []

  return {
    connect: (el: HTMLElement) => {
      observersSwipeLeft = []
      observersSwipeRight = []
      target = el
      manager = new Hammer(target)
      manager.on('swipeleft', () => observersSwipeLeft.forEach(observer => observer()))
      manager.on('swiperight', () => observersSwipeRight.forEach(observer => observer()))
    },
    disconnect: () => {
      observersSwipeLeft = []
      observersSwipeRight = []
      manager?.destroy()
    },
    onSwipeLeft: (callback: () => void) => observersSwipeLeft.push(callback),
    onSwipeRight: (callback: () => void) => observersSwipeRight.push(callback),
  }
}
