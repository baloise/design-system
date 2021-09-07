import { dataTestSelector } from '../../../src/selectors'

export class SnackbarPage {
  snackbar = dataTestSelector('snack')
  snackbarWarning = dataTestSelector('snack-warning')

  open() {
    cy.visit('/components/bal-snackbar')
  }
}
