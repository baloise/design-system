/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Clickable<T> {
  click(options?: Partial<Cypress.ClickOptions>): T
  clickNth(index: number, options?: Partial<Cypress.ClickOptions>): T
}

export const ClickableMixin: Mixin = ({ element, creator }) => ({
  click: (options?: Partial<Cypress.ClickOptions>) => {
    element.click(options)
    return creator()
  },
  clickNth: (index: number, options?: Partial<Cypress.ClickOptions>) => {
    element.eq(index).click(options)
    return creator()
  },
})
