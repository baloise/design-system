describe('bal-close', () => {
  beforeEach(() => cy.visit('/components/bal-close/test/bal-close.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('close-basic')
  })

  it('component variants', () => {
    cy.compareSnapshot('close-variants')
  })
})
