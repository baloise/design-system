import { config, configFromSession } from './config'
import { BalConfig, BalConfigState } from './config.types'

export const defaultConfig: BalConfigState = {
  region: 'CH',
  language: 'de',
}

export const initialize = (userConfig: BalConfig = {}) => {
  if (typeof (window as any) === 'undefined') {
    return
  }

  const win = window as any
  const BaloiseDesignSystem = (win.BaloiseDesignSystem = win.BaloiseDesignSystem || {})

  config.reset({
    ...defaultConfig,
    ...configFromSession(win),
    ...userConfig,
  })

  BaloiseDesignSystem.config = config
}

export default initialize
