describe('bal-content', () => {
  beforeEach(() =>
    cy.visit('/components/bal-content/test/bal-content.visual.html').platform('desktop').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('content-basic')
    cy.getByTestId('alignment').compareSnapshot('content-alignment')
    cy.getByTestId('direction').compareSnapshot('content-direction')
    cy.getByTestId('space').compareSnapshot('content-space')
  })
})
