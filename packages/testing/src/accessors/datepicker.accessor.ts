/// <reference types="cypress" />

import { balDateUtil } from '@baloise/ui-library'
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

const localDatetime = (date: Date): string => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString()
}

const selectorDayBox = (date: Date) => `[data-date="${balDateUtil.format(localDatetime(date))}"]`

export const DatepickerWriteMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Write in the datepicker
   */
  write: (date: string) => {
    cy.get(selector).within(() => {
      cy.get('.dropdown-trigger .sc-bal-datepicker.input').clear().type(date).blur()
    })
    return creator()
  },
})

export const DatepickerOpenableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Open the datepicker
   */
  open: () => {
    cy.get(selector).find('.datepicker-trigger-icon').click()
    return creator()
  },
})

export const DatepickerPickableMixin: Mixin = <T>({ creator, selector }: MixinContext<T>) => ({
  /**
   * Pick the date
   */
  pick: (date: Date) => {
    const openMixin = DatepickerOpenableMixin({ creator, selector })
    const month = date.getMonth()
    const year = date.getFullYear()

    openMixin.open()

    cy.get(selector).within(() => {
      cy.get('.month-select select').first().select(month.toString())
      cy.get('.year-select select').first().select(year.toString())
      cy.get(selectorDayBox(date)).click()
    })

    return creator()
  },
})

export const DatepickerShouldHaveValueAssertableMixin: Mixin = ({ selector, creator }) => ({
  /**
   * Check if datepicker have value
   */
  shouldHaveValue: (date: Date) => {
    cy.get(selector)
      .find('.dropdown-trigger .sc-bal-datepicker.input')
      .first()
      .should('have.value', balDateUtil.format(localDatetime(date)))
    return creator()
  },
})

export const DatepickerMinMaxRangeAssertableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  /**
   * Assert if the date is in range
   */
  assertDateInRange: (date: Date, shouldBeInRange: boolean = true) => {
    cy.get(selector).within(() => {
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
 * import { dataTestSelector, DatepickerAccessor } from '@baloise/ui-library-testing'
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
