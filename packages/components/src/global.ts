import { balToastController } from './components/notice/bal-toast/bal-toast.controller'
import { balSnackbarController } from './components/notice/bal-snackbar/bal-snackbar.controller'
import { initialize } from './config'
import { setupPlatforms } from './utils/platform'
import { VERSION } from './constants/version.constant'

export default function () {
  if (typeof (window as any) !== 'undefined') {
    const win = window as any
    win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

    initialize({}, win)
    setupPlatforms(win)

    win.BaloiseDesignSystem.toastController = balToastController
    win.BaloiseDesignSystem.snackbarController = balSnackbarController
    win.BaloiseDesignSystem.initialize = () => initialize(win.BaloiseDesignSystem.config, win)
    win.BaloiseDesignSystem.version = VERSION
  }
}
