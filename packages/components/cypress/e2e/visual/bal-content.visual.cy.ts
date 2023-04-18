describe('bal-content', () => {
  beforeEach(() =>
    cy.visit('/components/layout/bal-content/test/bal-content.visual.html').platform('desktop').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('content-basic', 0.0)
    cy.getByTestId('alignment').compareSnapshot('content-alignment', 0.0)
    cy.getByTestId('direction').compareSnapshot('content-direction', 0.0)
    cy.getByTestId('space').compareSnapshot('content-space', 0.0)
  })
})
