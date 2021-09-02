/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Thenable<T> {
  /**
   * Enables you to work with the subject yielded from the previous command.
   */
  then<E = unknown>(callBack: (element: E) => void): T
}

export const ThenableMixin: Mixin = ({ element, creator }) => ({
  then: (callBack: Function) => {
    element().then(($element?) => callBack($element))
    return creator()
  },
})
