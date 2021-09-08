import { selectors } from '../helpers'

Cypress.Commands.add(
  'balToastFind',
  {
    prevSubject: false,
  },
  () => {
    return cy.get(selectors.toast.main)
  },
)
