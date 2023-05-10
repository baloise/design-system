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
