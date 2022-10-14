describe('bal-data', () => {
  before(() => cy.page('/components/bal-data/test/bal-data.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('data-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('data-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('data-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('data-variants-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('data-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('data-variants-mobile', 0.0)
  })
})
