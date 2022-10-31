import { balToastController } from './components/notice/bal-toast/bal-toast.controller'
import { balSnackbarController } from './components/notice/bal-snackbar/bal-snackbar.controller'
import { BalMode, initialize, initStyleMode } from './utils/config'
import { setupPlatforms } from './utils/platform'
import { VERSION } from './utils/constants/version.constant'
import { isDocumentDefined, isWindowDefined } from './utils/browser'

export default function () {
  console.log('global')
  if (isWindowDefined()) {
    const win = window as any
    win.BaloiseDesignSystem = win.BaloiseDesignSystem || {}

    initialize({}, win)
    setupPlatforms(win)

    win.BaloiseDesignSystem.toastController = balToastController
    win.BaloiseDesignSystem.snackbarController = balSnackbarController
    win.BaloiseDesignSystem.initialize = () => initialize(win.BaloiseDesignSystem.config, win)
    win.BaloiseDesignSystem.version = VERSION

    const onReady = () => {
      if (isDocumentDefined()) {
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
