import { isWindowDefined, isNavigatorDefined, getUserAgent } from './browser'

export const hasTouchSupport = () => {
  if (isWindowDefined() && isNavigatorDefined()) {
    return !!('ontouchstart' in window || (navigator as any).msMaxTouchPoints)
  }
  return false
}

type Browser = 'Safari' | 'others'

const isSafari = /^((?!chrome|android).)*safari/i.test(getUserAgent())

export const isBrowser = (browser: Browser): boolean => {
  if (browser === 'Safari') {
    return isSafari
  }
  return false
}
