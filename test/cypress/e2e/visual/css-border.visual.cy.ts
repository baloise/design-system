describe('css-border.visual', () => {
  beforeEach(() => cy.visit('/test/css-border.visual.html').platform('desktop'))

  it('basic', () => {
    cy.getByTestId('border-none').compareSnapshot('css-border-none')
    cy.getByTestId('border-primary').compareSnapshot('css-border-primary')
    cy.getByTestId('border-grey').compareSnapshot('css-border-grey')
    cy.getByTestId('border-grey-dark').compareSnapshot('css-border-grey-dark')
    cy.getByTestId('border-warning').compareSnapshot('css-border-warning')
    cy.getByTestId('border-success').compareSnapshot('css-border-success')
    cy.getByTestId('border-danger').compareSnapshot('css-border-danger')
    cy.getByTestId('border-primary-light').compareSnapshot('css-border-primary-light')
    cy.getByTestId('border-white').compareSnapshot('css-border-white')
  })
})
