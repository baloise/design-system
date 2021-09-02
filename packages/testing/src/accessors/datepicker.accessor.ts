/// <reference types="cypress" />

import { format, newDateString } from '@baloise/design-system-components'
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

const selectorDayBox = (date: Date) =>
  `[data-date="${newDateString(date.getFullYear(), date.getMonth() + 1, date.getDate())}"]`

export const DatepickerWriteMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Write in the datepicker
   */
  write: (date: string) => {
    element().within(() => {
      cy.get('.dropdown-trigger .sc-bal-datepicker.input').clear().type(date).blur()
    })
    return creator()
  },
})

export const DatepickerOpenableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Open the datepicker
   */
  open: () => {
    element().find('.datepicker-trigger-icon').click()
    return creator()
  },
})

export const DatepickerPickableMixin: Mixin = <T>({ creator, element, selector }: MixinContext<T>) => ({
  /**
   * Pick the date
   */
  pick: (date: Date) => {
    const openMixin = DatepickerOpenableMixin({ creator, selector, element })
    const month = date.getMonth()
    const year = date.getFullYear()

    openMixin.open()

    element().within(() => {
      cy.get('.month-select select').first().select(month.toString())
      cy.get('.year-select select').first().select(year.toString())
      cy.get(selectorDayBox(date)).click()
    })

    return creator()
  },
})

export const DatepickerShouldHaveValueAssertableMixin: Mixin = ({ element, creator }) => ({
  /**
   * Check if datepicker have value
   */
  shouldHaveValue: (date: Date) => {
    element()
      .find('.dropdown-trigger .sc-bal-datepicker.input')
      .first()
      .should('have.value', format(newDateString(date)))
    return creator()
  },
})

export const DatepickerMinMaxRangeAssertableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  /**
   * Assert if the date is in range
   */
  assertDateInRange: (date: Date, shouldBeInRange: boolean = true) => {
    element().within(() => {
      const month = date.getMonth()
      const year = date.getFullYear()

      cy.get('.month-select select').first().select(month.toString())
      cy.get('.year-select select').first().select(year.toString())
      cy.get(selectorDayBox(date)).should(shouldBeInRange ? 'have.class' : 'not.have.class', 'out-of-month')
    })
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
