import { byTestId } from '../../../src'

export class DatepickerPage {
  datepicker = byTestId('datepicker')
  datepickerDisabled = byTestId('datepicker-disabled')
  datepickerRange = byTestId('datepicker-range')

  open() {
    cy.visit('/components/form/bal-datepicker')
  }
}
