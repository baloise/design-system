describe('css-shadow.visual', () => {
  beforeEach(() => cy.visit('/test/css-shadow.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').testVisual('css-shadow-basic')
    cy.getByTestId('text-shadow').testVisual('css-shadow-text-shadow')
  })
})

describe('deprecated-css-shadow.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-shadow.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').testVisual('css-shadow-basic')
    cy.getByTestId('text-shadow').testVisual('css-shadow-text-shadow')
  })
})
