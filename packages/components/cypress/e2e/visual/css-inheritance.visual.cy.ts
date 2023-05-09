describe('css-inheritance.visual', () => {
  beforeEach(() => cy.visit('/test/css-inheritance.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('colors').compareSnapshot('css-inheritance-colors', 0.0)
    cy.getByTestId('border').compareSnapshot('css-inheritance-border', 0.0)
    cy.getByTestId('display').compareSnapshot('css-inheritance-display', 0.0)
    cy.getByTestId('opacity').compareSnapshot('css-inheritance-opacity', 0.0)
    cy.getByTestId('shadow').compareSnapshot('css-inheritance-shadow', 0.0)
  })
})
