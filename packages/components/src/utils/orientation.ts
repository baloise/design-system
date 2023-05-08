import { ResizeListener } from './resize'
import { balDevice } from './device'

export type OrientationHandlerCallback = (orientation: Orientation) => void

export type Orientation = {
  landscape: boolean
  portrait: boolean
}

const emptyCallback = (_orientation: Orientation) => {
  // empty callback
}

export const initialOrientation: Orientation = {
  landscape: false,
  portrait: false,
}

export type OrientationHandlerType = {
  connect: (callback: OrientationHandlerCallback) => void
  disconnect: () => void
}

export const OrientationHandler = (): OrientationHandlerType => {
  const resizeListener = ResizeListener()
  let callbackHandler: OrientationHandlerCallback = emptyCallback
  let orientation = { ...initialOrientation }

  function update() {
    orientation = {
      ...orientation,
      portrait: balDevice.orientation.isPortrait,
      landscape: balDevice.orientation.isLandscape,
    }
    callbackHandler(orientation)
  }

  return {
    connect: (callback: OrientationHandlerCallback) => {
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
