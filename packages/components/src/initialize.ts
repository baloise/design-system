import { setPlatformHelpers } from '@stencil/core'

import { balToastController } from './components/bal-toast/bal-toast.controller'
import { balSnackbarController } from './components/bal-snackbar/bal-snackbar.controller'
import { BalConfig, initializeConfig } from './utils/config'
import { VERSION } from './utils/constants/version.constant'
import { balBreakpoints } from './utils/breakpoints'
import { balBrowser } from './utils/browser'

export const initializeBaloiseDesignSystem = (initConfig: BalConfig = {}, win = {} as any) => {
  if (Object.keys(win).length === 0 && balBrowser.hasWindow) {
    win = window as any
  }

  win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

  setPlatformHelpers({
    jmp: initConfig._jmp,
    raf: initConfig._raf,
    ael: initConfig._ael,
    rel: initConfig._rel,
    ce: initConfig._ce,
  })

  initializeConfig(initConfig, win)
  balBreakpoints.detect()

  win.BaloiseDesignSystem.toastController = balToastController
  win.BaloiseDesignSystem.snackbarController = balSnackbarController
  win.BaloiseDesignSystem.initialize = () => initializeConfig(win.BaloiseDesignSystem.config, win)
  win.BaloiseDesignSystem.version = VERSION
}
