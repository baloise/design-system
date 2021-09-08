import { selectors } from '../helpers'

Cypress.Commands.add(
  'balHintFindOverlay',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(selectors.hint.content)
  },
)

Cypress.Commands.add(
  'balHintFindCloseButton',
  {
    prevSubject: true,
  },
  subject => {
    return cy.wrap(subject).find(selectors.hint.close)
  },
)
