describe('bal-heading', () => {
  beforeEach(() => cy.visit('/components/bal-heading/test/bal-heading.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('heading-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('heading-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('heading-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.testVisual('heading-variants-desktop')

    cy.platform('tablet')
    cy.testVisual('heading-variants-tablet')

    cy.platform('mobile')
    cy.testVisual('heading-variants-mobile')
  })
})
