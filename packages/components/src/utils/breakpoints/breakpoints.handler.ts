import { ResizeListener } from '../resize'
import { balBreakpoints } from './breakpoints'

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

export type BreakpointsHandlerType = {
  connect: (callback: BreakpointsHandlerCallback) => void
  disconnect: () => void
}

export const BreakpointsHandler = (): BreakpointsHandlerType => {
  const resizeListener = ResizeListener()
  let callbackHandler: BreakpointsHandlerCallback = emptyCallback
  let breakpoints = { ...initialBreakpoints }

  function update() {
    const detectedBreakpoints = balBreakpoints.detect()
    breakpoints = {
      ...breakpoints,
      mobile: detectedBreakpoints.includes('mobile'),
      tablet: detectedBreakpoints.includes('tablet'),
      touch: detectedBreakpoints.includes('touch'),
      desktop: detectedBreakpoints.includes('desktop'),
      highDefinition: detectedBreakpoints.includes('highDefinition'),
      widescreen: detectedBreakpoints.includes('widescreen'),
      fullhd: detectedBreakpoints.includes('fullhd'),
    }
    callbackHandler(breakpoints)
  }

  return {
    connect: (callback: BreakpointsHandlerCallback) => {
      callbackHandler = callback
      update()

      resizeListener.connect(() => update())
    },
    disconnect: () => {
      resizeListener.disconnect()
      callbackHandler = emptyCallback
    },
  }
}
