import { byTestId } from '../../../src'

export class ToastPage {
  toast = byTestId('toast')
  toastWarning = byTestId('toast-warning')

  open() {
    cy.visit('/components/notice/bal-toast')
  }
}
