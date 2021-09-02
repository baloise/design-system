/// <reference types="cypress" />

export interface AccessorGetter<T, E = unknown> {
  selector: string | E
  get(selector?: string | E): T
}

export type Accessor<T> = (selector: string) => AccessorGetter<T>

export type Mixin = <T>(context: MixinContext<T>) => any

export type AccessorCreator<T> = (selectorOrElement?: any) => T

export interface MixinContext<T, E = unknown> {
  selector: string | E
  creator: AccessorCreator<T>
  element: () => Cypress.Chainable<JQuery<unknown>>
}

// wrap<E extends Node = HTMLElement>(element: E | JQuery<E>

export const createAccessor =
  <T, E = unknown>(...mixins: Mixin[]) =>
  (_selector: string | E): AccessorGetter<T> => ({
    selector: _selector,
    get(selector = _selector) {
      const creator = (selectorCreator?: any) => {
        if (selectorCreator) {
          return createAccessor(...mixins)(selectorCreator).get(selectorCreator)
        }
        return createAccessor(...mixins)(selector).get(selector)
      }
      const element = (): Cypress.Chainable<JQuery<unknown>> => {
        if (typeof selector === 'string') {
          return cy.get(selector)
        }
        return cy.wrap(selector)
      }
      return mixins.reduce(
        (acc, mixin) => ({
          ...acc,
          ...mixin({ selector, creator, element }),
        }),
        {},
      ) as T
    },
  })
