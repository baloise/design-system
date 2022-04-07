import { byTestId } from '../../../../testing/src'

export class CheckboxPage {
  normalCheckboxElement = byTestId('checkbox-normal')
  disabledCheckboxElement = byTestId('checkbox-disabled')

  open() {
    cy.visit('/components/form/bal-checkbox')
  }
}
