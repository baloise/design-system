import { isWindowDefined } from '../browser'
import { defaultLoggerConfig } from '../log'
import { config, configFromSession } from './config'
import { BalConfig, BalConfigState } from './config.types'
import {
  balIconClose,
  balIconInfoCircle,
  balIconPlus,
  balIconNavGoLeft,
  balIconNavGoRight,
  balIconCaretLeft,
  balIconCaretDown,
  balIconCheck,
  balIconDate,
  balIconDocument,
} from '../constants/icons.constant'

export const defaultConfig: BalConfigState = {
  region: 'CH',
  language: 'de',
  allowedLanguages: ['de', 'fr', 'it', 'en'],
  icons: {
    balIconClose,
    balIconInfoCircle,
    balIconPlus,
    balIconNavGoLeft,
    balIconNavGoRight,
    balIconCaretLeft,
    balIconCaretDown,
    balIconCheck,
    balIconDate,
    balIconDocument,
  },
  fallbackLanguage: 'de',
  logger: defaultLoggerConfig,
}

export const defaultLocale = `${defaultConfig.language}-${defaultConfig.region}`

export const initialize = (userConfig: BalConfig = {}, win = {} as any) => {
  if (!isWindowDefined()) {
    return
  }

  win = window

  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  config.reset({
    ...defaultConfig,
    ...configFromSession(win),
    ...userConfig,
  })

  win.BaloiseDesignSystem.config = config
}

export default initialize
