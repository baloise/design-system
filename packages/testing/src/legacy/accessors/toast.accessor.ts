/// <reference types="cypress" />

import { Attributable, AttributableMixin } from '../mixins/attributable'
import { Clickable, ClickableMixin } from '../mixins/clickable'
import { Containable, ContainableMixin } from '../mixins/containable'
import { Disableable, DisableableMixin } from '../mixins/disableable'
import { Existable, ExistableMixin } from '../mixins/existable'
import { Accessor, createAccessor, Mixin, MixinContext } from '../mixins/mixins'
import { NthSelectable, NthSelectableMixin } from '../mixins/nthSelectable'
import { Shouldable, ShouldableMixin } from '../mixins/shouldable'
import { Urlable, UrlableMixin } from '../mixins/urlable'
import { Visible, VisibleMixin } from '../mixins/visible'
import { Waitable, WaitableMixin } from '../mixins/waitable'

interface ToastAccessorType
  extends Clickable<ToastAccessorType>,
    Containable<ToastAccessorType>,
    Existable<ToastAccessorType>,
    Shouldable<ToastAccessorType>,
    Disableable<ToastAccessorType>,
    Visible<ToastAccessorType>,
    NthSelectable<ToastAccessorType>,
    Attributable<ToastAccessorType>,
    Urlable<ToastAccessorType>,
    Waitable<ToastAccessorType> {
  assertToast(content: string): ToastAccessorType
}

export const SuccessToastableMixin: Mixin = <T>({ creator }: MixinContext<T>) => ({
  /**
   * Assert if the toast have content
   */
  assertToast: (content: string) => {
    const item = cy.get('.toast-message')
    item.contains(content)
    return creator()
  },
})

/**
 * ToastAccessor is a helper object for E-2-E testing.
 * It maps the toast behaviour to the `bal-toast` ui component.
 *
 * ```typescript
 * import { dataTestSelector, ToastAccessor } from '@baloise/design-system-components-testing'
 *
 * describe('Toast', () => {
 *   it('should ...', () => {
 *      const toast = ToastAccessor(dataTestSelector('toast-id')).get()
 *      toast.click()
 *  })
 * })
 * ```
 */
export const ToastAccessor: Accessor<ToastAccessorType> = createAccessor<ToastAccessorType>(
  SuccessToastableMixin,
  ContainableMixin,
  ClickableMixin,
  VisibleMixin,
  ExistableMixin,
  DisableableMixin,
  ShouldableMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
)
