import { PointerListener } from 'contactjs'

type SwipeObserver = () => void

export const SwipeHandler = () => {
  let target: HTMLElement | undefined
  let observersSwipeLeft: SwipeObserver[] = []
  let observersSwipeRight: SwipeObserver[] = []
  let pointerListener: PointerListener | undefined
  return {
    connect: (el: HTMLElement) => {
      observersSwipeLeft = []
      observersSwipeRight = []
      target = el
      pointerListener = new PointerListener(target, {})
      pointerListener.on('swipeleft', () => observersSwipeLeft.forEach(observer => observer()))
      pointerListener.on('swiperight', () => observersSwipeRight.forEach(observer => observer()))
    },
    disconnect: () => {
      observersSwipeLeft = []
      observersSwipeRight = []
      pointerListener?.destroy()
    },
    onSwipeLeft: (callback: () => void) => observersSwipeLeft.push(callback),
    onSwipeRight: (callback: () => void) => observersSwipeRight.push(callback),
  }
}
