import { byTestId } from '../../../src'

export class SnackbarPage {
  snackbar = byTestId('snack')
  snackbarWarning = byTestId('snack-warning')

  open() {
    cy.visit('/components/notice/bal-snackbar')
  }
}
