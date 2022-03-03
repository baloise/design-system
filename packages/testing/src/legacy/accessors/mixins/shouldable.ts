/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Shouldable<T> {
  should(chainers: string, attribute?: string | number, content?: string | number): T
}

export const ShouldableMixin: Mixin = ({ element, creator }) => ({
  should: function (chainers: string, attribute?: string | number, content?: string | number) {
    switch (arguments.length) {
      case 2:
        element.should(chainers, attribute)
        break
      case 3:
        element.should(chainers, attribute, content)
        break
      default:
        element.should(chainers)
        break
    }
    return creator()
  },
})
