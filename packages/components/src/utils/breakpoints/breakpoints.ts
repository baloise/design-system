import { isWindowDefined } from '../browser'
import { BREAKPOINTS_MAP } from './breakpoints.map'

export type Breakpoint = keyof typeof BREAKPOINTS_MAP

class BreakpointsClass {
  private win?: any
  private breakpoints: Breakpoint[] = []

  constructor() {
    if (isWindowDefined()) {
      this.win = window
      this.win.BaloiseDesignSystem = this.win.BaloiseDesignSystem || {}
      this.detect()
    }
  }

  public get isMobile(): boolean {
    return this.includes('mobile')
  }

  public get isTablet(): boolean {
    return this.includes('tablet')
  }

  public get isTouch(): boolean {
    return this.includes('touch')
  }

  public get isDesktop(): boolean {
    return this.includes('desktop')
  }

  public get isHighDefinition(): boolean {
    return this.includes('highDefinition')
  }

  public get isWidescreen(): boolean {
    return this.includes('widescreen')
  }

  public get isFullHD(): boolean {
    return this.includes('fullhd')
  }

  public includes(breakpoint: Breakpoint): boolean {
    this.detect()
    return !!this.breakpoints?.includes(breakpoint)
  }

  public detect(): Breakpoint[] {
    if (this.win) {
      this.breakpoints = (Object.keys(BREAKPOINTS_MAP) as Breakpoint[]).filter(p => BREAKPOINTS_MAP[p](this.win))
      this.win.BaloiseDesignSystem.breakpoints = this.breakpoints
      this.win.BaloiseDesignSystem.platforms = this.breakpoints
    }
    return this.breakpoints
  }
}

export const balBreakpoints = new BreakpointsClass()
