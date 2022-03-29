import { selectors } from '../helpers'

Cypress.Commands.add(
  'balFieldFindHint',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(selectors.field.hint)
  },
)
