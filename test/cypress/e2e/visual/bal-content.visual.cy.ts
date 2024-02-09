describe('bal-content', () => {
  beforeEach(() =>
    cy.visit('/components/bal-content/test/bal-content.visual.html').platform('desktop').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.getByTestId('basic').testVisual('content-basic')
    cy.getByTestId('alignment').testVisual('content-alignment')
    cy.getByTestId('direction').testVisual('content-direction')
    cy.getByTestId('space').testVisual('content-space')
  })
})
