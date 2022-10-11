import { hasTouchSupport } from './browser'

const windowWidth = () => window.innerWidth

const windowHeight = () => window.innerHeight

const isLandscape = () => windowWidth() > windowHeight()

export const ResizeHandler = () => {
  let previousWidth = windowWidth()
  let previousHeight = windowHeight()
  let previousIsLandscape = isLandscape()

  return (callback: () => void) => {
    const resetPreviousValues = () => {
      previousWidth = windowWidth()
      previousHeight = windowHeight()
      previousIsLandscape = isLandscape()
    }

    if (hasTouchSupport) {
      if (previousWidth !== windowWidth() || previousIsLandscape !== isLandscape()) {
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
