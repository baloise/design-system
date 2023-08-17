describe('css-core.visual', () => {
  beforeEach(() => cy.visit('/test/css-core.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-core-basic')
  })
})
