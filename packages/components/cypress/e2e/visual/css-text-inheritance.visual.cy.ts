describe('css - text inheritance', () => {
  beforeEach(() => cy.page('/components/css-text-inheritance.visual.html').platform('desktop'))

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('css-text-inheritance', 0.0)
  })
})
