/// <reference types="cypress" />
import {
  Accessor,
  createAccessor,
  Mixin,
  MixinContext,
  Clickable,
  Containable,
  Disableable,
  NthSelectable,
  Shouldable,
  Visible,
  Attributable,
  Urlable,
  Waitable,
  Selectable,
  Existable,
  ContainableMixin,
  ExistableMixin,
  ClickableMixin,
  ShouldableMixin,
  VisibleMixin,
  NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin, DisableableMixin,
} from '../index'

interface ListAccessorType
  extends Selectable<ListAccessorType>, Containable<ListAccessorType>, Existable<ListAccessorType>, Clickable<ListAccessorType>,
    Disableable<ListAccessorType>, Shouldable<ListAccessorType>, Visible<ListAccessorType>, NthSelectable<ListAccessorType>,
    Attributable<ListAccessorType>, Urlable<ListAccessorType>, Waitable<ListAccessorType> {
}

export const ListSelectableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Selects the element from the list
   */
  select: (index: number, options?: Partial<Cypress.ClickOptions>) => {
    const link = cy.get(selector).find('li').eq(index);
    link.click(options);
    return creator();
  }
});
// export const ListAssertableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
//   assertIsSelected: (number: string) => {
//     const link = cy.get(selector).find('.page-link');
//     link.should('contain', number);
//     return creator();
//   }
// });

export const ListAccessor: Accessor<ListAccessorType> =
  createAccessor<ListAccessorType>(ListSelectableMixin, ContainableMixin, ExistableMixin, ClickableMixin, DisableableMixin,
    ShouldableMixin, VisibleMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin);
