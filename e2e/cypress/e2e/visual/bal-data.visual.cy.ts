describe('bal-data', () => {
  beforeEach(() => cy.visit('/components/bal-data/test/bal-data.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('data-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('data-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('data-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.testVisual('data-variants-desktop')

    cy.platform('tablet')
    cy.testVisual('data-variants-tablet')

    cy.platform('mobile')
    cy.testVisual('data-variants-mobile')
  })
})
