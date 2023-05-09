import { balBrowser } from './browser'
import { balDevice } from './device'

const isLandscape = () => balBrowser.window.width > balBrowser.window.height

export const ResizeHandler = (onlyWidth = false) => {
  let previousWidth = balBrowser.window.width
  let previousHeight = balBrowser.window.height
  let previousIsLandscape = isLandscape()

  return (callback: () => void) => {
    const resetPreviousValues = () => {
      previousWidth = balBrowser.window.width
      previousHeight = balBrowser.window.height
      previousIsLandscape = isLandscape()
    }

    if (balDevice.hasTouchScreen) {
      if (previousWidth !== balBrowser.window.width || previousIsLandscape !== isLandscape()) {
        callback()
        resetPreviousValues()
      }
    } else {
      if (onlyWidth) {
        if (previousWidth !== balBrowser.window.width) {
          callback()
          resetPreviousValues()
        }
      } else {
        if (previousWidth !== balBrowser.window.width || previousHeight !== balBrowser.window.height) {
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

export type ResizeListenerCallback = () => void

const emptyCallback = () => {
  // empty callback
}

export type ResizeListenerType = {
  connect: (callback: ResizeListenerCallback) => void
  disconnect: () => void
}

export const ResizeListener = (): ResizeListenerType => {
  let callbackHandler: ResizeListenerCallback = emptyCallback
  const resizeHandler = ResizeHandler(true)

  function onResize() {
    resizeHandler(() => callbackHandler())
  }

  return {
    connect: (callback: ResizeListenerCallback) => {
      if (balBrowser.hasWindow) {
        window.addEventListener('resize', onResize, { passive: true })
      }
      callbackHandler = callback
      callbackHandler()
    },
    disconnect: () => {
      if (balBrowser.hasWindow) {
        window.removeEventListener('resize', onResize)
      }
      callbackHandler = emptyCallback
    },
  }
}
