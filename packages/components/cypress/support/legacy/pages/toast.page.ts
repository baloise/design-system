import { ToastAccessor, byTestId } from '../../../../../testing/src'

export class ToastPage {
  toast = ToastAccessor(byTestId('toast'))
  open() {
    cy.visit('/components/notice/bal-toast')
  }
}
