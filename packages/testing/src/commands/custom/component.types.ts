/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Disabled all animations for the Design System components.
     */
    disableAnimation(): Chainable<JQuery>
    /**
     * Disabled all logs for the Design System components.
     */
    disableLogger(): Chainable<JQuery>
    /**
     * Waits until the component is fully loaded.
     */
    waitForComponents(options?: Partial<Loggable & Timeoutable>): Chainable<JQuery>
    /**
     * Gets component and waits until it is ready
     */
    getComponent(selector: string, options?: Partial<Loggable>): Chainable<JQuery>
    /**
     * Wraps component and waits until it is ready.
     */
    wrapComponent(element: any, options?: Partial<Loggable & Timeoutable>): Chainable<JQuery>
    /**
     * Waits until the Design System is fully loaded and rendered
     */
    waitForDesignSystem(): Chainable<JQuery>
    /**
     * Waits until the browser goes into idle mode
     */
    waitAfterLastCallback(): Chainable<JQuery>
    /**
     * Waits until the browser goes into idle mode
     */
    waitAfterIdleCallback(): Chainable<JQuery>
    /**
     * Waits until the browser finished rendering
     */
    waitAfterFramePaint(): Chainable<JQuery>
    /**
     * Waits until the browser finished rendering
     */
    waitForBrowser(): Chainable<JQuery>
  }
}
