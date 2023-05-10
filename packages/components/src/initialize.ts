import { balToastController } from './components/notice/bal-toast/bal-toast.controller'
import { balSnackbarController } from './components/notice/bal-snackbar/bal-snackbar.controller'
import { BalConfig, BalMode, initialize, initStyleMode } from './utils-new/config'
import { setupPlatforms } from './utils/platform'
import { VERSION } from './utils-new/constants/version.constant'
import { balBrowser } from './utils-new/browser'

export const initializeBaloiseDesignSystem = (initConfig: BalConfig = {}) => {
  if (balBrowser.hasWindow) {
    const win = window as any
    win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

    initialize(initConfig, win)
    setupPlatforms(win)

    win.BaloiseDesignSystem.toastController = balToastController
    win.BaloiseDesignSystem.snackbarController = balSnackbarController
    win.BaloiseDesignSystem.initialize = () => initialize(win.BaloiseDesignSystem.config, win)
    win.BaloiseDesignSystem.version = VERSION

    const onReady = () => {
      if (balBrowser.hasDocument) {
        const body = document.querySelector('.bal-body')
        if (body && body.classList) {
          body.classList.add('is-ready')
        }
      }
    }

    if (win.addEventListener) {
      let isAppReady = false
      let styleMode: BalMode = 'css'

      const app = document.querySelector('.bal-app')
      if (app) {
        isAppReady = app?.getAttribute('ready') === ''

        if (app?.getAttribute('mode') !== null) {
          styleMode = app?.getAttribute('mode') as BalMode
        }
      }

      initStyleMode(styleMode)

      if (isAppReady) {
        onReady()
      } else {
        win.addEventListener('balAppLoad', () => onReady())
      }
    }
  }
}
