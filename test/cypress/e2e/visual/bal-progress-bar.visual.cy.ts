describe('bal-progress-bar', () => {
  beforeEach(() =>
    cy
      .visit('/components/bal-progress-bar/test/bal-progress-bar.visual.html')
      .waitForDesignSystem()
      .platform('desktop'),
  )

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('progress-bar-desktop')
  })

  it('component variants', () => {
    cy.compareSnapshot('progress-bar-variants-desktop')
  })
})
