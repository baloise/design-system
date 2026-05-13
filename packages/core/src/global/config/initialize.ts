import { dsBrowser } from '@utils'
import { config, configFromLocalStorage } from './config'

import { DsConfig } from './config.types'

export const setupDsConfig = (userConfig: DsConfig = {}, win = {} as any) => {
  if (Object.keys(win).length === 0 && dsBrowser.hasWindow) {
    win = window as any
  }

  win.DesignSystem = win.DesignSystem || {}

  config.reset({
    ...configFromLocalStorage(win),
    ...userConfig,
    icons: {
      ...userConfig.icons,
    },
  })

  win.DesignSystem.config = config
}

export default setupDsConfig
