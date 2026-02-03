import {
  BalBreakpointDesktop,
  BalBreakpointFullhd,
  BalBreakpointHighDefinition,
  BalBreakpointTablet,
  BalBreakpointWidescreen,
} from '@baloise/ds-tokens'

const breakpointTablet = BalBreakpointTablet
const breakpointDesktop = BalBreakpointDesktop
const breakpointHighDefinition = BalBreakpointHighDefinition
const breakpointWidescreen = BalBreakpointWidescreen
const breakpointFullhd = BalBreakpointFullhd

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
