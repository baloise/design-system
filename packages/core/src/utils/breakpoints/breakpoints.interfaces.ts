export type BalBreakpoints = {
  mobile: boolean
  tablet: boolean
  touch: boolean
  desktop: boolean
  desktopLg: boolean
  desktopXl: boolean
  desktop2Xl: boolean
}

export interface BalBreakpointObserver {
  breakpointListener(breakpoints: BalBreakpoints): void
}
