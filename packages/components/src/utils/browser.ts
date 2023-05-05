export const isWindowDefined = () => typeof window !== 'undefined'
export const isNavigatorDefined = () => typeof navigator !== 'undefined'
export const isDocumentDefined = () => typeof document !== 'undefined'

export const getUserAgent = (): string => {
  if (isWindowDefined() && isNavigatorDefined()) {
    return navigator.userAgent ?? ''
  }

  return ''
}

class Browser {
  public get isSafari(): boolean {
    return /^((?!chrome|android).)*safari/i.test(getUserAgent())
  }
}

export const balBrowser = new Browser()
