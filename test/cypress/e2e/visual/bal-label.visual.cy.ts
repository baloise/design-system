describe('bal-label', () => {
  beforeEach(() => cy.visit('/components/bal-label/test/bal-label.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('label-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('label-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('label-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.testVisual('label-variants-desktop')

    cy.platform('tablet')
    cy.testVisual('label-variants-tablet')

    cy.platform('mobile')
    cy.testVisual('label-variants-mobile')
  })

  it('custom size', () => {
    cy.platform('desktop')
    cy.testVisual('field')
  })
})
