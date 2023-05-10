import { balBrowser } from '../browser'
import { defaultLoggerConfig } from '../log'
import { config, configFromSession } from './config'
import { BalConfig, BalConfigState } from './config.types'
import {
  balIconClose,
  balIconInfoCircle,
  balIconPlus,
  balIconMinus,
  balIconEdit,
  balIconTrash,
  balIconNavGoLeft,
  balIconNavGoRight,
  balIconNavGoDown,
  balIconNavGoUp,
  balIconCaretLeft,
  balIconCaretDown,
  balIconCheck,
  balIconDate,
  balIconDocument,
  balIconUpload,
  balIconMenuBars,
  balIconFacebook,
  balIconInstagram,
  balIconLinkedin,
  balIconTwitter,
  balIconXing,
  balIconYoutube,
  balIconWeb,
  balIconCaretUp,
} from '../constants/icons.constant'

export const defaultConfig: BalConfigState = {
  region: 'CH',
  language: 'de',
  allowedLanguages: ['de', 'fr', 'it', 'en'],
  icons: {
    balIconClose,
    balIconInfoCircle,
    balIconPlus,
    balIconMinus,
    balIconEdit,
    balIconTrash,
    balIconNavGoLeft,
    balIconNavGoRight,
    balIconNavGoDown,
    balIconNavGoUp,
    balIconCaretLeft,
    balIconCaretDown,
    balIconCheck,
    balIconDate,
    balIconDocument,
    balIconUpload,
    balIconMenuBars,
    balIconFacebook,
    balIconInstagram,
    balIconLinkedin,
    balIconTwitter,
    balIconXing,
    balIconYoutube,
    balIconWeb,
    balIconCaretUp,
  },
  fallbackLanguage: 'de',
  logger: defaultLoggerConfig,
  animated: true,
}

export const defaultLocale = `${defaultConfig.language}-${defaultConfig.region}`

export const initialize = (userConfig: BalConfig = {}, win = {} as any) => {
  if (!balBrowser.hasWindow) {
    return
  }

  win = window

  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  config.reset({
    ...defaultConfig,
    ...configFromSession(win),
    ...userConfig,
    icons: {
      ...defaultConfig.icons,
      ...configFromSession(win).icons,
      ...userConfig.icons,
    },
  })

  win.BaloiseDesignSystem.config = config
}

export default initialize
