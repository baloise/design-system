/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Urlable<T> {
  /**
   * Asserting if given url argument matches the url of the browser.
   */
  assertFullUrl(url: string): T
  /**
   * Asserting if the browser url contains the given url argument.
   */
  assertPartUrl(url: string): T
}

export const UrlableMixin: Mixin = ({ creator }) => ({
  assertFullUrl: (url: string) => {
    cy.url().should('eq', url)
    return creator()
  },

  assertPartUrl: (url: string) => {
    cy.url().should('contain', url)
    return creator()
  },
})
