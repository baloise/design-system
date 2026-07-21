import { Platforms } from '../helpers'

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
