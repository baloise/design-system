import { app } from '../support/app'

describe('Pagination', () => {
  const page = app.getPaginationPage()

  it('should verify the page setup', () => {
    page.open()
    cy.get(page.pagination).balPaginationFindPages().should('have.length', '8')
    cy.get(page.pagination).balPaginationFindPages().first().contains('1')
    cy.get(page.pagination).balPaginationFindPages().last().contains('20')
    cy.get(page.pagination).balPaginationFindCurrentPage().contains('2')
  })

  it('should go to the next page and back again', () => {
    page.open()
    cy.get(page.pagination).balPaginationFindNextButton().click()
    cy.get(page.pagination).balPaginationFindCurrentPage().contains('3')
    cy.get(page.pagination).balPaginationFindPreviousButton().click()
    cy.get(page.pagination).balPaginationFindCurrentPage().contains('2')
  })

  it('should go to the last page and verify the page buttons', () => {
    page.open()
    cy.get(page.pagination).balPaginationFindPages().last().click()
    cy.get(page.pagination).balPaginationFindPages().first().contains('1')
    cy.get(page.pagination).balPaginationFindPages().eq(1).contains('14')
    cy.get(page.pagination).balPaginationFindPages().last().contains('20')
  })
})
