type Browser = 'Safari' | 'touch' | 'others'

const isSafari = /^((?!chrome|android).)*safari/i.test(getUserAgent())

export const hasTouchSupport = () => !!('ontouchstart' in window || (navigator as any).msMaxTouchPoints)

export const isBrowser = (browser: Browser): boolean => {
  if (browser === 'Safari') {
    return isSafari
  }
  return false
}

function getUserAgent(): string {
  if (typeof (window as any) !== 'undefined') {
    return navigator.userAgent ?? ''
  }

  return ''
}
