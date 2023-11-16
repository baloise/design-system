import { balToastController } from './components/bal-toast/bal-toast.controller'
import { balSnackbarController } from './components/bal-snackbar/bal-snackbar.controller'
import { BalConfig, initialize } from './utils/config'
import { VERSION } from './utils/constants/version.constant'
import { balBrowser } from './utils/browser'
import { balBreakpoints } from './utils/breakpoints'

export const initializeBaloiseDesignSystem = (initConfig: BalConfig = {}) => {
  if (balBrowser.hasWindow) {
    const win = window as any
    win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

    initialize(initConfig, win)
    balBreakpoints.detect()

    win.BaloiseDesignSystem.toastController = balToastController
    win.BaloiseDesignSystem.snackbarController = balSnackbarController
    win.BaloiseDesignSystem.initialize = () => initialize(win.BaloiseDesignSystem.config, win)
    win.BaloiseDesignSystem.version = VERSION
  }
}
