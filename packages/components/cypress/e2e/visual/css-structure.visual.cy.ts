describe('css-structure.visual', () => {
  beforeEach(() => cy.visit('/test/css-structure.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-structure-basic', 0.0)
    cy.getByTestId('inheritance').compareSnapshot('css-structure-inheritance', 0.0)
  })
})
