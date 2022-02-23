import { byTestId, CheckboxAccessor } from '../../../../src/'

export class CheckboxPage {
  normalCheckboxElement = CheckboxAccessor(byTestId('checkbox-normal'))
  disabledCheckboxElement = CheckboxAccessor(byTestId('checkbox-disabled'))

  open() {
    cy.visit('/components/form/bal-checkbox')
  }
}
