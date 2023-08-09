/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the tab items.
     */
    balStepsFindItems(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Returns the label of the tab item.
     */
    balStepsFindLabel(options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Assert that the tab has the given item.
     */
    balStepsShouldHaveItems(
      labels: string[],
      dataType?: 'label' | 'value',
      options?: Partial<Loggable>,
    ): Chainable<JQuery>
    /**
     * Assert that the tab item has the given state.
     */
    balStepsItemShouldHaveState(
      state: 'done' | 'failed' | 'active' | 'disabled',
      options?: Partial<Loggable>,
    ): Chainable<JQuery>
    /**
     * Assert that the tab item has not the given state.
     */
    balStepsItemShouldNotHaveState(
      state: 'done' | 'failed' | 'active' | 'disabled',
      options?: Partial<Loggable>,
    ): Chainable<JQuery>
  }
}
