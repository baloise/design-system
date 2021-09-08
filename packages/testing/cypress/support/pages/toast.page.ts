import { dataTestSelector } from '../../../src'

export class ToastPage {
  toast = dataTestSelector('toast')
  toastWarning = dataTestSelector('toast-warning')

  open() {
    cy.visit('/components/bal-toast')
  }
}
