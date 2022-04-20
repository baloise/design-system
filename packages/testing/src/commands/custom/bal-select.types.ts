/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the select options.
     */
    balSelectFindOptions(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Returns the closable select chips (only with multiselect).
     */
    balSelectFindChips(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Asserts that the select has the given options.
     */
    balSelectShouldHaveOptions(labels: string[], dataType?: 'label' | 'value', options?: Partial<Loggable>): Chainable<JQuery>
  }
}
