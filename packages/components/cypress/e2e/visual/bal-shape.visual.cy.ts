describe('bal-shape', () => {
  before(() => cy.page('/components/bal-shape/test/bal-shape.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('shape-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('shape-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('shape-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('shape-variants-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('shape-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('shape-variants-mobile', 0.0)
  })
})
