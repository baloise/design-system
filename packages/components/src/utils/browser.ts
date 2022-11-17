export const isWindowDefined = () => typeof window !== 'undefined'
export const isNavigatorDefined = () => typeof navigator !== 'undefined'
export const isDocumentDefined = () => typeof document !== 'undefined'

type Browser = 'Safari' | 'touch' | 'others'

const isSafari = /^((?!chrome|android).)*safari/i.test(getUserAgent())

export const hasTouchSupport = () => {
  if (isWindowDefined() && isNavigatorDefined()) {
    return !!('ontouchstart' in window || (navigator as any).msMaxTouchPoints)
  }
  return false
}

export const isBrowser = (browser: Browser): boolean => {
  if (browser === 'Safari') {
    return isSafari
  }
  return false
}

function getUserAgent(): string {
  if (isWindowDefined() && isNavigatorDefined()) {
    return navigator.userAgent ?? ''
  }

  return ''
}
