describe('css-radius.visual', () => {
  beforeEach(() => cy.visit('/test/css-radius.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('radius-none').compareSnapshot('css-radius-none-basic')
    cy.getByTestId('radius-normal').compareSnapshot('css-radius-normal-basic')
    cy.getByTestId('radius-large').compareSnapshot('css-radius-large-basic')
    cy.getByTestId('radius-rounded').compareSnapshot('css-radius-rounded-basic')
  })
})
