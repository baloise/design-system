/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Gets the element by data-testid.
     */
    getByTestId(testId: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery>
  }
}
