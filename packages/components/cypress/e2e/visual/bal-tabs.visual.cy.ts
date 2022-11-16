describe('bal-tabs', () => {
  before(() => cy.page('/components/bal-tabs/test/bal-tabs.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('tabs-basic', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('tabs-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('tabs-basic-mobile', 0.0)
  })

  it('expanded', () => {
    cy.platform('desktop')
    cy.getByTestId('expanded').compareSnapshot('tabs-expanded', 0.0)

    cy.platform('tablet')
    cy.getByTestId('expanded').compareSnapshot('tabs-expanded-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('expanded').compareSnapshot('tabs-expanded-mobile', 0.0)
  })

  it('steps', () => {
    cy.platform('desktop')
    cy.getByTestId('steps').compareSnapshot('tabs-steps', 0.0)

    cy.platform('tablet')
    cy.getByTestId('steps').compareSnapshot('tabs-steps-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('steps').compareSnapshot('tabs-steps-mobile', 0.0)
  })
})
