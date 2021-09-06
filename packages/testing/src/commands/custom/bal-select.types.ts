/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balSelectFindOptions(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balSelectFindChips(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balSelectShouldHaveOptions(labels: string[], dataType?: 'label' | 'value'): Chainable<JQuery>
  }
}
