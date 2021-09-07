import { dataTestSelector } from '../../../src'

export class PaginationPage {
  pagination = dataTestSelector('pagination')

  open() {
    cy.visit('/components/bal-pagination')
  }
}
