import { isWindowDefined } from './browser'
import { balDevice } from './device'

const windowWidth = () => {
  if (isWindowDefined()) {
    return window.innerWidth
  }
  return 0
}

const windowHeight = () => {
  if (isWindowDefined()) {
    return window.innerHeight
  }
  return 0
}

const isLandscape = () => windowWidth() > windowHeight()

export const ResizeHandler = (onlyWidth = false) => {
  let previousWidth = windowWidth()
  let previousHeight = windowHeight()
  let previousIsLandscape = isLandscape()

  return (callback: () => void) => {
    const resetPreviousValues = () => {
      previousWidth = windowWidth()
      previousHeight = windowHeight()
      previousIsLandscape = isLandscape()
    }

    if (balDevice.hasTouchScreen) {
      if (previousWidth !== windowWidth() || previousIsLandscape !== isLandscape()) {
        callback()
        resetPreviousValues()
      }
    } else {
      if (onlyWidth) {
        if (previousWidth !== windowWidth()) {
          callback()
          resetPreviousValues()
        }
      } else {
        if (previousWidth !== windowWidth() || previousHeight !== windowHeight()) {
          callback()
          resetPreviousValues()
        }
      }
    }
  }
}

export const ResizeObserverHandler = () => {
  let resizeO: ResizeObserver | undefined

  return {
    connect: (el: HTMLElement, callback: () => void) => {
      if (typeof ResizeObserver === 'undefined') {
        return
      }

      if (resizeO !== undefined) {
        resizeO?.disconnect()
        resizeO = undefined
      }

      resizeO = new ResizeObserver(() => callback())
      resizeO.observe(el)
    },
    disconnect: () => {
      resizeO?.disconnect()
      resizeO = undefined
    },
  }
}
