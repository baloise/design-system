describe('css-opacity.visual', () => {
  beforeEach(() => cy.visit('/test/css-opacity.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-opacity-basic')
  })
})

describe('deprecated-css-opacity.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-opacity.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-opacity-basic')
  })
})
