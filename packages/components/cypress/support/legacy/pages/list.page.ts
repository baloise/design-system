import { ListAccessor, byTestId } from '../../../../../testing/src'

export class ListPage {
  list = ListAccessor(byTestId('pagination'))
  open() {
    cy.page('/components/bal-pagination')
  }
}
