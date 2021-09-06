/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownToggle(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownIsOpen(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownIsClosed(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownTriggerContains(
      content: string | number | RegExp,
      options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>,
    ): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balDropdownMenuContains(
      content: string | number | RegExp,
      options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>,
    ): Chainable<JQuery>
  }
}
