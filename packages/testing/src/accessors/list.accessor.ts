/// <reference types="cypress" />

import {Attributable, AttributableMixin} from '../mixins/attributable'
import {Clickable, ClickableMixin} from '../mixins/clickable'
import {Containable, ContainableMixin} from '../mixins/containable'
import {Disableable, DisableableMixin} from '../mixins/disableable'
import {Existable, ExistableMixin} from '../mixins/existable'
import {Accessor, createAccessor, Mixin, MixinContext} from '../mixins/mixins'
import {NthSelectable, NthSelectableMixin} from '../mixins/nthSelectable'
import {Selectable} from '../mixins/selectable'
import {Shouldable, ShouldableMixin} from '../mixins/shouldable'
import {Urlable, UrlableMixin} from '../mixins/urlable'
import {Visible, VisibleMixin} from '../mixins/visible'
import {Waitable, WaitableMixin} from '../mixins/waitable'

interface ListAccessorType
  extends Selectable<ListAccessorType>,
    Containable<ListAccessorType>,
    Existable<ListAccessorType>,
    Clickable<ListAccessorType>,
    Disableable<ListAccessorType>,
    Shouldable<ListAccessorType>,
    Visible<ListAccessorType>,
    NthSelectable<ListAccessorType>,
    Attributable<ListAccessorType>,
    Urlable<ListAccessorType>,
    Waitable<ListAccessorType> {
}

export const ListSelectableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Selects the element from the list
   */
  select: (index: number, options?: Partial<Cypress.ClickOptions>) => {
    const link = cy.get(selector).find('li').eq(index)
    link.click(options)
    return creator()
  },
})

export const ListAccessor: Accessor<ListAccessorType> = createAccessor<ListAccessorType>(
  ListSelectableMixin,
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
)
