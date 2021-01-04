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
  Waitable, Selectable,
} from '../mixins'

interface SelectAccessorType
  extends Clickable<SelectAccessorType>, Selectable<SelectAccessorType>, Disableable<SelectAccessorType>, Containable<SelectAccessorType>,
    Shouldable<SelectAccessorType>, Visible<SelectAccessorType>, NthSelectable<SelectAccessorType>, Attributable<SelectAccessorType>,
    Urlable<SelectAccessorType>, Waitable<SelectAccessorType> {
  assertOptions(...options: string[]): SelectAccessorType;
}

export const SelectClickableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Clicks the input
   */
  click: (options?: Partial<Cypress.ClickOptions>) => {
    const button = cy.get(selector).find('.dropdown-trigger .input');
    button.click(options);
    return creator();
  }
});

export const SelectSelectableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Selects dropdown item
   */
  select: (index: number) => {
    cy.get(selector).within(() => {
      cy.get(`button.dropdown-item`).eq(index).click();
    });
    return creator();
  },
  assertIsSelected: () => {
    throw new Error('Please use contains method');
  }
});

export const SelectAssertableOptionsMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Checks the options
   */
  assertOptions: (...options: string[]) => {
    cy.get(selector).within(() => {
      cy.get('bal-select-option').then(opt => {
        const actual = [...opt.toArray()].map(o => o.value);
        expect(actual).to.deep.eq(options);
      });
    });
    return creator();
  }
});

export const SelectContainableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Checks if input have a content
   */
  contains: (content: string | number | RegExp) => {
    cy.get(selector).find('.dropdown-trigger .input').should('have.value', content);
    return creator();
  }
});

/**
 * SelectAccessor is a helper object for E-2-E testing.
 * It maps the select behaviour to the `bal-select` ui component.
 *
 * ```typescript
 * import { dataTestSelector, SelectAccessor } from '@baloise/ui-library-testing'
 *
   * describe('Select', () => {
 *   it('should ...', () => {
 *      const select = SelectAccessor(dataTestSelector('select-id')).get()
 *      select.click()
 *      select.select(1)
 *      select.contains('value')
 *  })
 * })
 * ```
 */
export const SelectAccessor: Accessor<SelectAccessorType> =
  createAccessor<SelectAccessorType>(
    SelectClickableMixin,
    SelectSelectableMixin,
    SelectAssertableOptionsMixin,
    SelectContainableMixin
  );
