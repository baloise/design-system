describe('bal-snackbar', () => {
  beforeEach(() => cy.visit('/components/notice/bal-snackbar/test/bal-snackbar.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('snackbar-basic')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('snackbar-basic-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('snackbar-basic-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('snackbar-variants')

    cy.platform('tablet')
    cy.compareSnapshot('snackbar-variants-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('snackbar-variants-mobile')
  })
})
