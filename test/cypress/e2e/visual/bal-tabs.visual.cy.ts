describe('bal-tabs', () => {
  const errorThreshold = 0.15

  context('desktop', () => {
    beforeEach(() => {
      cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').platform('desktop').waitForDesignSystem()
    })

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('tabs-basic', errorThreshold)
      cy.getByTestId('expanded').testVisual('tabs-expanded', errorThreshold)
      cy.getByTestId('meta').testVisual('tabs-meta', errorThreshold)
      cy.getByTestId('navbar').testVisual('tabs-navbar', errorThreshold)
      cy.getByTestId('navigation').testVisual('tabs-navigation', errorThreshold)
      cy.getByTestId('vertical').testVisual('tabs-vertical', errorThreshold)
      cy.getByTestId('overflow-stack').testVisual('tabs-overflow-stack', errorThreshold)
      cy.getByTestId('overflow-flex').testVisual('tabs-overflow-flex', errorThreshold)
      cy.getByTestId('vertical-list').testVisual('tabs-vertical-list', errorThreshold)
      cy.getByTestId('without-active-tab').testVisual('tabs-without-active-tab', errorThreshold)
    })
  })

  context('tablet', () => {
    beforeEach(() => {
      cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').platform('tablet').waitForDesignSystem()
    })

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('tabs-basic-tablet', errorThreshold)
      cy.getByTestId('expanded').testVisual('tabs-expanded-tablet', errorThreshold)
      cy.getByTestId('meta').testVisual('tabs-meta-tablet', errorThreshold)
      cy.getByTestId('navbar').testVisual('tabs-navbar-tablet', errorThreshold)
      cy.getByTestId('navigation').testVisual('tabs-navigation-tablet', errorThreshold)
      cy.getByTestId('vertical').testVisual('tabs-vertical-tablet', errorThreshold)
      cy.getByTestId('overflow-stack').testVisual('tabs-overflow-stack-tablet', errorThreshold)
      cy.getByTestId('overflow-flex').testVisual('tabs-overflow-flex-tablet', errorThreshold)
      cy.getByTestId('vertical-list').testVisual('tabs-vertical-list-tablet', errorThreshold)
      cy.getByTestId('without-active-tab').testVisual('tabs-without-active-tab-tablet', errorThreshold)
    })
  })

  context('mobile', () => {
    beforeEach(() => {
      cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').platform('mobile').waitForDesignSystem()
    })

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('tabs-basic-mobile', errorThreshold)
      cy.getByTestId('expanded').testVisual('tabs-expanded-mobile', errorThreshold)
      cy.getByTestId('meta').testVisual('tabs-meta-mobile', errorThreshold)
      cy.getByTestId('navbar').testVisual('tabs-navbar-mobile', errorThreshold)
      cy.getByTestId('navigation').testVisual('tabs-navigation-mobile', errorThreshold)
      cy.getByTestId('vertical').testVisual('tabs-vertical-mobile', errorThreshold)
      cy.getByTestId('overflow-stack').testVisual('tabs-overflow-stack-mobile', errorThreshold)
      cy.getByTestId('overflow-flex').testVisual('tabs-overflow-flex-mobile', errorThreshold)
      cy.getByTestId('vertical-list').testVisual('tabs-vertical-list-mobile', errorThreshold)
      cy.getByTestId('without-active-tab').testVisual('tabs-without-active-tab-mobile', errorThreshold)
    })
  })
})
