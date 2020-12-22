import { dataTestSelector, CheckboxAccessor } from '../../../src/'

export class CheckboxPage {
  normalCheckboxElement = CheckboxAccessor(dataTestSelector('checkbox-normal'))
  disabledCheckboxElement = CheckboxAccessor(dataTestSelector('checkbox-disabled'))

  open() {
    cy.visit('/components/bal-checkbox')
  }
}
