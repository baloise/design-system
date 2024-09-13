describe('bal-progress-bar', () => {
  beforeEach(() =>
    cy
      .visit('/components/bal-progress-bar/test/bal-progress-bar.visual.html')
      .waitForDesignSystem()
      .platform('desktop'),
  )

  it('basic component', () => {
    cy.getByTestId('basic').testVisual('progress-bar-desktop')
  })

  it('component variants', () => {
    cy.getByTestId('variants').testVisual('progress-bar-variants-desktop')
  })
})
