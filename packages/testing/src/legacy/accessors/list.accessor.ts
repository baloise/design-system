/// <reference types="cypress" />

import { Andable, AndableMixin } from './mixins/andable'
import { Attributable, AttributableMixin } from './mixins/attributable'
import { Clickable, ClickableMixin } from './mixins/clickable'
import { Containable, ContainableMixin } from './mixins/containable'
import { Disableable, DisableableMixin } from './mixins/disableable'
import { EachableMixin } from './mixins/eachable'
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

interface ListAccessorType
  extends Andable<ListAccessorType>,
    Selectable<ListAccessorType>,
    Containable<ListAccessorType>,
    Existable<ListAccessorType>,
    Clickable<ListAccessorType>,
    Disableable<ListAccessorType>,
    Shouldable<ListAccessorType>,
    Visible<ListAccessorType>,
    NthSelectable<ListAccessorType>,
    Attributable<ListAccessorType>,
    Urlable<ListAccessorType>,
    Findable<ListAccessorType>,
    Waitable<ListAccessorType>,
    Invokable<ListAccessorType>,
    Thenable<ListAccessorType>,
    Lengthable<ListAccessorType>,
    Lengthable<ListAccessorType> {}

export const ListSelectableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  select: (index: number, options?: Partial<Cypress.ClickOptions>) => {
    element.balPaginationFindPages().eq(index).click(options)
    return creator()
  },
})
export const ListAssertableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  assertIsSelected: (number: string) => {
    element.balPaginationFindCurrentPage().contains(number)
    return creator()
  },
})

export const ListAccessor: Accessor<ListAccessorType> = createAccessor<ListAccessorType>(
  AndableMixin,
  ListSelectableMixin,
  ListAssertableMixin,
  ContainableMixin,
  ExistableMixin,
  ClickableMixin,
  DisableableMixin,
  ShouldableMixin,
  VisibleMixin,
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
