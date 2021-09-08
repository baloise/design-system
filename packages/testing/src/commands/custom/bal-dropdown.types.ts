/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Opens and closes the dropdown.
     */
    balDropdownToggle(): Chainable<JQuery>
    /**
     * Asserts if the dropdown is open.
     */
    balDropdownIsOpen(): Chainable<JQuery>
    /**
     * Asserts if the dropdown is closed.
     */
    balDropdownIsClosed(): Chainable<JQuery>
    /**
     * Asserts if the trigger button contains the given content.
     */
    balDropdownTriggerContains(
      content: string | number | RegExp,
      options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>,
    ): Chainable<JQuery>
    /**
     * Asserts if the dropdown menu contains the given content.
     */
    balDropdownMenuContains(
      content: string | number | RegExp,
      options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>,
    ): Chainable<JQuery>
  }
}
