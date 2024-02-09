describe('bal-stack', () => {
  beforeEach(() =>
    cy.visit('/components/bal-stack/test/bal-stack.visual.html').platform('desktop').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.getByTestId('basic').testVisual('stack-basic')
    cy.getByTestId('alignment').testVisual('stack-alignment')
    cy.getByTestId('direction').testVisual('stack-direction')
    cy.getByTestId('space').testVisual('stack-space')
    cy.getByTestId('margins').testVisual('stack-margins')
  })
})
