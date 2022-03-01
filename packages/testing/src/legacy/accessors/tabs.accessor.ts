/// <reference types="cypress" />

import { Andable, AndableMixin } from './mixins/andable'
import { Attributable, AttributableMixin } from './mixins/attributable'
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
import { Waitable, WaitableMixin } from './mixins/waitable'

interface TabsAccessorType
  extends Andable<TabsAccessorType>,
    Selectable<TabsAccessorType>,
    Containable<TabsAccessorType>,
    Clickable<TabsAccessorType>,
    Existable<TabsAccessorType>,
    Shouldable<TabsAccessorType>,
    Disableable<TabsAccessorType>,
    NthSelectable<TabsAccessorType>,
    Attributable<TabsAccessorType>,
    Urlable<TabsAccessorType>,
    Findable<TabsAccessorType>,
    Waitable<TabsAccessorType>,
    Invokable<TabsAccessorType>,
    Thenable<TabsAccessorType>,
    Lengthable<TabsAccessorType>,
    Eachable<TabsAccessorType> {
  assertVisible(text: string): TabsAccessorType
  select(index: number, options?: Partial<Cypress.ClickOptions>): TabsAccessorType
  assertIsSelected(label: string): TabsAccessorType
}

export const TabsAssertVisibleMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  assertVisible: (text: string) => {
    const field = element.find(`[data-label="${text}"]`)
    field.should('be.visible')
    return creator()
  },
  select: (index: number, options?: Partial<Cypress.ClickOptions>) => {
    element.balTabsFindItems().eq(index).click(options)
    return creator()
  },
  assertIsSelected: (label: string) => {
    element.should('have.value', label)
    return creator()
  },
})

export const TabsAccessor: Accessor<TabsAccessorType> = createAccessor<TabsAccessorType>(
  AndableMixin,
  TabsAssertVisibleMixin,
  ClickableMixin,
  ContainableMixin,
  ExistableMixin,
  ShouldableMixin,
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
