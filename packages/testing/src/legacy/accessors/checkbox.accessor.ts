/// <reference types="cypress" />

import { Andable, AndableMixin } from './mixins/andable'
import { Attributable, AttributableMixin } from './mixins/attributable'
import { Blurable, BlurableMixin } from './mixins/blurable'
import { Checkable } from './mixins/checkable'
import { Clickable } from './mixins/clickable'
import { Containable } from './mixins/containable'
import { Disableable } from './mixins/disableable'
import { Eachable, EachableMixin } from './mixins/eachable'
import { Existable, ExistableMixin } from './mixins/existable'
import { Findable, FindableMixin } from './mixins/findable'
import { Invokable, InvokableMixin } from './mixins/invokable'
import { Lengthable, LengthableMixin } from './mixins/lengthable'
import { Accessor, createAccessor, Mixin, MixinContext } from './mixins/mixins'
import { NthSelectable, NthSelectableMixin } from './mixins/nthSelectable'
import { Shouldable, ShouldableMixin } from './mixins/shouldable'
import { Thenable, ThenableMixin } from './mixins/thenable'
import { Urlable, UrlableMixin } from './mixins/urlable'
import { Visible, VisibleMixin } from './mixins/visible'
import { Waitable, WaitableMixin } from './mixins/waitable'

interface CheckboxAccessorType
  extends Andable<CheckboxAccessorType>,
    Blurable<CheckboxAccessorType>,
    Clickable<CheckboxAccessorType>,
    Disableable<CheckboxAccessorType>,
    Checkable<CheckboxAccessorType>,
    Containable<CheckboxAccessorType>,
    Existable<CheckboxAccessorType>,
    Visible<CheckboxAccessorType>,
    NthSelectable<CheckboxAccessorType>,
    Shouldable<CheckboxAccessorType>,
    Attributable<CheckboxAccessorType>,
    Urlable<CheckboxAccessorType>,
    Findable<CheckboxAccessorType>,
    Waitable<CheckboxAccessorType>,
    Invokable<CheckboxAccessorType>,
    Thenable<CheckboxAccessorType>,
    Lengthable<CheckboxAccessorType>,
    Eachable<CheckboxAccessorType> {}

export const CheckboxClickableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  click: (options?: Partial<Cypress.ClickOptions>) => {
    cy.get(selector).click(options)
    return creator()
  },

  check: (options?: Partial<Cypress.CheckOptions>) => {
    cy.get(selector).check(options)
    return creator()
  },

  assertIsChecked: (shouldBeChecked = true) => {
    if (shouldBeChecked) {
      cy.get(selector).should('be.checked')
    } else {
      cy.get(selector).should('not.be.checked')
    }
    return creator()
  },

  assertIsDisabled: () => {
    cy.get(selector).should('be.disabled')
    return creator()
  },

  assertIsEnabled: () => {
    cy.get(selector).should('not.be.disabled')
    return creator()
  },
})
export const CheckboxContainableMixin: Mixin = <T>({ creator, selector }: MixinContext<T>) => ({
  contains: (content: string) => {
    cy.get(selector).contains(content)
    return creator()
  },
})

export const CheckboxAccessor: Accessor<CheckboxAccessorType> = createAccessor<CheckboxAccessorType>(
  AndableMixin,
  CheckboxClickableMixin,
  CheckboxContainableMixin,
  ExistableMixin,
  VisibleMixin,
  NthSelectableMixin,
  BlurableMixin,
  ShouldableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
  FindableMixin,
  InvokableMixin,
  ThenableMixin,
  LengthableMixin,
  EachableMixin,
)
