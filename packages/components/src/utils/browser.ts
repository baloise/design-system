type Browser = 'Safari' | 'touch' | 'others'

const isSafari = /^((?!chrome|android).)*safari/i.test(getUserAgent())

const isTouch = !!('ontouchstart' in window || (navigator as any).msMaxTouchPoints)

export const isBrowser = (browser: Browser): boolean => {
  if (browser === 'Safari') {
    return isSafari
  }
  if (browser === 'touch') {
    return isTouch
  }
  return false
}

function getUserAgent(): string {
  if (typeof (window as any) !== 'undefined') {
    return navigator.userAgent ?? ''
  }

  return ''
}
