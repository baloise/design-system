describe('bal-close', () => {
  before(() => cy.page('/components/bal-close/test/bal-close.visual.html'))

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('close-basic', 0.0)
  })

  it('component variants', () => {
    cy.compareSnapshot('close-variants', 0.0)
  })
})
