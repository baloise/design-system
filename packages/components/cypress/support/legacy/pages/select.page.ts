import { DropDownAccessor, TypeaheadAccessor, byTestId } from '../../../../../testing/src'

export class SelectPage {
  dropdown = DropDownAccessor(byTestId('select'))
  typeahead = TypeaheadAccessor(byTestId('typeahead'))
  open() {
    cy.page('/components/form/bal-select')
  }
}
