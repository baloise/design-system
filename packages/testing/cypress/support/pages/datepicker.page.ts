import { DatePickerAccessor, dataTestSelector } from '../../../src'

export class DatePickerPage {
  datepicker = DatePickerAccessor(dataTestSelector("datepicker"))
  open() {
    cy.visit('/components/bal-datepicker')
  }
}
