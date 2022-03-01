/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Waitable<T> {
  wait(time: number): T
}

export const WaitableMixin: Mixin = ({ element, creator }) => ({
  wait: (time: number) => {
    element.wait(time)
    return creator()
  },
})
