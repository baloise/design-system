describe('bal-navbar', () => {
  before(() => cy.page('/components/bal-navbar/test/bal-navbar.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('navbar-basic-desktop', 0.0)
    cy.getByTestId('simple-light').compareSnapshot('navbar-simple-light-desktop', 0.0)
    cy.getByTestId('container').compareSnapshot('navbar-container-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('navbar-basic-tablet', 0.0)
    cy.getByTestId('simple-light').compareSnapshot('navbar-simple-light-tablet', 0.0)
    cy.getByTestId('container').compareSnapshot('navbar-container-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('navbar-basic-mobile', 0.0)
    cy.getByTestId('simple-light').compareSnapshot('navbar-simple-light-mobile', 0.0)
    cy.getByTestId('container').compareSnapshot('navbar-container-mobile', 0.0)
  })
})
