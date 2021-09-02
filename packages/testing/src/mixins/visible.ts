/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Visible<T> {
  /**
   * Assert that the component is visible or not visible for the user
   */
  assertVisible(visible?: boolean): T
}

export const VisibleMixin: Mixin = ({ element, creator }) => ({
  assertVisible: (visible = true) => {
    element().should(visible ? 'be.visible' : 'not.be.visible')
    return creator()
  },
})
