export type Platforms = keyof typeof PLATFORMS_MAP

interface IsPlatformSignature {
  (plt: Platforms): boolean
  (win: Window, plt: Platforms): boolean
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

export const setupPlatforms = (win: any = window) => {
  if (typeof win === 'undefined') {
    return []
  }

  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  let platforms: Platforms[] | undefined | null = win.BaloiseDesignSystem.platforms
  if (platforms == null) {
    platforms = win.BaloiseDesignSystem.platforms = detectPlatforms(win)
    platforms.forEach(p => win.document.documentElement.classList.add(`is-plt-${p}`))
  }

  return platforms
}

const detectPlatforms = (win: Window) => (Object.keys(PLATFORMS_MAP) as Platforms[]).filter(p => PLATFORMS_MAP[p](win))

const isMobile = (win: Window) => {
  const width = win.innerWidth
  return width < 768
}

const isTablet = (win: Window) => {
  const width = win.innerWidth
  return width > 767 && width < 1024
}

const isDesktop = (win: Window) => !isMobile(win) && !isTablet(win)

const PLATFORMS_MAP = {
  mobile: isMobile,
  tablet: isTablet,
  desktop: isDesktop,
}
