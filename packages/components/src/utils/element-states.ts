import { balBrowser } from '../utils-new/browser'

export type ElementStateObserver = (state: ElementStateState) => void

export type ElementStateState = {
  hovered: boolean
  pressed: boolean
}

export const defaultElementStateState = {
  hovered: false,
  pressed: false,
}

export interface ComponentElementState {
  hovered: boolean
  pressed: boolean
}

export const ElementStateHandler = () => {
  let target: HTMLElement | undefined
  let observersOnStateChange: ElementStateObserver[] = []
  let observersOnHoverStart: ElementStateObserver[] = []
  let observersOnHoverEnd: ElementStateObserver[] = []
  let observersOnPressedStart: ElementStateObserver[] = []
  let observersOnPressedEnd: ElementStateObserver[] = []
  let state: ElementStateState = defaultElementStateState

  const eventListenerOptions: AddEventListenerOptions = {
    passive: true,
  }

  function reset() {
    state = defaultElementStateState
    observersOnStateChange = []
    observersOnHoverStart = []
    observersOnHoverEnd = []
    observersOnPressedStart = []
    observersOnPressedEnd = []
  }

  function updateState(newState: Partial<ElementStateState>) {
    state = { ...state, ...newState }
    observersOnStateChange.forEach(observer => observer(state))
  }

  const onMouseEnter = () => {
    updateState({ hovered: true })
    observersOnHoverStart.forEach(observer => observer(state))
  }

  const onMouseLeave = () => {
    updateState({ hovered: false })
    observersOnHoverEnd.forEach(observer => observer(state))
  }

  const onPointerDown = () => {
    updateState({ pressed: true })
    observersOnPressedStart.forEach(observer => observer(state))
  }

  const onPointerUp = () => {
    updateState({ pressed: false })
    observersOnPressedEnd.forEach(observer => observer(state))
  }

  return {
    connect: (el: HTMLElement) => {
      target = el
      reset()
      target.addEventListener('mouseenter', onMouseEnter, eventListenerOptions)
      target.addEventListener('mouseleave', onMouseLeave, eventListenerOptions)
      target.addEventListener('pointerdown', onPointerDown, eventListenerOptions)

      if (balBrowser.hasDocument) {
        document.addEventListener('pointerup', onPointerUp, eventListenerOptions)
      }
    },
    disconnect: () => {
      if (target) {
        target.removeEventListener('mouseenter', onMouseEnter)
        target.removeEventListener('mouseleave', onMouseLeave)
        target.removeEventListener('pointerdown', onPointerDown)

        if (balBrowser.hasDocument) {
          document.removeEventListener('pointerup', onPointerUp)
        }
      }
      target = undefined
      reset()
    },
    onStateChange: (callback: (state: ElementStateState) => void) => observersOnStateChange.push(callback),
    onHoverStart: (callback: (state: ElementStateState) => void) => observersOnHoverStart.push(callback),
    onHoverEnd: (callback: (state: ElementStateState) => void) => observersOnHoverEnd.push(callback),
    onPressedStart: (callback: (state: ElementStateState) => void) => observersOnPressedStart.push(callback),
    onPressedEnd: (callback: (state: ElementStateState) => void) => observersOnPressedEnd.push(callback),
  }
}
