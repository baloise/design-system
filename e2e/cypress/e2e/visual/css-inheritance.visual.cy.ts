describe('css-inheritance.visual', () => {
  beforeEach(() => cy.visit('/test/css-inheritance.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('colors').testVisual('css-inheritance-colors')
    cy.getByTestId('border').testVisual('css-inheritance-border')
    cy.getByTestId('display').testVisual('css-inheritance-display')
    cy.getByTestId('opacity').testVisual('css-inheritance-opacity')
    cy.getByTestId('shadow').testVisual('css-inheritance-shadow')
  })
})

describe('deprecated-css-inheritance.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-inheritance.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('colors').testVisual('css-inheritance-colors')
    cy.getByTestId('border').testVisual('css-inheritance-border')
    cy.getByTestId('display').testVisual('css-inheritance-display')
    cy.getByTestId('opacity').testVisual('css-inheritance-opacity')
    cy.getByTestId('shadow').testVisual('css-inheritance-shadow')
  })
})
