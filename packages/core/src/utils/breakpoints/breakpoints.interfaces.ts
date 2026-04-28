export type DsBreakpoints = {
  mobile: boolean
  tablet: boolean
  touch: boolean
  desktop: boolean
  desktopLg: boolean
  desktopXl: boolean
  desktop2Xl: boolean
}

export interface DsBreakpointObserver {
  listenToBreakpoint(breakpoints: DsBreakpoints): void
}
