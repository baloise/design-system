describe('bal-text', () => {
  beforeEach(() => cy.visit('/components/bal-text/test/bal-text.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('text-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('text-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('text-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.testVisual('text-variants-desktop')

    cy.platform('tablet')
    cy.testVisual('text-variants-tablet')

    cy.platform('mobile')
    cy.testVisual('text-variants-mobile')
  })
})
