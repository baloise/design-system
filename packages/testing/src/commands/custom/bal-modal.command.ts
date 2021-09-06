import { selectors } from '../helpers'

Cypress.Commands.add(
  'balModalIsOpen',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).find(selectors.modal.main).should('have.class', 'is-active')
  },
)

Cypress.Commands.add(
  'balModalIsClosed',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).find(selectors.modal.main).should('not.have.class', 'is-active')
  },
)
