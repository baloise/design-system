import {
  balBreakpointDesktop,
  balBreakpointFullhd,
  balBreakpointHighDefinition,
  balBreakpointTablet,
  balBreakpointWidescreen,
} from '@baloise/ds-tokens'

const toNumber = (pixel: string): number => parseInt(pixel.slice(0, -2), 10)

const breakpointTablet = toNumber(balBreakpointTablet)
const breakpointDesktop = toNumber(balBreakpointDesktop)
const breakpointHighDefinition = toNumber(balBreakpointHighDefinition)
const breakpointWidescreen = toNumber(balBreakpointWidescreen)
const breakpointFullhd = toNumber(balBreakpointFullhd)

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
  return width >= breakpointWidescreen && width < breakpointFullhd
}

const isFullHD = (win: Window) => {
  const width = win.innerWidth
  return width >= breakpointFullhd
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
