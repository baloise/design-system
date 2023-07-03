import { balBrowser } from './browser'

export class Orientation {
  /**
   * Is true when the orientation is in portrait mode
   */
  public get isPortrait(): boolean {
    if (balBrowser.hasWindow && window.matchMedia) {
      return window.matchMedia('(orientation: portrait)').matches
    }
    return false
  }

  /**
   * Is true when the orientation is in landscape mode
   */
  public get isLandscape(): boolean {
    if (balBrowser.hasWindow && window.matchMedia) {
      return window.matchMedia('(orientation: landscape)').matches
    }
    return true
  }

  public toObject() {
    return {
      landscape: this.isLandscape,
      portrait: this.isPortrait,
    }
  }
}

class Device {
  public orientation = new Orientation()

  /**
   * Is true if it is a native mobile device like a iPhone
   */
  public get isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(balBrowser.userAgent)
  }

  /**
   * Is true if the device supports touchscreen
   */
  public get hasTouchScreen(): boolean {
    if (balBrowser.hasWindow && balBrowser.hasNavigator) {
      return !!('ontouchstart' in window || (navigator as any).msMaxTouchPoints)
    }
    return false
  }
}

export const balDevice = new Device()
