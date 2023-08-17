/// <reference types="cypress" />

declare namespace Cypress {
  interface GetByRoleOptions {
    name?: string
    hidden?: boolean
  }

  interface Chainable {
    /**
     * Gets the element by data-testid.
     */
    getByTestId(testId: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery>
    // /**
    //  * Finds element by placeholder.
    //  */
    // getByPlaceholder(
    //   placeholder: string,
    //   options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
    // ): Chainable<JQuery>

    // /**
    //  * Finds element by placeholder.
    //  */
    // getByRole(
    //   role: 'button',
    //   options: GetByRoleOptions & Partial<Loggable & Timeoutable & Withinable & Shadow>,
    // ): Chainable<JQuery>
  }
}
