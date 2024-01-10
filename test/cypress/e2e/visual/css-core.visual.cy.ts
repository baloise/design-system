describe('css-core.visual', () => {
  beforeEach(() => cy.visit('/test/css-core.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-core-basic')
  })
})

describe('deprecated/css-core.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-core.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('basic').compareSnapshot('css-core-basic')
  })
})
