/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface NthSelectable<T> {
  /**
   * Selects the option at the given index
   */
  selectNth(index: number): T
}

export const NthSelectableMixin: Mixin = ({ element, creator }) => ({
  selectNth: (index: number) => {
    element.eq(index)
    return creator()
  },
})
