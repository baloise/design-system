import { dataTestSelector } from '../../../src'

export class DatepickerPage {
  datepicker = dataTestSelector('datepicker')
  datepickerDisabled = dataTestSelector('datepicker-disabled')
  datepickerRange = dataTestSelector('datepicker-range')

  open() {
    cy.visit('/components/form/bal-datepicker')
  }
}
