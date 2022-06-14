export type Platforms = keyof typeof PLATFORMS_MAP

interface IsPlatformSignature {
  (plt: Platforms): boolean
  (win: Window, plt: Platforms): boolean
}

export interface PlatformSrcSet {
  mobile?: string
  tablet?: string
  touch?: string
  desktop?: string
  widescreen?: string
  fullhd?: string
}

export const getPlatforms = (win?: any) => setupPlatforms(win)

export const isPlatform: IsPlatformSignature = (
  winOrPlatform: Window | Platforms | undefined,
  platform?: Platforms,
) => {
  if (typeof winOrPlatform === 'string') {
    platform = winOrPlatform
    winOrPlatform = undefined
  }
  return getPlatforms(winOrPlatform).includes(platform!)
}

export const setupPlatforms = (win = {} as any) => {
  if (typeof (window as any) === 'undefined') {
    return []
  }

  win = window
  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  const platforms: Platforms[] | undefined | null = (win.BaloiseDesignSystem.platforms = detectPlatforms(win))
  return platforms
}

const detectPlatforms = (win: Window) => (Object.keys(PLATFORMS_MAP) as Platforms[]).filter(p => PLATFORMS_MAP[p](win))

const isMobile = (win: Window) => {
  const width = win.innerWidth
  return width <= 768
}

const isTablet = (win: Window) => {
  const width = win.innerWidth
  return width > 768 && width < 1024
}

const isTouch = (win: Window) => isMobile(win) || isTablet(win)

const isDesktop = (win: Window) => !isTouch(win)

const isWideScreen = (win: Window) => {
  const width = win.innerWidth
  return width > 1439 && width < 1920
}

const isFullHD = (win: Window) => {
  const width = win.innerWidth
  return width > 1919
}

const PLATFORMS_MAP = {
  mobile: isMobile,
  tablet: isTablet,
  touch: isTouch,
  desktop: isDesktop,
  widescreen: isWideScreen,
  fullhd: isFullHD,
}
