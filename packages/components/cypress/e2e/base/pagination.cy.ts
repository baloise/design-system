describe('bal-pagination', () => {
  before(() => cy.page('/components/bal-pagination/test/bal-pagination.cy.html'))

  it('should verify the page setup', () => {
    cy.getByTestId('pagination').balPaginationFindPages().should('have.length', '8')
    cy.getByTestId('pagination').balPaginationFindPages().first().contains('1')
    cy.getByTestId('pagination').balPaginationFindPages().last().contains('20')
    cy.getByTestId('pagination').balPaginationFindCurrentPage().contains('2')
  })

  it('should go to the next page and back again', () => {
    cy.getByTestId('pagination').balPaginationFindNextButton().click()
    cy.getByTestId('pagination').balPaginationFindCurrentPage().contains('3')
    cy.getByTestId('pagination').balPaginationFindPreviousButton().click()
    cy.getByTestId('pagination').balPaginationFindCurrentPage().contains('2')
  })

  it('should go to the last page and verify the page buttons', () => {
    cy.getByTestId('pagination').balPaginationFindPages().last().click()
    cy.getByTestId('pagination').balPaginationFindPages().first().contains('1')
    cy.getByTestId('pagination').balPaginationFindPages().eq(1).contains('14')
    cy.getByTestId('pagination').balPaginationFindPages().last().contains('20')
  })
})
