describe('bal-tabs', () => {
  const errorThreshold = 0

  context('desktop', () => {
    beforeEach(() => {
      cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').platform('desktop').waitForDesignSystem()
    })

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('tabs-basic', errorThreshold)
      cy.getByTestId('expanded').compareSnapshot('tabs-expanded', errorThreshold)
      cy.getByTestId('meta').compareSnapshot('tabs-meta', errorThreshold)
      cy.getByTestId('navbar').compareSnapshot('tabs-navbar', errorThreshold)
      cy.getByTestId('navigation').compareSnapshot('tabs-navigation', errorThreshold)
      cy.getByTestId('vertical').compareSnapshot('tabs-vertical', errorThreshold)
    })
  })

  context('tablet', () => {
    beforeEach(() => {
      cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').platform('tablet').waitForDesignSystem()
    })

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('tabs-basic-tablet', errorThreshold)
      cy.getByTestId('expanded').compareSnapshot('tabs-expanded-tablet', errorThreshold)
      cy.getByTestId('meta').compareSnapshot('tabs-meta-tablet', errorThreshold)
      cy.getByTestId('navbar').compareSnapshot('tabs-navbar-tablet', errorThreshold)
      cy.getByTestId('navigation').compareSnapshot('tabs-navigation-tablet', errorThreshold)
      cy.getByTestId('vertical').compareSnapshot('tabs-vertical-tablet', errorThreshold)
    })
  })

  context('mobile', () => {
    beforeEach(() => {
      cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').platform('mobile').waitForDesignSystem()
    })

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('tabs-basic-mobile', errorThreshold)
      cy.getByTestId('expanded').compareSnapshot('tabs-expanded-mobile', errorThreshold)
      cy.getByTestId('meta').compareSnapshot('tabs-meta-mobile', errorThreshold)
      cy.getByTestId('navbar').compareSnapshot('tabs-navbar-mobile', errorThreshold)
      cy.getByTestId('navigation').compareSnapshot('tabs-navigation-mobile', errorThreshold)
      cy.getByTestId('vertical').compareSnapshot('tabs-vertical-mobile', errorThreshold)
    })
  })
})
