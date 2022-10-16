import { config, configFromSession } from './config'
import { BalConfig, BalConfigState } from './config.types'

export const defaultConfig: BalConfigState = {
  region: 'CH',
  language: 'de',
  allowedLanguages: ['de', 'fr', 'it', 'en'],
  icons: {},
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
