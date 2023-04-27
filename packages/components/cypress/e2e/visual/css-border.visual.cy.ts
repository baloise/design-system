describe('css-border.visual', () => {
  beforeEach(() => cy.visit('/test/css-border.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('border-none').compareSnapshot('css-border-none', 0.0)
    cy.getByTestId('border-primary').compareSnapshot('css-border-primary', 0.0)
    cy.getByTestId('border-grey').compareSnapshot('css-border-grey', 0.0)
    cy.getByTestId('border-grey-dark').compareSnapshot('css-border-grey-dark', 0.0)
    cy.getByTestId('border-warning').compareSnapshot('css-border-warning', 0.0)
    cy.getByTestId('border-success').compareSnapshot('css-border-success', 0.0)
    cy.getByTestId('border-danger').compareSnapshot('css-border-danger', 0.0)
    cy.getByTestId('border-primary-light').compareSnapshot('css-border-primary-light', 0.0)
    cy.getByTestId('border-white').compareSnapshot('css-border-white', 0.0)
  })
})
