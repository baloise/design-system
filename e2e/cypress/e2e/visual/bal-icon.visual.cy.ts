describe('bal-icon', () => {
  beforeEach(() => cy.visit('/components/bal-icon/test/bal-icon.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('icon-desktop')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.testVisual('icon-variants-desktop')
  })
})
