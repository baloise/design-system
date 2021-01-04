/// <reference types="cypress" />

import {
  Accessor,
  Attributable,
  AttributableMixin,
  Clickable, ClickableMixin,
  Containable, ContainableMixin, createAccessor,
  Disableable, DisableableMixin, Existable, ExistableMixin, Mixin, MixinContext,
  NthSelectable, NthSelectableMixin, Selectable,
  Shouldable, ShouldableMixin,
  Urlable, UrlableMixin,
  Waitable, WaitableMixin,
} from '../mixins'
import { ListSelectableMixin } from './list.accessor'

interface TabsAccessorType
  extends Selectable<TabsAccessorType>, Containable<TabsAccessorType>, Clickable<TabsAccessorType>, Existable<TabsAccessorType>, Shouldable<TabsAccessorType>,
    Disableable<TabsAccessorType>, NthSelectable<TabsAccessorType>, Attributable<TabsAccessorType>, Urlable<TabsAccessorType>,
    Waitable<TabsAccessorType> {
  assertVisible(text: string): TabsAccessorType;
}

export const TabsAssertVisibleMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Assert if tab is visible
   */
  assertVisible: (text: string) => {
    const field = cy.get(selector).find(`[label="${text}"] .sc-bal-tab-item`);
    field.should('be.visible');
    return creator();
  },
  /**
   * Selects tab
   */
  select: (index: number) => {
    cy.get(selector).within(() => {
      cy.get(`a.sc-bal-tabs`).eq(index).click();
    });
    return creator();
  },
});

/**
 * TabsAccessor is a helper object for E-2-E testing.
 * It maps the tabs behaviour to the `bal-tabs` ui component.
 *
 * ```typescript
 * import { dataTestSelector, TabsAccessor } from '@baloise/ui-library-testing'
 *
 * describe('Tabs', () => {
 *   it('should ...', () => {
 *      const tabs = TabsAccessor(dataTestSelector('tabs-id')).get()
 *      tabs.select()
 *      tabs.assertVisible('value')
 *  })
 * })
 * ```
 */
export const TabsAccessor: Accessor<TabsAccessorType> =
  createAccessor<TabsAccessorType>(ClickableMixin, ContainableMixin, ExistableMixin, ShouldableMixin,
    DisableableMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin, ListSelectableMixin, TabsAssertVisibleMixin);
