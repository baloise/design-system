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

interface DropDownAccessorType
  extends Clickable<DropDownAccessorType>, Selectable<DropDownAccessorType>, Disableable<DropDownAccessorType>, Containable<DropDownAccessorType>,
    Shouldable<DropDownAccessorType>, Visible<DropDownAccessorType>, NthSelectable<DropDownAccessorType>, Attributable<DropDownAccessorType>,
    Urlable<DropDownAccessorType>, Waitable<DropDownAccessorType> {
  assertOptions(...options: string[]): DropDownAccessorType;
}

export const DropDownClickableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Clicks the dropdown
   */
  click: (options?: Partial<Cypress.ClickOptions>) => {
    const button = cy.get(selector).find('button');
    button.click(options);
    return creator();
  }
});

/**
 * DropDownAccessor is a helper object for E-2-E testing.
 * It maps the dropdown behaviour to the `bal-dropdown` ui component.
 *
 * ```typescript
 * import { dataTestSelector, DropDownAccessor } from '@baloise/ui-library-testing'
 *
   * describe('DropDown', () => {
 *   it('should ...', () => {
 *      const dropdown = DropDownAccessor(dataTestSelector('dropdown-id')).get()
 *      dropdown.click()
 *      dropdown.assertBodyExists()
 *      dropdown.contains('Label')
 *  })
 * })
 * ```
 */
export const DropDownAccessor: Accessor<DropDownAccessorType> =
  createAccessor<DropDownAccessorType>(
    DropDownClickableMixin
  );
