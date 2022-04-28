import { now, formatDateString, format } from '@baloise/web-app-utils'
import { addDays, addWeeks, subDays, subWeeks } from 'date-fns'
import { byTestId, DatePickerAccessor } from '../../../testing/src'

describe('Datepicker', () => {
  beforeEach(() => cy.platform('desktop').page('/components/form/bal-datepicker/test/bal-datepicker.cy.html'))

  describe('open & close', () => {
    it('should open and close', () => {
      cy.getByTestId('basic').balDatepickerToggle().balDatepickerIsOpen().balDatepickerToggle().balDatepickerIsClosed()
    })
  })

  describe('type', () => {
    it('should type the date in datepicker and fire one change event', () => {
      const today = format('de-CH', now())
      cy.getByTestId('basic').spyEvent('balChange').type(`${today}{enter}`).blur().contains(today)

      cy.get('@balChange').should('have.been.calledOnce').shouldHaveEventDetail(formatDateString(now()))

      cy.getByTestId('basic').clear().type('{enter}').blur().balDatepickerIsClosed()
      cy.get('@balChange').should('have.been.calledTwice').shouldHaveEventDetail('', 1)
    })
  })

  describe('pick', () => {
    it('should pick the date in datepicker and fire one change event', () => {
      cy.getByTestId('basic')
        .spyEvent('balChange')
        .balDatepickerToggle()
        .balDatepickerPick(now())
        .balDatepickerIsClosed()
        .contains(format('de-CH', now()))

      cy.get('@balChange').should('have.been.calledOnce').shouldHaveEventDetail(formatDateString(now()))

      cy.getByTestId('basic').clear().type('{enter}').blur().balDatepickerIsClosed()
      cy.get('@balChange').should('have.been.calledTwice').shouldHaveEventDetail('', 1)
    })
  })

  describe('disabled', () => {
    it('should have attribute disabled', () => {
      cy.getByTestId('basic')
        .setProperty('disabled', true)
        .hasProperty('disabled', 'disabled')
        .find('input')
        .hasProperty('disabled', 'disabled')

      cy.getByTestId('basic').removeProperty('disabled')
    })
  })

  describe('readonly', () => {
    it('should have attribute readonly', () => {
      cy.getByTestId('basic')
        .setProperty('readonly', true)
        .hasProperty('readonly', 'readonly')
        .find('input')
        .hasProperty('readonly', 'readonly')

      cy.getByTestId('basic').removeProperty('readonly')
    })
  })

  describe('range', () => {
    it('should have a min and max date', () => {
      const today = new Date(2022, 3, 16)
      const future = addWeeks(today, 1)
      const futureDisabled = addDays(future, 1)
      const past = subWeeks(today, 1)
      const pastDisabled = subDays(past, 1)

      cy.getByTestId('basic')
        .setProperty('min', formatDateString(past))
        .setProperty('max', formatDateString(future))
        .balDatepickerToggle()
        .balDatepickerIsOpen()
        .balDatepickerIsDateInRange(today)
        .balDatepickerIsDateInRange(past)
        .balDatepickerIsDateInRange(future)
        .balDatepickerIsDateNotInRange(futureDisabled)
        .balDatepickerIsDateNotInRange(pastDisabled)
    })
  })

  describe('legacy (deprecated)', () => {
    it('should be able to use the legacy accessors', () => {
      const accessor = DatePickerAccessor(byTestId('basic'))
      accessor.get().open()
      cy.getByTestId('basic').balDatepickerIsOpen().balDatepickerToggle()
      accessor.get().pick(now()).shouldHaveValue(new Date())
      cy.getByTestId('basic').clear().type('{enter}')
      accessor.get().write('12.12.2020')
      cy.getByTestId('basic').contains('12.12.2020')
    })
  })
})
