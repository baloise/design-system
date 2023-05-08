export const isWindowDefined = () => typeof window !== 'undefined'
export const isNavigatorDefined = () => typeof navigator !== 'undefined'
export const isDocumentDefined = () => typeof document !== 'undefined'

export const getUserAgent = (): string => {
  if (isWindowDefined() && isNavigatorDefined()) {
    return navigator.userAgent ?? ''
  }

  return ''
}

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
