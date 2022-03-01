import { byTestId, DatePickerAccessor } from '../../../../src'

export class DatepickerPage {
  datepicker = DatePickerAccessor(byTestId('datepicker'))
  open() {
    cy.visit('/components/form/bal-datepicker')
  }
}
