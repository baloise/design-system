import { dataTestSelector } from '../../../src'

export class SnackbarPage {
  snackbar = dataTestSelector('snack')
  snackbarWarning = dataTestSelector('snack-warning')

  open() {
    cy.visit('/components/notice/bal-snackbar')
  }
}
