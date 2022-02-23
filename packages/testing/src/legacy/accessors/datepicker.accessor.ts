/// <reference types="cypress" />

import { format } from '@baloise/web-app-utils'
import { Accessor, createAccessor, Mixin, MixinContext } from '../mixins/mixins'

export interface DatepickerAccessorType {
  write(date: string): DatepickerAccessorType
  pick(date: Date): DatepickerAccessorType
  open(): DatepickerAccessorType
  shouldHaveValue(date: Date): DatepickerAccessorType
  errorCheck(name: string, error: string): void
  noErrorCheck(name: string): void
  assertDateInRange(date: Date, shouldBeInRange?: boolean): DatepickerAccessorType
}

export const DatepickerWriteMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Write in the datepicker
   */
  write: (date: string) => {
    cy.get(selector).type(date).blur()
    return creator()
  },
})

export const DatepickerOpenableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Open the datepicker
   */
  open: () => {
    cy.get(selector).balDatepickerToggle()
    return creator()
  },
})

export const DatepickerPickableMixin: Mixin = <T>({ creator, selector }: MixinContext<T>) => ({
  /**
   * Pick the date
   */
  pick: (date: Date) => {
    if (cy.get(selector).balDatepickerIsClosed()) {
      cy.get(selector).balDatepickerToggle()
    }
    cy.get(selector).balDatepickerPick(date)
    return creator()
  },
})

export const DatepickerShouldHaveValueAssertableMixin: Mixin = ({ selector, creator }) => ({
  /**
   * Check if datepicker have value
   */
  shouldHaveValue: (date: Date, locale = 'de-CH') => {
    cy.get(selector).should('have.value', format(locale, date))
    return creator()
  },
})

export const DatepickerMinMaxRangeAssertableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Assert if the date is in range
   */
  assertDateInRange: (date: Date, shouldBeInRange = true) => {
    if (shouldBeInRange) {
      cy.get(selector).balDatepickerIsDateInRange(date)
    } else {
      cy.get(selector).balDatepickerIsDateNotInRange(date)
    }
    return creator()
  },
})

/**
 * DatepickerAccessor is a helper object for E-2-E testing.
 * It maps the datepicker behaviour to the `bal-datepicker` ui component.
 *
 * ```typescript
 * import { dataTestSelector, DatepickerAccessor } from '@baloise/design-system-components-testing'
 *
 * describe('Datepicker', () => {
 *   it('should ...', () => {
 *      const datepicker = DatepickerAccessor(dataTestSelector('datepicker-id')).get()
 *      datepicker.open()
 *      datepicker.pick(new Date())
 *      datepicker.shouldHaveValue(new Date())
 *  })
 * })
 * ```
 */
export const DatepickerAccessor: Accessor<DatepickerAccessorType> = createAccessor<DatepickerAccessorType>(
  DatepickerOpenableMixin,
  DatepickerPickableMixin,
  DatepickerShouldHaveValueAssertableMixin,
  DatepickerWriteMixin,
  DatepickerMinMaxRangeAssertableMixin,
)
