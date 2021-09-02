/// <reference types="cypress" />

import { Element } from '../../../components/dist/types/stencil-public-runtime'
import { Mixin } from './mixins'

export interface Existable<T> {
  /**
   * Asserts that the element exists/not exists in the DOM
   */
  assertExists(exists?: boolean): T
}

export const ExistableMixin: Mixin = ({ element, creator }) => ({
  assertExists: (exists = true) => {
    element().should(exists ? 'exist' : 'not.exist')
    return creator()
  },
})
