/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Blurable<T> {
  blur(options?: Partial<Cypress.BlurOptions>): T
}

export const BlurableMixin: Mixin = ({ element, creator }) => ({
  blur: (options?: Partial<Cypress.BlurOptions>) => {
    element.blur(options)
    return creator()
  },
})
