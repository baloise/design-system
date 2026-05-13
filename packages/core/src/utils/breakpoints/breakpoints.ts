import type { DsBreakpoints } from './breakpoints.interfaces'
import { dsBrowser } from '../browser'
import { BREAKPOINTS_MAP } from './breakpoints.map'

export type DsBreakpoint = keyof typeof BREAKPOINTS_MAP

export class DsBreakpointsUtil {
  private win?: any
  private breakpoints: DsBreakpoint[] = []

  constructor() {
    if (dsBrowser.hasWindow) {
      this.win = window
      this.win.DesignSystem = this.win.DesignSystem || {}
      this.detect()
    }
  }

  /**
   * Is true when mobile breakpoint is active
   */
  public get isMobile(): boolean {
    return this.includes('mobile')
  }

  /**
   * Is true when tablet breakpoint is active
   */
  public get isTablet(): boolean {
    return this.includes('tablet')
  }

  /**
   * Is true when mobile or tablet breakpoint is active
   */
  public get isTouch(): boolean {
    return this.includes('touch')
  }

  /**
   * Is true when desktop, desktopLg, desktopXl or desktop2Xl breakpoint is active
   */
  public get isDesktop(): boolean {
    return this.includes('desktop')
  }

  /**
   * Is true when desktopLg breakpoint is active
   */
  public get isDesktopLg(): boolean {
    return this.includes('desktopLg')
  }

  /**
   * Is true when desktopXl breakpoint is active
   */
  public get isDesktopXl(): boolean {
    return this.includes('desktopXl')
  }

  /**
   * Is true when desktop2Xl breakpoint is active
   */
  public get isDesktop2Xl(): boolean {
    return this.includes('desktop2Xl')
  }

  /**
   * Verifies if given breakpoint is active
   * @param breakpoint
   * @returns boolean: True if breakpoint is active
   */
  public includes(breakpoint: DsBreakpoint): boolean {
    this.detect()
    return !!this.breakpoints?.includes(breakpoint)
  }

  /**
   * Detects breakpoints and updates state
   * @returns breakpoints: list of breakpoints which are active
   */
  public detect(): DsBreakpoint[] {
    if (this.win) {
      this.breakpoints = (Object.keys(BREAKPOINTS_MAP) as DsBreakpoint[]).filter(p => BREAKPOINTS_MAP[p](this.win))
      this.win.DesignSystem.breakpoints = this.breakpoints
      this.win.DesignSystem.platforms = this.breakpoints
    }
    return this.breakpoints
  }

  /**
   * Turns the breakpoints array to a object.
   * @returns Object with all the breakpoints
   */
  public toObject(): DsBreakpoints {
    return {
      mobile: this.breakpoints.includes('mobile'),
      tablet: this.breakpoints.includes('tablet'),
      touch: this.breakpoints.includes('touch'),
      desktop: this.breakpoints.includes('desktop'),
      desktopLg: this.breakpoints.includes('desktopLg'),
      desktopXl: this.breakpoints.includes('desktopXl'),
      desktop2Xl: this.breakpoints.includes('desktop2Xl'),
    }
  }
}

export const dsBreakpoints = /*@__PURE__*/ new DsBreakpointsUtil()
