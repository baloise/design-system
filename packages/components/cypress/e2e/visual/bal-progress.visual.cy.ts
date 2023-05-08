describe('bal-progress', () => {
  beforeEach(() =>
    cy.visit('/components/bal-progress/test/bal-progress.visual.html').waitForDesignSystem().platform('desktop'),
  )

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('progress-desktop', 0.0)
  })

  it('component variants', () => {
    cy.compareSnapshot('progress-variants-desktop', 0.0)
  })
})
