/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the action button element.
     */
    balTabsFindActionButton(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Returns the tab items.
     */
    balTabsFindItems(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Returns the label of the tab item.
     */
    balTabsFindLabel(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Assert that the tab has the given item.
     */
    balTabsShouldHaveItems(
      labels: string[],
      dataType?: 'label' | 'value',
      options?: Partial<Loggable>,
    ): Chainable<JQuery>
    /**
     * Assert that the tab item has the  given state.
     */
    balTabItemShouldHaveState(
      state: 'done' | 'failed' | 'active' | 'disabled',
      options?: Partial<Loggable>,
    ): Chainable<JQuery>
  }
}
