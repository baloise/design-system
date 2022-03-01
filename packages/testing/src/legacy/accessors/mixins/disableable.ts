/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Disableable<T> {
  assertIsDisabled(enabled?: boolean): T
}

export const DisableableMixin: Mixin = ({ element, creator }) => ({
  assertIsDisabled: (disabled = true) => {
    element.should(disabled ? 'be.disabled' : 'not.be.disabled')
    return creator()
  },
})
