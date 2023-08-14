describe('css-inheritance.visual', () => {
  beforeEach(() => cy.visit('/test/css-inheritance.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('colors').compareSnapshot('css-inheritance-colors')
    cy.getByTestId('border').compareSnapshot('css-inheritance-border')
    cy.getByTestId('display').compareSnapshot('css-inheritance-display')
    cy.getByTestId('opacity').compareSnapshot('css-inheritance-opacity')
    cy.getByTestId('shadow').compareSnapshot('css-inheritance-shadow')
  })
})
