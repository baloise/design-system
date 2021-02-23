/// <reference types="cypress" />
import { Attributable, AttributableMixin } from '../mixins/attributable'
import { Blurable, BlurableMixin } from '../mixins/blurable'
import { Clearable, ClearableMixin } from '../mixins/clearable'
import { Clickable, ClickableMixin } from '../mixins/clickable'
import { Containable, ContainableMixin } from '../mixins/containable'
import { Disableable, DisableableMixin } from '../mixins/disableable'
import { Existable, ExistableMixin } from '../mixins/existable'
import { Accessor, createAccessor, Mixin, MixinContext } from '../mixins/mixins'
import { NthSelectable, NthSelectableMixin } from '../mixins/nthSelectable'
import { Shouldable, ShouldableMixin } from '../mixins/shouldable'
import { Typeable, TypeableMixin } from '../mixins/typeable'
import { Urlable, UrlableMixin } from '../mixins/urlable'
import { Visible, VisibleMixin } from '../mixins/visible'
import { Waitable, WaitableMixin } from '../mixins/waitable'

interface InputAccessorType
  extends Clickable<InputAccessorType>,
    Typeable<InputAccessorType>,
    Blurable<InputAccessorType>,
    Clearable<InputAccessorType>,
    Visible<InputAccessorType>,
    Containable<InputAccessorType>,
    Existable<InputAccessorType>,
    Shouldable<InputAccessorType>,
    Disableable<InputAccessorType>,
    NthSelectable<InputAccessorType>,
    Attributable<InputAccessorType>,
    Urlable<InputAccessorType>,
    Waitable<InputAccessorType> {
  assertValue(value: any): InputAccessorType

  contains(content: string | number | RegExp): InputAccessorType

  assertError(name: string, error: string): InputAccessorType

  assertNoError(name: string): InputAccessorType
}

export const InputValueAssertableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Assert if the checkbox have value
   */
  assertValue: (value: any) => {
    cy.get(selector).should('have.value', value)
    return creator()
  },
})

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
export const InputAccessor: Accessor<InputAccessorType> = createAccessor<InputAccessorType>(
  ClickableMixin,
  TypeableMixin,
  BlurableMixin,
  ShouldableMixin,
  InputValueAssertableMixin,
  ClearableMixin,
  ContainableMixin,
  ExistableMixin,
  DisableableMixin,
  VisibleMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
)
