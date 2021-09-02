/// <reference types="cypress" />

import { Attributable, AttributableMixin } from '../mixins/attributable'
import { Clickable, ClickableMixin } from '../mixins/clickable'
import { Containable, ContainableMixin } from '../mixins/containable'
import { Disableable, DisableableMixin } from '../mixins/disableable'
import { Existable, ExistableMixin } from '../mixins/existable'
import { Accessor, createAccessor, Mixin, MixinContext } from '../mixins/mixins'
import { NthSelectable, NthSelectableMixin } from '../mixins/nthSelectable'
import { Selectable } from '../mixins/selectable'
import { Shouldable, ShouldableMixin } from '../mixins/shouldable'
import { Urlable, UrlableMixin } from '../mixins/urlable'
import { Waitable, WaitableMixin } from '../mixins/waitable'
import { ListSelectableMixin } from './list.accessor'

interface TabsAccessorType
  extends Selectable<TabsAccessorType>,
    Containable<TabsAccessorType>,
    Clickable<TabsAccessorType>,
    Existable<TabsAccessorType>,
    Shouldable<TabsAccessorType>,
    Disableable<TabsAccessorType>,
    NthSelectable<TabsAccessorType>,
    Attributable<TabsAccessorType>,
    Urlable<TabsAccessorType>,
    Waitable<TabsAccessorType> {
  assertVisible(text: string): TabsAccessorType
}

export const TabsAssertVisibleMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Assert if tab is visible
   */
  assertVisible: (text: string) => {
    const field = element().find(`[label="${text}"] .sc-bal-tab-item`)
    field.should('be.visible')
    return creator()
  },
  /**
   * Selects tab
   */
  select: (index: number) => {
    element().within(() => {
      cy.get(`a.sc-bal-tabs:not(.hidden)`).eq(index).click()
    })
    return creator()
  },
})

/**
 * TabsAccessor is a helper object for E-2-E testing.
 * It maps the tabs behaviour to the `bal-tabs` ui component.
 *
 * ```typescript
 * import { dataTestSelector, TabsAccessor } from '@baloise/design-system-components-testing'
 *
 * describe('Tabs', () => {
 *   it('should ...', () => {
 *      const tabs = TabsAccessor(dataTestSelector('tabs-id')).get()
 *      tabs.select(1)
 *      tabs.assertVisible('value')
 *  })
 * })
 * ```
 */
export const TabsAccessor: Accessor<TabsAccessorType> = createAccessor<TabsAccessorType>(
  ClickableMixin,
  ContainableMixin,
  ExistableMixin,
  ShouldableMixin,
  DisableableMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
  ListSelectableMixin,
  TabsAssertVisibleMixin,
)
