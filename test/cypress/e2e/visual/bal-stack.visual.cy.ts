describe('bal-stack', () => {
  beforeEach(() =>
    cy.visit('/components/layout/bal-stack/test/bal-stack.visual.html').platform('desktop').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('stack-basic')
    cy.getByTestId('alignment').compareSnapshot('stack-alignment')
    cy.getByTestId('direction').compareSnapshot('stack-direction')
    cy.getByTestId('space').compareSnapshot('stack-space')
    cy.getByTestId('margins').compareSnapshot('stack-margins')
  })
})
