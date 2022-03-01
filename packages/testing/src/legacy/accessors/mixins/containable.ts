/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Containable<T> {
  contains(content: string | number | RegExp, shouldContain?: boolean, options?: any): T

  // notContain(content: string): T;
}

export const ContainableMixin: Mixin = ({ element, creator }) => ({
  contains: function (content: string | number | RegExp, shouldContain = true, options: any) {
    shouldContain ? element.contains(content, options) : element.should('not.contain', content)
    return creator()
  },
})
