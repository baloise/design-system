/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balTabsFindActionButton(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balTabsFindItems(): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balTabsShouldHaveItems(labels: string[], dataType?: 'label' | 'value'): Chainable<JQuery>
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    balTabItemShouldHaveState(state: 'done' | 'failed' | 'active' | 'disabled'): Chainable<JQuery>
  }
}
