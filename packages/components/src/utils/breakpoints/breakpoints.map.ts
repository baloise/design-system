import * as BaloiseDesignToken from '@baloise/design-system-tokens'

const toNumber = (pixel: string): number => parseInt(pixel.slice(0, -2), 10)

const breakpointTablet = toNumber(BaloiseDesignToken.balBreakpointTablet)
const breakpointDesktop = toNumber(BaloiseDesignToken.balBreakpointDesktop)
const breakpointHighDefinition = toNumber(BaloiseDesignToken.balBreakpointHighDefinition)
const breakpointWidescreen = toNumber(BaloiseDesignToken.balBreakpointWidescreen)
const balBreakpointFullhd = toNumber(BaloiseDesignToken.balBreakpointFullhd)

const isMobile = (win: Window) => {
  const width = win.innerWidth
  return width < breakpointTablet
}

const isTablet = (win: Window) => {
  const width = win.innerWidth
  return width >= breakpointTablet && width < breakpointDesktop
}

const isTouch = (win: Window) => isMobile(win) || isTablet(win)

const isDesktop = (win: Window) => !isTouch(win)

const isHighDefinition = (win: Window) => {
  const width = win.innerWidth
  return width >= breakpointHighDefinition && width < breakpointWidescreen
}

const isWideScreen = (win: Window) => {
  const width = win.innerWidth
  return width >= breakpointWidescreen && width < balBreakpointFullhd
}

const isFullHD = (win: Window) => {
  const width = win.innerWidth
  return width >= balBreakpointFullhd
}

export const BREAKPOINTS_MAP = {
  mobile: isMobile,
  tablet: isTablet,
  touch: isTouch,
  desktop: isDesktop,
  highDefinition: isHighDefinition,
  widescreen: isWideScreen,
  fullhd: isFullHD,
}
