import { dsBrowser } from '../browser'
import { config, configFromLocalStorage } from './config'

import { Config } from './config.types'

export const setupConfig = (userConfig: BalConfig = {}, win = {} as any) => {
  if (Object.keys(win).length === 0 && dsBrowser.hasWindow) {
    win = window as any
  }

  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  config.reset({
    ...configFromLocalStorage(win),
    ...userConfig,
    icons: {
      ...userConfig.icons,
    },
  })

  win.BaloiseDesignSystem.config = config
}

export default setupConfig
