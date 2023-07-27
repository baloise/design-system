describe('bal-pagination', () => {
  beforeEach(() => cy.visit('/components/bal-pagination/test/bal-pagination.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('pagination-basic-desktop')
    cy.getByTestId('small').compareSnapshot('pagination-small-desktop')
    cy.getByTestId('small-with-dots').compareSnapshot('pagination-small-with-dots-desktop')
  })

  it('basic component tablet', () => {
    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('pagination-basic-tablet')
    cy.getByTestId('small').compareSnapshot('pagination-small-tablet')
    cy.getByTestId('small-with-dots').compareSnapshot('pagination-small-with-dots-tablet')
  })

  it('basic component mobile', () => {
    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('pagination-basic-mobile')
    cy.getByTestId('small').compareSnapshot('pagination-small-mobile')
    cy.getByTestId('small-with-dots').compareSnapshot('pagination-small-with-dots-mobile')
  })
})
