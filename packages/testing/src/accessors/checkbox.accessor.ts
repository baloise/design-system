/// <reference types="cypress" />
import {
  Accessor,
  createAccessor,
  Mixin,
  MixinContext,
  Checkable,
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
} from '../mixins'

interface CheckboxAccessorType
  extends Clickable<CheckboxAccessorType>,
    Disableable<CheckboxAccessorType>,
    Checkable<CheckboxAccessorType>,
    Containable<CheckboxAccessorType>,
    Existable<CheckboxAccessorType>,
    Visible<CheckboxAccessorType>,
    NthSelectable<CheckboxAccessorType>,
    Shouldable<CheckboxAccessorType> {}

export const CheckboxClickableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Clicks the checkbox and set checked to true
   */
  click: (options?: Partial<Cypress.ClickOptions>) => {
    const checkbox = element.find('label')
    checkbox.click(options)
    return creator()
  },
  /**
   * Clicks the checkbox and set checked to true
   */
  check: (options?: Partial<Cypress.CheckOptions>) => {
    const checkbox = element.find('label' + name)
    checkbox.click(options)
    return creator()
  },
  /**
   * Assert if the checkbox is checked
   */
  assertIsChecked: (shouldBeChecked: boolean = true) => {
    const checkbox = element.find('input')
    checkbox.should('have.attr', 'aria-checked', `${shouldBeChecked}`)
    return creator()
  },
  /**
   * Assert if the checkbox is disabled
   */
  assertIsDisabled: () => {
    const checkbox = element.find('input')
    checkbox.should('have.attr', 'aria-disabled', `true`)
    return creator()
  },
  /**
   * Assert if the checkbox is enabled and not disabled
   */
  assertIsEnabled: () => {
    const checkbox = element.find('input')
    checkbox.should('have.attr', 'aria-disabled', `false`)
    return creator()
  },
})

export const CheckboxContainableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Check the content of the label element
   */
  contains: (content: string) => {
    const item = element.find('label bal-text')
    item.contains(content)
    return creator()
  },
})

/**
 * CheckboxAccessor is a helper object for E-2-E testing.
 * It maps the checkbox behaviour to the `bal-checkbox` ui component.
 *
 * ```typescript
 * import { dataTestSelector, CheckboxAccessor } from '@baloise/ui-library-testing'
 *
 * describe('Checkbox', () => {
 *   it('should ...', () => {
 *      const checkbox = CheckboxAccessor(dataTestSelector('checkbox-id')).get()
 *      checkbox.click()
 *      checkbox.assertIsChecked()
 *      checkbox.contains('Label')
 *  })
 * })
 * ```
 */
export const CheckboxAccessor: Accessor<CheckboxAccessorType> = createAccessor<CheckboxAccessorType>(
  CheckboxClickableMixin,
  CheckboxContainableMixin,
  ExistableMixin,
  VisibleMixin,
  NthSelectableMixin,
  ShouldableMixin,
)
