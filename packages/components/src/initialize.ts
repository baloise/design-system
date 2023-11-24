import { setPlatformHelpers } from '@stencil/core'
import { balToastController } from './components/bal-toast/bal-toast.controller'
import { balSnackbarController } from './components/bal-snackbar/bal-snackbar.controller'
import { BalConfig, BalPlatformConfig, setupConfig } from './utils/config'
import { VERSION } from './utils/constants/version.constant'
import { balBrowser } from './utils/browser'

export const initializeBaloiseDesignSystem = (
  userConfig: BalConfig = {},
  platformConfig: BalPlatformConfig | undefined = undefined,
  win = {} as any,
) => {
  if (Object.keys(win).length === 0 && balBrowser.hasWindow) {
    win = window as any
  }

  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  if (platformConfig) {
    setPlatformHelpers(platformConfig)
  }
  setupConfig(userConfig, win)

  win.BaloiseDesignSystem.toastController = balToastController
  win.BaloiseDesignSystem.snackbarController = balSnackbarController
  win.BaloiseDesignSystem.initialize = () => setupConfig(win.BaloiseDesignSystem.config, win)
  win.BaloiseDesignSystem.version = VERSION
}
