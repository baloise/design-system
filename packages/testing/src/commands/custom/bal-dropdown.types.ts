/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the select options.
     */
    balDropdownFindOptions(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Returns the closable select chips (only with multiselect).
     */
    balDropdownFindChips(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Asserts that the select has the given options.
     */
    balDropdownShouldHaveOptions(
      labels: string[],
      dataType?: 'label' | 'value',
      options?: Partial<Loggable>,
    ): Chainable<JQuery>
  }
}
