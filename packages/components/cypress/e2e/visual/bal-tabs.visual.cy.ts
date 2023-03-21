describe('bal-tabs', () => {
  beforeEach(() => cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').waitForDesignSystem())

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

  it('meta', () => {
    cy.platform('desktop').wait(400)
    cy.getByTestId('meta').compareSnapshot('tabs-meta', 0.01)

    cy.platform('tablet').wait(400)
    cy.getByTestId('meta').compareSnapshot('tabs-meta-tablet', 0.02)

    cy.platform('mobile').wait(400)
    cy.getByTestId('meta').compareSnapshot('tabs-meta-mobile', 0.02)
  })

  it('navbar', () => {
    cy.platform('desktop').wait(400)
    cy.getByTestId('navbar').compareSnapshot('tabs-navbar', 0.01)

    cy.platform('tablet').wait(400)
    cy.getByTestId('navbar').compareSnapshot('tabs-navbar-tablet', 0.02)

    cy.platform('mobile').wait(400)
    cy.getByTestId('navbar').compareSnapshot('tabs-navbar-mobile', 0.02)
  })

  it('navigation', () => {
    cy.platform('desktop').wait(400)
    cy.getByTestId('navigation').compareSnapshot('tabs-navigation', 0.01)

    cy.platform('tablet').wait(400)
    cy.getByTestId('navigation').compareSnapshot('tabs-navigation-tablet', 0.02)

    cy.platform('mobile').wait(400)
    cy.getByTestId('navigation').compareSnapshot('tabs-navigation-mobile', 0.02)
  })
})
