import { DatepickerAccessor, byTestId } from '../../../../src'

export class DatepickerPage {
  datepicker = DatepickerAccessor(byTestId('datepicker'))
  open() {
    cy.visit('/components/form/bal-datepicker')
  }
}
