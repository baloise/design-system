describe('bal-pagination', () => {
  before(() => cy.page('/components/bal-pagination/test/bal-pagination.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('pagination-basic-desktop', 0.0)
    cy.getByTestId('small').compareSnapshot('pagination-small-desktop', 0.0)
    cy.getByTestId('small-with-dots').compareSnapshot('pagination-small-with-dots-desktop', 0.0)
    cy.getByTestId('tabs').compareSnapshot('pagination-tabs-desktop', 0.0)
    cy.getByTestId('named-tabs').compareSnapshot('pagination-named-tabs-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('pagination-basic-tablet', 0.0)
    cy.getByTestId('small').compareSnapshot('pagination-small-tablet', 0.0)
    cy.getByTestId('small-with-dots').compareSnapshot('pagination-small-with-dots-tablet', 0.0)
    cy.getByTestId('tabs').compareSnapshot('pagination-tabs-tablet', 0.0)
    cy.getByTestId('named-tabs').compareSnapshot('pagination-named-tabs-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('pagination-basic-mobile', 0.0)
    cy.getByTestId('small').compareSnapshot('pagination-small-mobile', 0.0)
    cy.getByTestId('small-with-dots').compareSnapshot('pagination-small-with-dots-mobile', 0.0)
    cy.getByTestId('tabs').compareSnapshot('pagination-tabs-mobile', 0.0)
    cy.getByTestId('named-tabs').compareSnapshot('pagination-named-tabs-mobile', 0.0)
  })
})
