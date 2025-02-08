describe('css-opacity.visual', () => {
  beforeEach(() => cy.visit('/test/css-opacity.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').testVisual('css-opacity-basic')
  })
})
