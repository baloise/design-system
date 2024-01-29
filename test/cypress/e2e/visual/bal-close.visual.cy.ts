describe('bal-close', () => {
  beforeEach(() => cy.visit('/components/bal-close/test/bal-close.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.getByTestId('basic').testVisual('close-basic')
  })

  it('component variants', () => {
    cy.testVisual('close-variants')
  })
})
