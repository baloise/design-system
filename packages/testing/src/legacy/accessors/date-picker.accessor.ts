/// <reference types="cypress" />

import { Accessor, createAccessor, Mixin, MixinContext } from './mixins/mixins'
import { format } from '@baloise/web-app-utils'

export interface DatePickerAccessorType {
  write(date: string): DatePickerAccessorType
  pick(date: Date): DatePickerAccessorType
  open(): DatePickerAccessorType
  shouldHaveValue(date: Date): DatePickerAccessorType
  errorCheck(name: string, error: string): void
  noErrorCheck(name: string): void
  assertDateInRange(date: Date, shouldBeInRange?: boolean): DatePickerAccessorType
}

export const DatePickerWriteMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  write: (date: string) => {
    cy.get(selector).type(date)
    return creator()
  },
})

export const DatePickerPickableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  pick: (date: Date) => {
    if (cy.get(selector).balDatepickerIsClosed()) {
      cy.get(selector).balDatepickerToggle()
    }
    cy.get(selector).balDatepickerPick(date)
    return creator()
  },
})

export const DatePickerOpenableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  open: () => {
    if (cy.get(selector).balDatepickerIsClosed()) {
      cy.get(selector).balDatepickerToggle()
    }
    return creator()
  },
})

export const DatePickerShouldHaveValueAssertableMixin: Mixin = ({ selector, creator }) => ({
  shouldHaveValue: (date: Date) => {
    cy.get(selector).should('have.value', format('de-CH', date))
    return creator()
  },
})

/**
 * TODO: need to rework
 */
export const DatePickerErrorAssertableMixin: Mixin = <T>({ element, creator }: MixinContext<T>) => ({
  errorCheck: (name: string, error: string) => {
    element.clear()
    const message = cy.get(`cip-error[ng-reflect-control-name=${name}]`)
    message.should('contain', error)
    return creator()
  },
})

/**
 * TODO: need to rework
 */
export const DatePickerNoErrorAssertableMixin: Mixin = <T>({ creator }: MixinContext<T>) => ({
  noErrorCheck: (name: string) => {
    const noMessage = cy.get(`cip-error[ng-reflect-control-name=${name}]`)
    noMessage.should('be.empty')
    return creator()
  },
})

export const DatePickerMinMaxRangeAssertableMixin: Mixin = <T>({ selector, creator }: MixinContext<T>) => ({
  assertDateInRange: (date: Date, shouldBeInRange = true) => {
    if (shouldBeInRange) {
      cy.get(selector).balDatepickerIsDateInRange(date)
    } else {
      cy.get(selector).balDatepickerIsDateNotInRange(date)
    }
    return creator()
  },
})

export const DatePickerAccessor: Accessor<DatePickerAccessorType> = createAccessor<DatePickerAccessorType>(
  DatePickerWriteMixin,
  DatePickerPickableMixin,
  DatePickerShouldHaveValueAssertableMixin,
  DatePickerErrorAssertableMixin,
  DatePickerNoErrorAssertableMixin,
  DatePickerMinMaxRangeAssertableMixin,
  DatePickerOpenableMixin,
)
