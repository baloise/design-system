import { selectors } from '../helpers'

Cypress.Commands.add(
  'balToastFind',
  {
    prevSubject: false,
  },
  (subject, arg1, arg2) => {
    return cy.get(selectors.toast.main)
  },
)
