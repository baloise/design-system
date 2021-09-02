/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Containable<T> {
  /**
   * Verifies if the content of the element matches
   */
  contains(content: string | number | RegExp): T
}

export const ContainableMixin: Mixin = ({ element, creator }) => ({
  contains: (content: string | number | RegExp) => {
    element().contains(content)
    return creator()
  },
})
