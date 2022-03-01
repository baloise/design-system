/// <reference types="cypress" />

import { Andable, AndableMixin } from './mixins/andable'
import { Attributable, AttributableMixin } from './mixins/attributable'
import { Blurable, BlurableMixin } from './mixins/blurable'
import { Clickable } from './mixins/clickable'
import { Containable } from './mixins/containable'
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

interface AccordionTileAccessorType
  extends Andable<AccordionTileAccessorType>,
    Blurable<AccordionTileAccessorType>,
    Clickable<AccordionTileAccessorType>,
    Existable<AccordionTileAccessorType>,
    Visible<AccordionTileAccessorType>,
    Containable<AccordionTileAccessorType>,
    Shouldable<AccordionTileAccessorType>,
    NthSelectable<AccordionTileAccessorType>,
    Attributable<AccordionTileAccessorType>,
    Urlable<AccordionTileAccessorType>,
    Findable<AccordionTileAccessorType>,
    Waitable<AccordionTileAccessorType>,
    Invokable<AccordionTileAccessorType>,
    Thenable<AccordionTileAccessorType>,
    Lengthable<AccordionTileAccessorType>,
    Eachable<AccordionTileAccessorType> {
  assertBodyExists(): AccordionTileAccessorType

  assertBodyNotExists(): AccordionTileAccessorType

  clickBody(options?: Partial<Cypress.ClickOptions>): AccordionTileAccessorType
}

export const AccordionTileClickableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  clickBody: (options?: Partial<Cypress.ClickOptions>) => {
    element.find('.show-body-link-container.bal-divider-top').click(options)
    return creator()
  },
})
export const AccordionClickableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  click: (options?: Partial<Cypress.ClickOptions>) => {
    cy.get(selector).click(options)
    return creator()
  },
})
export const AccordionContainableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  contains: (content: string) => {
    cy.get(selector).contains(content)
    return creator()
  },
})
export const AccordionAssertableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  assertBodyExists: () => {
    cy.get(selector).balAccordionIsOpen()
    return creator()
  },
  assertBodyNotExists: () => {
    cy.get(selector).balAccordionIsClosed()
    return creator()
  },
})

export const AccordionAccessor: Accessor<AccordionTileAccessorType> = createAccessor<AccordionTileAccessorType>(
  AndableMixin,
  AccordionClickableMixin,
  AccordionAssertableMixin,
  AccordionContainableMixin,
  ExistableMixin,
  AccordionTileClickableMixin,
  BlurableMixin,
  VisibleMixin,
  ShouldableMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  FindableMixin,
  WaitableMixin,
  InvokableMixin,
  LengthableMixin,
  ThenableMixin,
  EachableMixin,
)
