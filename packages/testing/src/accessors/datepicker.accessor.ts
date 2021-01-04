/// <reference types="cypress" />
import {
  Accessor,
  createAccessor,
  Mixin,
  MixinContext,
} from '../mixins'
import { format } from '../../../library/src/components/bal-datepicker/bal-datepicker.util'

export interface DatePickerAccessorType {
  write(date: string): DatePickerAccessorType;
  pick(date: Date): DatePickerAccessorType;
  open(): DatePickerAccessorType;
  shouldHaveValue(date: Date): DatePickerAccessorType;
  errorCheck(name: string, error: string): void;
  noErrorCheck(name: string): void;
  assertDateInRange(date: Date, shouldBeInRange?: boolean): DatePickerAccessorType;
}

const selectorDayBox = (date: Date) => `[data-date="${format(date)}"]`;

export const DatePickerWriteMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Write in the datepicker
   */
  write: (date: string) => {
    cy.get(selector).within(() => {
      cy.get('.dropdown-trigger .sc-bal-datepicker.input').clear().type(date).blur();
    });
    return creator();
  }
});

export const DatePickerOpenableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Open the datepicker
   */
  open: () => {
    cy.get(selector).find('.datepicker-trigger-icon').click();
    return creator();
  }
});

export const DatePickerPickableMixin: Mixin = <T>({creator, selector}: MixinContext<T>) => ({
  /**
   * Pick the date
   */
  pick: (date: Date) => {
    const openMixin = DatePickerOpenableMixin({creator, selector})
    const month = date.getMonth();
    const year = date.getFullYear();

    openMixin.open()

    cy.get(selector).within(() => {
      cy.get('.month-select select').first().select(month.toString());
      cy.get('.year-select select').first().select(year.toString());
      cy.get(selectorDayBox(date)).click();
    });

    return creator();
  }
});

export const DatePickerShouldHaveValueAssertableMixin: Mixin = ({selector, creator}) => ({
  /**
   * Check if datepicker have value
   */
  shouldHaveValue: (date: Date) => {
    cy.get(selector).find('.dropdown-trigger .sc-bal-datepicker.input').first().should('have.value', format(date));
    return creator();
  }
});

export const DatePickerMinMaxRangeAssertableMixin: Mixin = <T>({selector, creator}: MixinContext<T>) => ({
  /**
   * Assert if the date is in range
   */
  assertDateInRange: (date: Date, shouldBeInRange: boolean = true) => {
    cy.get(selector).within(() => {
      const month = date.getMonth();
      const year = date.getFullYear();

      cy.get('.month-select select').first().select(month.toString());
      cy.get('.year-select select').first().select(year.toString());
      cy.get(selectorDayBox(date)).should(shouldBeInRange ? 'have.class' : 'not.have.class', 'out-of-month');
    });
    return creator();
  }
});

/**
 * DatePickerAccessor is a helper object for E-2-E testing.
 * It maps the datepicker behaviour to the `bal-datepicker` ui component.
 *
 * ```typescript
 * import { dataTestSelector, DatePickerAccessor } from '@baloise/ui-library-testing'
 *
   * describe('Datepicker', () => {
 *   it('should ...', () => {
 *      const datepicker = DatePickerAccessor(dataTestSelector('datepicker-id')).get()
 *      datepicker.open()
 *      datepicker.pick(new Date())
 *      datepicker.shouldHaveValue(new Date())
 *  })
 * })
 * ```
 */
export const DatePickerAccessor: Accessor<DatePickerAccessorType> =
  createAccessor<DatePickerAccessorType>(
    DatePickerOpenableMixin,
    DatePickerPickableMixin,
    DatePickerShouldHaveValueAssertableMixin,
    DatePickerWriteMixin,
    DatePickerMinMaxRangeAssertableMixin
  );
