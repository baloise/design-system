describe('bal-shape', () => {
  before(() => cy.page('/components/bal-shape/test/bal-shape.visual.html'))

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('shape-basic', 0.0)
  })

  it('component variants', () => {
    cy.compareSnapshot('shape-variants', 0.0)
  })
})
