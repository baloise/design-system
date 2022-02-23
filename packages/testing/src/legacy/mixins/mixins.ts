/// <reference types="cypress" />

export interface AccessorGetter<T> {
  get(selector?: string): T
}

export type Accessor<T> = (selector: string) => AccessorGetter<T>

export type Mixin = <T>(context: MixinContext<T>) => any

export type AccessorCreator<T> = () => T

export interface MixinContext<T> {
  selector: string
  creator: AccessorCreator<T>
}

export const createAccessor =
  <T>(...mixins: Mixin[]) =>
  (_selector: string): AccessorGetter<T> => ({
    get(selector: string = _selector) {
      const creator = () => createAccessor(...mixins)(selector).get(selector)
      return mixins.reduce(
        (acc, mixin) => ({
          ...acc,
          ...mixin({ selector, creator }),
        }),
        {},
      ) as T
    },
  })
