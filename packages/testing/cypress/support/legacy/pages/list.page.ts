import { ListAccessor, byTestId } from '../../../../src'

export class ListPage {
  list = ListAccessor(byTestId('pagination'))
  open() {
    cy.visit('/components/bal-pagination')
  }
}
