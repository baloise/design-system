import { selectors } from '../helpers'

Cypress.Commands.add(
  'balSnackbarFind',
  {
    prevSubject: false,
  },
  () => {
    return cy.get(selectors.snackbar.main)
  },
)
