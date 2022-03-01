/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Clearable<T> {
  clear(options?: Partial<Cypress.TypeOptions>): T
}

export const ClearableMixin: Mixin = ({ element, creator }) => ({
  clear: (options?: Partial<Cypress.ClearOptions>) => {
    element.clear(options)
    return creator()
  },
})
