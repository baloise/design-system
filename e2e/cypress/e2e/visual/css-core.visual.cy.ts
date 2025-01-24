describe('css-core.visual', () => {
  beforeEach(() => cy.visit('/test/css-core.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').testVisual('css-core-basic')
  })
})

describe('deprecated/css-core.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-core.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').testVisual('deprecated-css-core-basic')
  })
})
