describe('bal-snackbar', () => {
  beforeEach(() => cy.visit('/components/bal-snackbar/test/bal-snackbar.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('snackbar-basic')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('snackbar-basic-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('snackbar-basic-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.testVisual('snackbar-variants')

    cy.platform('tablet')
    cy.testVisual('snackbar-variants-tablet')

    cy.platform('mobile')
    cy.testVisual('snackbar-variants-mobile')
  })
})
