import { dataTestSelector } from '../../../src/'

export class CheckboxPage {
  normalCheckboxElement = dataTestSelector('checkbox-normal')
  disabledCheckboxElement = dataTestSelector('checkbox-disabled')

  open() {
    cy.visit('/components/form/bal-checkbox')
  }
}
