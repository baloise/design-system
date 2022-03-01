/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Eachable<T> {
  each(callBack: () => void): T
}

export const EachableMixin: Mixin = ({ element, creator }) => ({
  each: (callBack: () => void) => {
    element.each(() => callBack())
    return creator()
  },
})
