import {
  DsBreakpointTablet,
  DsBreakpointDesktop,
  DsBreakpointDesktopLg,
  DsBreakpointDesktopXl,
  DsBreakpointDesktop2Xl,
} from '@baloise/ds-tokens'

const breakpointTablet = DsBreakpointTablet
const breakpointDesktop = DsBreakpointDesktop
const breakpointDesktopLg = DsBreakpointDesktopLg
const breakpointDesktopXl = DsBreakpointDesktopXl
const breakpointDesktop2Xl = DsBreakpointDesktop2Xl

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

const isDesktopLg = (win: Window) => {
  const width = win.innerWidth
  return width >= breakpointDesktopLg && width < breakpointDesktopXl
}

const isDesktopXl = (win: Window) => {
  const width = win.innerWidth
  return width >= breakpointDesktopXl && width < breakpointDesktop2Xl
}

const isDesktop2Xl = (win: Window) => {
  const width = win.innerWidth
  return width >= breakpointDesktop2Xl
}

export const BREAKPOINTS_MAP = {
  mobile: isMobile,
  tablet: isTablet,
  touch: isTouch,
  desktop: isDesktop,
  desktopLg: isDesktopLg,
  desktopXl: isDesktopXl,
  desktop2Xl: isDesktop2Xl,
}
