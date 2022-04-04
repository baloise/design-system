import { byTestId } from '../../../../testing/src'

export class PaginationPage {
  pagination = byTestId('pagination')

  open() {
    cy.visit('/components/bal-pagination')
  }
}
