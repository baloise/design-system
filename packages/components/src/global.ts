import { balToastController } from './components/notice/bal-toast/bal-toast.controller'
import { balSnackbarController } from './components/notice/bal-snackbar/bal-snackbar.controller'
import { initialize } from './config'

export default function () {
  if (typeof (window as any) !== 'undefined') {
    const win = window as any
    const BaloiseDesignSystem = (win.BaloiseDesignSystem = win.BaloiseDesignSystem || {})
    initialize()
    BaloiseDesignSystem.toastController = balToastController
    BaloiseDesignSystem.snackbarController = balSnackbarController
  }
}
