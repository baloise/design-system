/// <reference types="cypress" />

import {
  Accessor,
  Attributable,
  AttributableMixin,
  Checkable, CheckableMixin,
  Clickable, ClickableMixin,
  Containable, ContainableMixin, createAccessor,
  Disableable, DisableableMixin, Existable, ExistableMixin, Mixin, MixinContext,
  NthSelectable, NthSelectableMixin, Selectable,
  Shouldable, ShouldableMixin,
  Urlable, UrlableMixin,
  Visible, VisibleMixin,
  Waitable, WaitableMixin,
} from '../mixins'

interface RadioAccessorType
  extends Checkable<RadioAccessorType>, Containable<RadioAccessorType>, Clickable<RadioAccessorType>, Existable<RadioAccessorType>,
    Disableable<RadioAccessorType>, Shouldable<RadioAccessorType>, Visible<RadioAccessorType>, NthSelectable<RadioAccessorType>,
    Attributable<RadioAccessorType>, Urlable<RadioAccessorType>, Waitable<RadioAccessorType>, Selectable<RadioAccessorType> {
}


export const SelectButtonSelectableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Selects option
   */
  select: (indexes: number | number[]) => {
    if (typeof indexes === 'number') {
      indexes = [indexes];
    }
    cy.get(selector).within(() => {
      (indexes as number[]).forEach((index: number) =>
        cy.get(`bal-radio.bal-select-button`).eq(index).click());
    });

    return creator();
  },
  // FINISH !!!
  // assertIsSelected: (indexes: number | number[]) => {
  //   if (typeof indexes === 'number') {
  //     indexes = [indexes];
  //   }
  //   cy.get(selector).within(() => {
  //     (indexes as number[]).forEach((index: number) =>
  //       cy.get(`bal-radio.bal-select-button`).eq(index).should('have.class', 'bal-active'));
  //   });
  //   return creator();
  // }
});

/**
 * RadioAccessor is a helper object for E-2-E testing.
 * It maps the radio behaviour to the `bal-radio` ui component.
 *
 * ```typescript
 * import { dataTestSelector, RadioAccessor } from '@baloise/ui-library-testing'
 *
 * describe('Radio', () => {
 *   it('should ...', () => {
 *      const radio = RadioAccessor(dataTestSelector('radio-id')).get()
 *      radio.select(1)
 *  })
 * })
 * ```
 */
export const RadioAccessor: Accessor<RadioAccessorType> =
  createAccessor<RadioAccessorType>(CheckableMixin, ClickableMixin, ContainableMixin, ExistableMixin, DisableableMixin, ShouldableMixin,
    VisibleMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin, SelectButtonSelectableMixin);
