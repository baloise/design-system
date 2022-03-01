/// <reference types="cypress" />

export interface AccessorGetter<T> {
  get(element?: Cypress.Chainable): T
}

export type Accessor<T> = (selector: string) => AccessorGetter<T>

export type Mixin = <T>(context: MixinContext<T>) => any

export type AccessorCreator<T> = () => T

export interface MixinContext<T> {
  selector: string
  element: Cypress.Chainable
  creator: AccessorCreator<T>
}

let hasPrintedDeprecation = false

export const createAccessor =
  <T>(...mixins: Mixin[]) =>
  (selector: string): AccessorGetter<T> => ({
    get(element: Cypress.Chainable = cy.get(selector)) {
      if (!hasPrintedDeprecation) {
        console.warn('[DEPRECATED] - Mixins are no longer supported use cypress commands instead!')
        hasPrintedDeprecation = true
      }
      const creator = () => createAccessor(...mixins)(selector).get(element)
      return mixins.reduce(
        (acc, mixin) => ({
          ...acc,
          ...mixin({ selector, element, creator }),
        }),
        {},
      ) as T
    },
  })
