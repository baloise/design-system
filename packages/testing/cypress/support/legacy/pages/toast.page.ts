import { ToastAccessor, byTestId } from '../../../../src'

export class ToastPage {
  toast = ToastAccessor(byTestId('toast'))
  open() {
    cy.visit('/components/notice/bal-toast')
  }
}
