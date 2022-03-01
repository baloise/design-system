/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Visible<T> {
  assertVisible(visible?: boolean): T
}

export const VisibleMixin: Mixin = ({ element, creator }) => ({
  assertVisible: (visible = true) => {
    element.should(visible ? 'be.visible' : 'not.be.visible')
    return creator()
  },
})
