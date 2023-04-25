describe('bal-stack', () => {
  beforeEach(() =>
    cy.visit('/components/layout/bal-stack/test/bal-stack.visual.html').platform('desktop').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('stack-basic', 0.0)
    cy.getByTestId('alignment').compareSnapshot('stack-alignment', 0.0)
    cy.getByTestId('direction').compareSnapshot('stack-direction', 0.0)
    cy.getByTestId('space').compareSnapshot('stack-space', 0.0)
    cy.getByTestId('margins').compareSnapshot('stack-margins', 0.0)
  })
})
