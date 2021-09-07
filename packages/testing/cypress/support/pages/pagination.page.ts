import { dataTestSelector } from '../../../src/selectors'

export class PaginationPage {
  pagination = dataTestSelector('pagination')

  open() {
    cy.visit('/components/bal-pagination')
  }
}
