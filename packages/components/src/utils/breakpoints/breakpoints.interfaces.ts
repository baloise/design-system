export type BalBreakpoints = {
  mobile: boolean
  tablet: boolean
  touch: boolean
  desktop: boolean
  highDefinition: boolean
  widescreen: boolean
  fullhd: boolean
}

export interface BalBreakpointObserver {
  breakpointListener(breakpoints: BalBreakpoints): void
}
