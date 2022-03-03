/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface NthSelectable<T> {
  selectNth(index: number): T

  last(): T

  parent(): T
}

export const NthSelectableMixin: Mixin = ({ element, creator }) => ({
  selectNth: (index: number) => {
    element.eq(index)
    return creator()
  },
  last: () => {
    element.last()
    return creator()
  },
  parent: () => {
    element.parent()
    return creator()
  },
})
