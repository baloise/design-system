/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Urlable<T> {
  assertFullUrl(url: string): T

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
