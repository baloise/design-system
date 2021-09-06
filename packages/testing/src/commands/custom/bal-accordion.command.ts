/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balAccordionIsOpen(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balAccordionIsClosed(): Chainable<JQuery>
  }
}

Cypress.Commands.add(
  'balAccordionIsOpen',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).should('have.attr', 'is-active', '')
  },
)

Cypress.Commands.add(
  'balAccordionIsClosed',
  {
    prevSubject: true,
  },
  (subject, arg1, arg2) => {
    return cy.wrap(subject).should('not.have.attr', 'is-active')
  },
)
