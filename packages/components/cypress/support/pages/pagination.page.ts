import { byTestId } from '../../../../testing/src'

export class PaginationPage {
  pagination = byTestId('pagination')

  open() {
    cy.page('/components/bal-pagination')
  }
}
