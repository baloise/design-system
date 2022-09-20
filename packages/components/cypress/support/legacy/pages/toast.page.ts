import { ToastAccessor, byTestId } from '../../../../../testing/src'

export class ToastPage {
  toast = ToastAccessor(byTestId('toast'))
  open() {
    cy.page('/components/notice/bal-toast/test/bal-toast.cy.html')
  }
}
