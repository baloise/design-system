import { Platforms } from '@baloise/design-system-components'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to set the viewport / platform.
       */
      platform(platform: Platforms): Chainable<Element>
    }
  }
}
