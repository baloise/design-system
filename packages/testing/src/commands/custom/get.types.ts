/// <reference types="cypress" />

declare namespace Cypress {
  interface GetByRoleOptions {
    name?: string
    hidden?: boolean
  }

  interface Chainable {
    /**
     * Gets the element by data-testid or data-test.
     */
    getByTestId(testId: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery>
    /**
     * Gets the control elements to the given subject
     */
    getControl(labelText: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
    /**
     * Gets the elements who describes the subject
     */
    getDescribingElement(options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
    /**
     * Asserts if the form element is invalid
     */
    shouldBeInvalid(options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
    /**
     * Asserts if the form element is valid
     */
    shouldBeValid(options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
    /**
     * Gets a element by the label
     */
    getByLabelText(labelText: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<void>
    /**
     * Gets a element by the placeholder
     */
    getByPlaceholder(
      placeholder: string,
      options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
    ): Chainable<JQuery>
    /**
     * Gets a element by the role
     */
    getByRole(
      role: 'button' | 'label',
      options: GetByRoleOptions & Partial<Loggable & Timeoutable & Withinable & Shadow>,
    ): Chainable<JQuery>
  }
}
