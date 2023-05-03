import { isWindowDefined } from './browser'
import { ResizeHandler } from './resize'
import { getPlatforms } from './platform'

export type BreakpointsHandlerCallback = (breakpoints: Breakpoints) => void

export type Breakpoints = {
  mobile: boolean
  tablet: boolean
  touch: boolean
  desktop: boolean
  highDefinition: boolean
  widescreen: boolean
  fullhd: boolean
}

const emptyCallback = (_breakpoints: Breakpoints) => {
  // empty callback
}

export const initialBreakpoints: Breakpoints = {
  mobile: false,
  tablet: false,
  touch: false,
  desktop: false,
  highDefinition: false,
  widescreen: false,
  fullhd: false,
}

export type BreakpointsHandlerType = () => {
  connect: (callback: BreakpointsHandlerCallback) => void
  disconnect: () => void
}

export const BreakpointsHandler: BreakpointsHandlerType = () => {
  let callbackHandler: BreakpointsHandlerCallback = emptyCallback
  const resizeHandler = ResizeHandler(true)
  let breakpoints = { ...initialBreakpoints }

  function onResize() {
    resizeHandler(() => {
      const platforms = getPlatforms()
      breakpoints = {
        ...breakpoints,
        mobile: platforms.includes('mobile'),
        tablet: platforms.includes('tablet'),
        touch: platforms.includes('touch'),
        desktop: platforms.includes('desktop'),
        highDefinition: platforms.includes('highDefinition'),
        widescreen: platforms.includes('widescreen'),
        fullhd: platforms.includes('fullhd'),
      }
      callbackHandler(breakpoints)
    })
  }

  return {
    connect: (callback: BreakpointsHandlerCallback) => {
      if (isWindowDefined()) {
        window.addEventListener('resize', onResize, { passive: true })
      }
      callbackHandler = callback
    },
    disconnect: () => {
      if (isWindowDefined()) {
        window.removeEventListener('resize', onResize)
      }
      breakpoints = { ...initialBreakpoints }
      callbackHandler = emptyCallback
    },
  }
}
