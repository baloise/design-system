describe('bal-button', () => {
  before(() => cy.page('/components/bal-button/test/bal-button.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('primary').compareSnapshot('button-primary-desktop', 0.0)
    cy.getByTestId('variants').compareSnapshot('button-variants-desktop', 0.0)
    cy.getByTestId('states').compareSnapshot('button-states-desktop', 0.0)
    cy.getByTestId('alert').compareSnapshot('button-alert-desktop', 0.0)
    cy.getByTestId('square').compareSnapshot('button-square-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('primary').compareSnapshot('button-primary-tablet', 0.0)
    cy.getByTestId('variants').compareSnapshot('button-variants-tablet', 0.0)
    cy.getByTestId('states').compareSnapshot('button-states-tablet', 0.0)
    cy.getByTestId('alert').compareSnapshot('button-alert-tablet', 0.0)
    cy.getByTestId('square').compareSnapshot('button-square-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('primary').compareSnapshot('button-primary-deskmobiletop', 0.0)
    cy.getByTestId('variants').compareSnapshot('button-variants-mobile', 0.0)
    cy.getByTestId('states').compareSnapshot('button-states-mobile', 0.0)
    cy.getByTestId('alert').compareSnapshot('button-alert-mobile', 0.0)
    cy.getByTestId('square').compareSnapshot('button-square-mobile', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('button-variants-desktop', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('button-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('button-variants-mobile', 0.0)
  })
})
