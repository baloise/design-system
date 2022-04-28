import { byTestId } from '../../../../testing/src'

export class DatepickerPage {
  datepicker = byTestId('datepicker')
  datepickerDisabled = byTestId('datepicker-disabled')
  datepickerRange = byTestId('datepicker-range')

  open() {
    cy.page('/components/form/bal-datepicker')
  }
}
