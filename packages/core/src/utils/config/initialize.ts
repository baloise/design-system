import { balBrowser } from '../browser'
import { config, configFromLocalStorage } from './config'

import { BalConfig } from './config.types'

export const setupConfig = (userConfig: BalConfig = {}, win = {} as any) => {
  if (Object.keys(win).length === 0 && balBrowser.hasWindow) {
    win = window as any
  }

  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  console.log('-> setupConfig', userConfig)
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
