/// <reference types="cypress" />
import {
  Accessor,
  Attributable, AttributableMixin,
  Blurable, BlurableMixin, Clearable, ClearableMixin,
  Clickable, ClickableMixin,
  Containable, ContainableMixin, createAccessor,
  Disableable, DisableableMixin,
  Existable, ExistableMixin, Mixin, MixinContext,
  NthSelectable, NthSelectableMixin,
  Shouldable, ShouldableMixin,
  Typeable, TypeableMixin, Urlable, UrlableMixin, Visible, VisibleMixin, Waitable, WaitableMixin,
} from '../mixins'

interface InputAccessorType
  extends Clickable<InputAccessorType>, Typeable<InputAccessorType>, Blurable<InputAccessorType>, Clearable<InputAccessorType>, Visible<InputAccessorType>,
    Containable<InputAccessorType>, Existable<InputAccessorType>, Shouldable<InputAccessorType>, Disableable<InputAccessorType>,
    NthSelectable<InputAccessorType>, Attributable<InputAccessorType>, Urlable<InputAccessorType>, Waitable<InputAccessorType> {
  assertValue(value: any): InputAccessorType;

  contains(content: string | number | RegExp): InputAccessorType;

  assertError(name: string, error: string): InputAccessorType;

  assertNoError(name: string): InputAccessorType;
}

export const InputValueAssertableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Assert if the checkbox have value
   */
  assertValue: (value: any) => {
    cy.get(selector).should('have.value', value);
    return creator();
  }
});

/**
 * InputAccessor is a helper object for E-2-E testing.
 * It maps the input behaviour to the `bal-input` ui component.
 *
 * ```typescript
 * import { dataTestSelector, InputAccessor } from '@baloise/ui-library-testing'
 *
 * describe('Input', () => {
 *   it('should ...', () => {
 *      const input = InputAccessor(dataTestSelector('input-id')).get()
 *      input.assertValue('value)
 *  })
 * })
 * ```
 */
export const InputAccessor: Accessor<InputAccessorType> =
  createAccessor<InputAccessorType>(ClickableMixin, TypeableMixin, BlurableMixin, ShouldableMixin, InputValueAssertableMixin, ClearableMixin,
    ContainableMixin, ExistableMixin, DisableableMixin, VisibleMixin, NthSelectableMixin, AttributableMixin, UrlableMixin,
    WaitableMixin);
