import { newBalOptionValue, newBalSingleOptionValue } from '../components/bal-select/utils/bal-option.util'
import { BalBreakpoints, BalBreakpoint, balBreakpoints } from './breakpoints'
import { balBrowser } from './browser'
import { balDevice } from './device'

/**
 * deprecated: Please use balDevice.hasTouchScreen
 */
export const hasTouchSupport = () => balDevice.hasTouchScreen

/**
 * deprecated: Please use balBrowser.isSafari
 */
export const isBrowser = (browser: 'Safari' | 'others'): boolean => {
  if (browser === 'Safari') {
    return balBrowser.isSafari
  }
  return false
}

export type Platforms = BalBreakpoint

export type PlatformSrcSet = Partial<BalBreakpoints>

export const getPlatforms = (_win?: any) => balBreakpoints.detect()

interface IsPlatformSignature {
  (plt: Platforms): boolean
  (win: Window, plt: Platforms): boolean
}

export const isPlatform: IsPlatformSignature = (winOrPlatform: Window | Platforms, platform?: Platforms) => {
  if (typeof winOrPlatform === 'string') {
    platform = winOrPlatform
  }
  if (platform) {
    return balBreakpoints.detect().includes(platform)
  }
  return false
}

/**
 * deprecated
 */
export const NewBalOptionValue = newBalOptionValue
export const NewBalSingleOptionValue = newBalSingleOptionValue
