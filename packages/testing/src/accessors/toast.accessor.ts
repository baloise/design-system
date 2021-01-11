/// <reference types="cypress" />

import {
  Accessor,
  Attributable,
  AttributableMixin,
  Clickable, ClickableMixin,
  Containable, ContainableMixin, createAccessor,
  Disableable, DisableableMixin, Existable, ExistableMixin, Mixin, MixinContext,
  NthSelectable, NthSelectableMixin,
  Shouldable, ShouldableMixin,
  Urlable, UrlableMixin, Visible, VisibleMixin,
  Waitable, WaitableMixin,
} from '../index'

interface ToastAccessorType
  extends Clickable<ToastAccessorType>, Containable<ToastAccessorType>, Existable<ToastAccessorType>, Shouldable<ToastAccessorType>,
    Disableable<ToastAccessorType>, Visible<ToastAccessorType>, NthSelectable<ToastAccessorType>, Attributable<ToastAccessorType>,
    Urlable<ToastAccessorType>, Waitable<ToastAccessorType> {
  assertToast(content: string): ToastAccessorType;
}

export const SuccessToastableMixin: Mixin = <T>({creator}: MixinContext<T>) => ({
  /**
   * Assert if the toast have content
   */
  assertToast: (content: string) => {
    const item = cy.get('.toast-message');
    item.contains(content);
    return creator();
  }
});

/**
 * ToastAccessor is a helper object for E-2-E testing.
 * It maps the toast behaviour to the `bal-toast` ui component.
 *
 * ```typescript
 * import { dataTestSelector, ToastAccessor } from '@baloise/ui-library-testing'
 *
 * describe('Toast', () => {
 *   it('should ...', () => {
 *      const toast = ToastAccessor(dataTestSelector('toast-id')).get()
 *      toast.click()
 *  })
 * })
 * ```
 */
export const ToastAccessor: Accessor<ToastAccessorType> = createAccessor<ToastAccessorType>(SuccessToastableMixin, ContainableMixin, ClickableMixin,
  VisibleMixin, ExistableMixin, DisableableMixin, ShouldableMixin, NthSelectableMixin, AttributableMixin, UrlableMixin, WaitableMixin);
