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
} from '@baloise/design-system-icons/src'

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
}

export const defaultLocale = `${defaultConfig.language}-${defaultConfig.region}`

export const initialize = (userConfig: BalConfig = {}, win = {} as any) => {
  if (typeof (window as any) === 'undefined') {
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
