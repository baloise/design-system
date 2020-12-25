import { ToastAccessor, dataTestSelector } from '../../../src'

export class ToastPage {
  toast = ToastAccessor(dataTestSelector("toast"))
  open() {
    cy.visit('/components/bal-toast')
  }
}
