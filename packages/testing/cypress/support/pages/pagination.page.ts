import { byTestId } from '../../../src'

export class PaginationPage {
  pagination = byTestId('pagination')

  open() {
    cy.visit('/components/bal-pagination')
  }
}
