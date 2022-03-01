/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Existable<T> {
  assertExists(exists?: boolean): T
}

export const ExistableMixin: Mixin = ({ element, creator }) => ({
  assertExists: (exists = true) => {
    element.should(exists ? 'exist' : 'not.exist')
    return creator()
  },
})
