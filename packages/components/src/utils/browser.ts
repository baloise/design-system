type Browser = 'Safari' | 'others'

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const isBrowser = (browser: Browser): boolean => {
  if (browser === 'Safari') {
    return isSafari
  }
  return false
}
