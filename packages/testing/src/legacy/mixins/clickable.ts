/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Clickable<T> {
  /**
   * Triggers a clicks on the element
   */
  click(options?: Partial<Cypress.ClickOptions>): T
  /**
   * Triggers n times a click on the element
   */
  clickNth(index: number, options?: Partial<Cypress.ClickOptions>): T
}

export const ClickableMixin: Mixin = ({ selector, creator }) => ({
  click: (options?: Partial<Cypress.ClickOptions>) => {
    cy.get(selector).click(options)
    return creator()
  },
  clickNth: (index: number, options?: Partial<Cypress.ClickOptions>) => {
    cy.get(selector).eq(index).click(options)
    return creator()
  },
})
