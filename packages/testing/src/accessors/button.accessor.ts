/// <reference types="cypress" />
import {
  Accessor,
  createAccessor,
  Clickable,
  Containable,
  Disableable,
  Existable,
  ExistableMixin,
  NthSelectable,
  NthSelectableMixin,
  Shouldable,
  ShouldableMixin,
  Visible,
  VisibleMixin,
  ContainableMixin,
  ClickableMixin,
  DisableableMixin,
  Attributable,
  Urlable,
  Waitable,
  AttributableMixin, UrlableMixin, WaitableMixin, Mixin, MixinContext,
} from '../mixins'

interface ButtonAccessorType
  extends Clickable<ButtonAccessorType>,
          Existable<ButtonAccessorType>,
          Shouldable<ButtonAccessorType>,
          Containable<ButtonAccessorType>,
          Disableable<ButtonAccessorType>,
          Visible<ButtonAccessorType>,
          NthSelectable<ButtonAccessorType>,
          Attributable<ButtonAccessorType>,
          Urlable<ButtonAccessorType>,
          Waitable<ButtonAccessorType>{}

export const ButtonContainableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Check the content of the label element
   */
  contains: (content: string) => {
    cy.get(selector).find('bal-text').contains(content)
    return creator()
  },
})

/**
 * ButtonAccessor is a helper object for E-2-E testing.
 * It maps the button behaviour to the `bal-button` ui component.
 *
 * ```typescript
 * import { dataTestSelector, ButtonAccessor } from '@baloise/ui-library-testing'
 *
 * describe('Button', () => {
 *   it('should ...', () => {
 *      const button = ButtonAccessor(dataTestSelector('button-id')).get()
 *      button.click()
 *      button.assertIsChecked()
 *      button.contains('Label')
 *  })
 * })
 * ```
 */
export const ButtonAccessor: Accessor<ButtonAccessorType> = createAccessor<ButtonAccessorType>(
  ClickableMixin,
  ExistableMixin,
  ShouldableMixin,
  ContainableMixin,
  DisableableMixin,
  VisibleMixin,
  NthSelectableMixin,
  AttributableMixin,
  UrlableMixin,
  WaitableMixin,
  ButtonContainableMixin
)
