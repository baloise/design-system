import { byTestId, DatePickerAccessor } from '../../../../../testing/src'

export class DatepickerPage {
  datepicker = DatePickerAccessor(byTestId('datepicker'))
  open() {
    cy.visit('/components/form/bal-datepicker')
  }
}
