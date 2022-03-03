/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Invokable<T> {
  invoke(locator: string): T
}

export const InvokableMixin: Mixin = ({ element }) => ({
  invoke: (attribute: string) => {
    return element.invoke(attribute)
  },
})
