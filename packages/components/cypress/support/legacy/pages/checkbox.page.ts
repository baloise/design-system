import { byTestId, CheckboxAccessor, MultiSelectButtonAccessor } from '../../../../../testing/src'

export class CheckboxPage {
  normalCheckboxElement = CheckboxAccessor(byTestId('checkbox-normal'))
  disabledCheckboxElement = CheckboxAccessor(byTestId('checkbox-disabled'))
  multiSelect = MultiSelectButtonAccessor(byTestId('multi-select'))

  open() {
    cy.page('/components/form/bal-checkbox')
  }
}
