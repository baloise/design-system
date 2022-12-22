describe('bal-tabs', () => {
  beforeEach(() => cy.page('/components/bal-tabs/test/bal-tabs.visual.html'))

  it('basic component', () => {
    cy.platform('desktop').wait(400)
    cy.getByTestId('basic').compareSnapshot('tabs-basic', 0.0)

    cy.platform('tablet').wait(400)
    cy.getByTestId('basic').compareSnapshot('tabs-basic-tablet', 0.0)

    cy.platform('mobile').wait(400)
    cy.getByTestId('basic').compareSnapshot('tabs-basic-mobile', 0.0)
  })

  it('expanded', () => {
    cy.platform('desktop').wait(400)
    cy.getByTestId('expanded').compareSnapshot('tabs-expanded', 0.01)

    cy.platform('tablet').wait(400)
    cy.getByTestId('expanded').compareSnapshot('tabs-expanded-tablet', 0.02)

    cy.platform('mobile').wait(400)
    cy.getByTestId('expanded').compareSnapshot('tabs-expanded-mobile', 0.02)
  })

  it('steps', () => {
    cy.platform('desktop').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps', 0.0)

    cy.platform('tablet').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps-tablet', 0.0)

    cy.platform('mobile').wait(400)
    cy.getByTestId('steps').compareSnapshot('tabs-steps-mobile', 0.0)
  })
})
