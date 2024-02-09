describe('bal-toast', () => {
  beforeEach(() => cy.visit('/components/bal-toast/test/bal-toast.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('toast-basic')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('toast-basic-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('toast-basic-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.testVisual('toast-variants')

    cy.platform('tablet')
    cy.testVisual('toast-variants-tablet')

    cy.platform('mobile')
    cy.testVisual('toast-variants-mobile')
  })
})
