describe('css-shadow.visual', () => {
  beforeEach(() => cy.visit('/test/css-shadow.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-shadow-basic', 0.0)
    cy.getByTestId('text-shadow').compareSnapshot('css-shadow-text-shadow', 0.0)
  })
})
