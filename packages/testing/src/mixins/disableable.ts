/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Disableable<T> {
  /**
   * Asserts that the element is disabled
   */
  assertIsDisabled(): T
  /**
   * Asserts that the element is enabled and can be used
   */
  assertIsEnabled(): T
}

export const DisableableMixin: Mixin = ({ element, creator }) => ({
  assertIsDisabled: () => {
    element.should('be.disabled')
    return creator()
  },
  assertIsEnabled: () => {
    element.should('not.be.disabled')
    return creator()
  },
})
