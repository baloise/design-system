// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'

import '../../../testing/src'

import 'cypress-file-upload'
import 'cypress-axe'

import type { RunOptions } from 'axe-core'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Opens the page on the given url, waits until the component has loaded
       */
      page(url: string): Chainable<Element>
      /**
       * Opens the page on the given url, waits until the component has loaded and
       * injects accessibility checking
       */
      pageA11y(url: string): Chainable<Element>
      /**
       * Opens the page on the given url, waits until the component has loaded
       */
      visualPage(url: string): Chainable<Element>
      /**
       * Runs the accessibility checking on the given state/page.
       */
      testA11y(options?: RunOptions | undefined): void
      /**
       * Custom command to spy on custom events.
       * @example cy.get('bal-button').spyEvent('balChange')
       */
      spyEvent(event: string, asEventName?: string): Chainable<Element>
      /**
       * Custom command to asset event detail content.
       * @example cy.get('@balChange').shouldHaveEventDetail('balChange', 2)
       */
      shouldHaveEventDetail(value: any, time?: number): Chainable<Element>
      /**
       * Sets attribute/property to component
       */
      setProperty(attr: string, value: any): Chainable<Element>
      /**
       * Checks if the component has attribute/property
       */
      hasProperty(attr: string, value: any): Chainable<Element>
      /**
       * Removes attribute/property to component
       */
      removeProperty(attr: string): Chainable<Element>
    }
  }
}

import * as compareSnapshotCommand from 'cypress-visual-regression/dist/command'
const compareSnapshotCommandAsAny = compareSnapshotCommand as any

compareSnapshotCommandAsAny({
  capture: 'fullPage',
})
