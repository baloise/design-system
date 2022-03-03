/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Findable<T> {
  find(locator: string): T
}

export const FindableMixin: Mixin = ({ element, creator }) => ({
  find: (locator: string) => {
    element.find(locator)
    return creator()
  },
})
