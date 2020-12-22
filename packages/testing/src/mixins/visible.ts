/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Visible<T> {
  /**
   * Assert that the component is visible for the user
   */
  assertVisible(): T
  /**
   * Assert that the component is not visible for the user
   */
  assertNotVisible(): T
}

export const VisibleMixin: Mixin = ({ element, creator }) => ({
  assertVisible: () => {
    element.should('be.visible')
    return creator()
  },
  assertNotVisible: () => {
    element.should('not.be.visible')
    return creator()
  },
})
