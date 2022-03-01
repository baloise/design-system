/// <reference types="cypress" />

import { Andable, AndableMixin } from './mixins/andable'
import { Attributable, AttributableMixin } from './mixins/attributable'
import { Blurable, BlurableMixin } from './mixins/blurable'
import { Clickable, ClickableMixin } from './mixins/clickable'
import { Containable, ContainableMixin } from './mixins/containable'
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

interface SelectButtonAccessorType
  extends Andable<SelectButtonAccessorType>,
    Blurable<SelectButtonAccessorType>,
    Selectable<SelectButtonAccessorType>,
    Containable<SelectButtonAccessorType>,
    Clickable<SelectButtonAccessorType>,
    Existable<SelectButtonAccessorType>,
    Shouldable<SelectButtonAccessorType>,
    Visible<SelectButtonAccessorType>,
    Disableable<SelectButtonAccessorType>,
    NthSelectable<SelectButtonAccessorType>,
    Attributable<SelectButtonAccessorType>,
    Urlable<SelectButtonAccessorType>,
    Findable<SelectButtonAccessorType>,
    Waitable<SelectButtonAccessorType>,
    Invokable<SelectButtonAccessorType>,
    Thenable<SelectButtonAccessorType>,
    Lengthable<SelectButtonAccessorType>,
    Eachable<SelectButtonAccessorType> {}

export const SelectButtonSelectableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  select: (indexes: number | number[]) => {
    if (typeof indexes === 'number') {
      indexes = [indexes]
    }
    cy.get(selector).within(() => {
      ;(indexes as number[]).forEach((index: number) => cy.get(`bal-radio`).eq(index).check())
    })
    return creator()
  },

  assertIsSelected: (indexes: number | number[]) => {
    if (typeof indexes === 'number') {
      indexes = [indexes]
    }
    cy.get(selector).within(() => {
      ;(indexes as number[]).forEach((index: number) => cy.get(`bal-radio`).eq(index).should('be.checked'))
    })
    return creator()
  },
})

export const SelectButtonAccessor: Accessor<SelectButtonAccessorType> = createAccessor<SelectButtonAccessorType>(
  AndableMixin,
  BlurableMixin,
  SelectButtonSelectableMixin,
  ContainableMixin,
  ClickableMixin,
  ExistableMixin,
  ShouldableMixin,
  VisibleMixin,
  DisableableMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
  FindableMixin,
  InvokableMixin,
  ThenableMixin,
  LengthableMixin,
  EachableMixin,
)
