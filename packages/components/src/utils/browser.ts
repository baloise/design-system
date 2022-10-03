type Browser = 'Safari' | 'others'

const isSafari = /^((?!chrome|android).)*safari/i.test(getUserAgent())

export const isBrowser = (browser: Browser): boolean => {
  if (browser === 'Safari') {
    return isSafari
  }
  return false
}

function getUserAgent(): string {
  if (typeof (window as any) !== 'undefined' && window?.navigator && navigator?.userAgent) {
    return navigator.userAgent
  }

  return ''
}
