import { getUserAgent, isNavigatorDefined, isWindowDefined } from './browser'

class Orientation {
  public get isPortrait(): boolean {
    return window.matchMedia('(orientation: portrait)').matches
  }

  public get isLandscape(): boolean {
    return window.matchMedia('(orientation: landscape)').matches
  }
}

class Device {
  public orientation = new Orientation()

  public get isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(getUserAgent())
  }

  public get hasTouchScreen(): boolean {
    if (isWindowDefined() && isNavigatorDefined()) {
      return !!('ontouchstart' in window || (navigator as any).msMaxTouchPoints)
    }
    return false
  }
}

export const balDevice = new Device()
