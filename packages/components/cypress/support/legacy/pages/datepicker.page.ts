import { byTestId, DatePickerAccessor } from '../../../../../testing/src'

export class DatepickerPage {
  datepicker = DatePickerAccessor(byTestId('datepicker'))
  open() {
    cy.page('/components/form/bal-datepicker')
  }
}
