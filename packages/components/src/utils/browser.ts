class BrowserWindow {
  /**
   * Returns the width of the window
   */
  public get width(): number {
    if (balBrowser.hasWindow) {
      return window.innerWidth
    }
    return 0
  }

  /**
   * Returns the height of the window
   */
  public get height(): number {
    if (balBrowser.hasWindow) {
      return window.innerHeight
    }
    return 0
  }
}

class Browser {
  public window = new BrowserWindow()
  /**
   * Is true when it is a Safari browser
   */
  public get isSafari(): boolean {
    return /^((?!chrome|android).)*safari/i.test(this.userAgent)
  }

  /**
   * Is true when the window object is defined
   */
  public get hasWindow(): boolean {
    return typeof window !== 'undefined'
  }

  /**
   * Is true when the navigator object is defined
   */
  public get hasNavigator(): boolean {
    return typeof navigator !== 'undefined'
  }

  /**
   * Is true when the document object is defined
   */
  public get hasDocument(): boolean {
    return typeof document !== 'undefined'
  }

  /**
   * Returns a string with the user agents
   */
  public get userAgent(): string {
    if (this.hasWindow && this.hasNavigator) {
      return navigator.userAgent ?? ''
    }

    return ''
  }
}

export const balBrowser = new Browser()
