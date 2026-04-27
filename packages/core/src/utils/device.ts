import { dsBrowser } from './browser'

export class DsOrientation {
  /**
   * Is true when the orientation is in portrait mode
   */
  public get isPortrait(): boolean {
    if (dsBrowser.hasWindow && window.matchMedia) {
      return window.matchMedia('(orientation: portrait)').matches
    }
    return false
  }

  /**
   * Is true when the orientation is in landscape mode
   */
  public get isLandscape(): boolean {
    if (dsBrowser.hasWindow && window.matchMedia) {
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

export class DsDevice {
  public orientation = new DsOrientation()

  /**
   * Is true if it is a native mobile device like a iPhone
   */
  public get isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(dsBrowser.userAgent)
  }

  /**
   * Is true if the device supports touchscreen
   */
  public get hasTouchScreen(): boolean {
    if (dsBrowser.hasWindow && dsBrowser.hasNavigator) {
      return !!('ontouchstart' in window || (navigator as any).msMaxTouchPoints)
    }
    return false
  }
}

export const dsDevice = new DsDevice()
