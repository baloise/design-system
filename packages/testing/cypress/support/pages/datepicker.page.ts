import { DatepickerAccessor, dataTestSelector } from '../../../src'

export class DatepickerPage {
  datepicker = DatepickerAccessor(dataTestSelector("datepicker"))
  open() {
    cy.visit('/components/bal-datepicker')
  }
}
