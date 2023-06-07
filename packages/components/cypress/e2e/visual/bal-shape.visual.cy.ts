describe('bal-shape', () => {
  beforeEach(() => cy.visit('/components/bal-shape/test/bal-shape.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('shape-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('shape-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('shape-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('shape-variants-desktop')

    cy.platform('tablet')
    cy.compareSnapshot('shape-variants-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('shape-variants-mobile')
  })
})
