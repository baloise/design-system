/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerToggle(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerIsOpen(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerIsClosed(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerPick(date: Date): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerIsDateInRange(date: Date): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDatepickerIsDateNotInRange(date: Date): Chainable<JQuery>
  }
}
