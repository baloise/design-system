describe('bal-shape', () => {
  beforeEach(() => cy.visit('/components/bal-shape/test/bal-shape.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('shape-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('shape-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('shape-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.testVisual('shape-variants-desktop')

    cy.platform('tablet')
    cy.testVisual('shape-variants-tablet')

    cy.platform('mobile')
    cy.testVisual('shape-variants-mobile')
  })
})
