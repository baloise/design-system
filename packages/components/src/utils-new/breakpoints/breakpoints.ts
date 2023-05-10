import { balBrowser } from '../../utils/browser'
import { BalBreakpoints } from './breakpoints.interfaces'
import { BREAKPOINTS_MAP } from './breakpoints.map'

export type Breakpoint = keyof typeof BREAKPOINTS_MAP

class BreakpointsClass {
  private win?: any
  private breakpoints: Breakpoint[] = []

  constructor() {
    if (balBrowser.hasWindow) {
      this.win = window
      this.win.BaloiseDesignSystem = this.win.BaloiseDesignSystem || {}
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
   * Is true when desktop, highDefinition, widescreen or fullhd breakpoint is active
   */
  public get isDesktop(): boolean {
    return this.includes('desktop')
  }

  /**
   * Is true when highDefinition breakpoint is active
   */
  public get isHighDefinition(): boolean {
    return this.includes('highDefinition')
  }

  /**
   * Is true when widescreen breakpoint is active
   */
  public get isWidescreen(): boolean {
    return this.includes('widescreen')
  }

  /**
   * Is true when fullhd breakpoint is active
   */
  public get isFullHD(): boolean {
    return this.includes('fullhd')
  }

  /**
   * Verifies if given breakpoint is active
   * @param breakpoint
   * @returns boolean: True if breakpoint is active
   */
  public includes(breakpoint: Breakpoint): boolean {
    this.detect()
    return !!this.breakpoints?.includes(breakpoint)
  }

  /**
   * Detects breakpoints and updates state
   * @returns breakpoints: list of breakpoints which are active
   */
  public detect(): Breakpoint[] {
    if (this.win) {
      this.breakpoints = (Object.keys(BREAKPOINTS_MAP) as Breakpoint[]).filter(p => BREAKPOINTS_MAP[p](this.win))
      this.win.BaloiseDesignSystem.breakpoints = this.breakpoints
      this.win.BaloiseDesignSystem.platforms = this.breakpoints
    }
    return this.breakpoints
  }

  /**
   * Turns the breakpoints array to a object.
   * @returns Object with all the breakpoints
   */
  public toObject(): BalBreakpoints {
    return {
      mobile: this.breakpoints.includes('mobile'),
      tablet: this.breakpoints.includes('tablet'),
      touch: this.breakpoints.includes('touch'),
      desktop: this.breakpoints.includes('desktop'),
      highDefinition: this.breakpoints.includes('highDefinition'),
      widescreen: this.breakpoints.includes('widescreen'),
      fullhd: this.breakpoints.includes('fullhd'),
    }
  }
}

export const balBreakpoints = new BreakpointsClass()
