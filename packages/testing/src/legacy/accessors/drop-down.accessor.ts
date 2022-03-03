/// <reference types="cypress" />

import { Andable, AndableMixin } from './mixins/andable'
import { Attributable, AttributableMixin } from './mixins/attributable'
import { Blurable, BlurableMixin } from './mixins/blurable'
import { Clickable } from './mixins/clickable'
import { Containable } from './mixins/containable'
import { Disableable, DisableableMixin } from './mixins/disableable'
import { Eachable, EachableMixin } from './mixins/eachable'
import { Existable, ExistableMixin } from './mixins/existable'
import { Findable, FindableMixin } from './mixins/findable'
import { Invokable, InvokableMixin } from './mixins/invokable'
import { Lengthable, LengthableMixin } from './mixins/lengthable'
import { Accessor, createAccessor, Mixin, MixinContext } from './mixins/mixins'
import { NthSelectable, NthSelectableMixin } from './mixins/nthSelectable'
import { Selectable } from './mixins/selectable'
import { Shouldable, ShouldableMixin } from './mixins/shouldable'
import { Thenable, ThenableMixin } from './mixins/thenable'
import { Urlable, UrlableMixin } from './mixins/urlable'
import { Visible, VisibleMixin } from './mixins/visible'
import { Waitable, WaitableMixin } from './mixins/waitable'

interface DropDownAccessorType
  extends Andable<DropDownAccessorType>,
    Blurable<DropDownAccessorType>,
    Clickable<DropDownAccessorType>,
    Selectable<DropDownAccessorType>,
    Disableable<DropDownAccessorType>,
    Containable<DropDownAccessorType>,
    Shouldable<DropDownAccessorType>,
    Visible<DropDownAccessorType>,
    NthSelectable<DropDownAccessorType>,
    Attributable<DropDownAccessorType>,
    Urlable<DropDownAccessorType>,
    Findable<DropDownAccessorType>,
    Waitable<DropDownAccessorType>,
    Existable<DropDownAccessorType>,
    Invokable<DropDownAccessorType>,
    Thenable<DropDownAccessorType>,
    Lengthable<DropDownAccessorType>,
    Eachable<DropDownAccessorType> {
  assertOptions(...options: string[]): DropDownAccessorType
}

export const DropDownClickableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  click: (options?: Partial<Cypress.ClickOptions>) => {
    cy.get(selector).click(options)
    return creator()
  },
})

export const DropDownSelectableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  select: (index: number) => {
    cy.get(selector).balSelectFindOptions().eq(index).click()
    return creator()
  },
  assertIsSelected: () => {
    throw new Error('Please use contains method')
  },
})

export function SiblingDropDownSelectableMixin(): Mixin {
  return <T>({ selector, creator }: MixinContext<T>) => ({
    select: (index: number) => {
      cy.get(selector).balSelectFindOptions().eq(index).click()
      return creator()
    },
    assertIsSelected: () => {
      throw new Error('Please use contains method')
    },
  })
}

export const DropDownAssertableOptionsMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  assertOptions: (...options: string[]) => {
    cy.get(selector).balSelectShouldHaveOptions(options, 'value')
    return creator()
  },
})

export function SiblingDropDownAssertableOptionsMixin(): Mixin {
  return <T>({ selector, creator }: MixinContext<T>) => ({
    assertOptions: (...options: string[]) => {
      cy.get(selector).balSelectShouldHaveOptions(options, 'value')
      return creator()
    },
  })
}

export const DropDownContainableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  contains: (content: string | number | RegExp) => {
    cy.get(selector).contains(content)
    return creator()
  },
})

export function SiblingDropDownContainableMixin(): Mixin {
  return <T>({ selector, creator }: MixinContext<T>) => ({
    contains: (content: string | number | RegExp) => {
      cy.get(selector).contains(content)
      return creator()
    },
  })
}

export const DropDownAccessor: Accessor<DropDownAccessorType> = createAccessor<DropDownAccessorType>(
  AndableMixin,
  BlurableMixin,
  DropDownClickableMixin,
  DropDownSelectableMixin,
  DropDownContainableMixin,
  DropDownAssertableOptionsMixin,
  DisableableMixin,
  ShouldableMixin,
  VisibleMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  FindableMixin,
  WaitableMixin,
  ExistableMixin,
  ThenableMixin,
  InvokableMixin,
  LengthableMixin,
  EachableMixin,
)
