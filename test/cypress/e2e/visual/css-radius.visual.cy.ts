describe('css-radius.visual', () => {
  beforeEach(() => cy.visit('/test/css-radius.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('radius-none').testVisual('css-radius-none-basic')
    cy.getByTestId('radius-normal').testVisual('css-radius-normal-basic')
    cy.getByTestId('radius-large').testVisual('css-radius-large-basic')
    cy.getByTestId('radius-rounded').testVisual('css-radius-rounded-basic')
  })
})
