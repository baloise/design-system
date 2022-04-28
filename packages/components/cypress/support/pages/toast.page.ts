import { byTestId } from '../../../../testing/src'

export class ToastPage {
  toast = byTestId('toast')
  toastWarning = byTestId('toast-warning')

  open() {
    cy.page('/components/notice/bal-toast')
  }
}
