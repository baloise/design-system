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
  Waitable, Selectable
} from '../mixins'

interface DropdownAccessorType
  extends Clickable<DropdownAccessorType>, Selectable<DropdownAccessorType>, Disableable<DropdownAccessorType>, Containable<DropdownAccessorType>,
    Shouldable<DropdownAccessorType>, Visible<DropdownAccessorType>, NthSelectable<DropdownAccessorType>, Attributable<DropdownAccessorType>,
    Urlable<DropdownAccessorType>, Waitable<DropdownAccessorType> {
  assertOptions(...options: string[]): DropdownAccessorType;
}

export const DropdownClickableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
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
 * DropdownAccessor is a helper object for E-2-E testing.
 * It maps the dropdown behaviour to the `bal-dropdown` ui component.
 *
 * ```typescript
 * import { dataTestSelector, DropdownAccessor } from '@baloise/ui-library-testing'
 *
   * describe('Dropdown', () => {
 *   it('should ...', () => {
 *      const dropdown = DropdownAccessor(dataTestSelector('dropdown-id')).get()
 *      dropdown.click()
 *  })
 * })
 * ```
 */
export const DropdownAccessor: Accessor<DropdownAccessorType> =
  createAccessor<DropdownAccessorType>(
    DropdownClickableMixin,
  );
