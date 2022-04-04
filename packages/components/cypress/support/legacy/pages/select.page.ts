import { DropDownAccessor, TypeaheadAccessor, byTestId } from '../../../../../testing/src'

export class SelectPage {
  dropdown = DropDownAccessor(byTestId('select'))
  typeahead = TypeaheadAccessor(byTestId('typeahead'))
  open() {
    cy.visit('/components/form/bal-select')
  }
}
