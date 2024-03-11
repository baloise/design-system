describe('css-inheritance.visual', () => {
  beforeEach(() => cy.visit('/test/css-inheritance.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('colors').testVisual('css-inheritance-colors')
    cy.getByTestId('border').testVisual('css-inheritance-border')
    cy.getByTestId('display').testVisual('css-inheritance-display')
    cy.getByTestId('opacity').testVisual('css-inheritance-opacity')
    cy.getByTestId('shadow').testVisual('css-inheritance-shadow')
  })
})
