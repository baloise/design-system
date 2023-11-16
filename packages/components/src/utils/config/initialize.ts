import { balBrowser } from '../browser'
import { config, configFromSession } from './config'
import { BalConfig } from './config.types'

export const initialize = (userConfig: BalConfig = {}, win = {} as any) => {
  if (!balBrowser.hasWindow) {
    return
  }

  win = window

  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  config.reset({
    ...configFromSession(win),
    ...userConfig,
    icons: {
      ...configFromSession(win).icons,
      ...userConfig.icons,
    },
  })

  win.BaloiseDesignSystem.config = config
}

export default initialize
