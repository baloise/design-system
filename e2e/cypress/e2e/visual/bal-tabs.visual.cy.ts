describe('bal-tabs', () => {
  context('desktop', () => {
    beforeEach(() => {
      cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').platform('desktop').waitForDesignSystem()
    })

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('tabs-basic')
      cy.getByTestId('expanded').testVisual('tabs-expanded')
      cy.getByTestId('meta').testVisual('tabs-meta')
      cy.getByTestId('navbar').testVisual('tabs-navbar')
      cy.getByTestId('navigation').testVisual('tabs-navigation')
      cy.getByTestId('vertical').testVisual('tabs-vertical')
      cy.getByTestId('overflow-stack').testVisual('tabs-overflow-stack')
      cy.getByTestId('overflow-flex').testVisual('tabs-overflow-flex')
      cy.getByTestId('vertical-list').testVisual('tabs-vertical-list')
      cy.getByTestId('without-active-tab').testVisual('tabs-without-active-tab')
      cy.getByTestId('brand-icons').testVisual('tabs-with-brand-icons')
    })
  })

  context('tablet', () => {
    beforeEach(() => {
      cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').platform('tablet').waitForDesignSystem()
    })

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('tabs-basic-tablet')
      cy.getByTestId('expanded').testVisual('tabs-expanded-tablet')
      cy.getByTestId('meta').testVisual('tabs-meta-tablet')
      cy.getByTestId('navbar').testVisual('tabs-navbar-tablet')
      cy.getByTestId('navigation').testVisual('tabs-navigation-tablet')
      cy.getByTestId('vertical').testVisual('tabs-vertical-tablet')
      cy.getByTestId('overflow-stack').testVisual('tabs-overflow-stack-tablet')
      cy.getByTestId('overflow-flex').testVisual('tabs-overflow-flex-tablet')
      cy.getByTestId('vertical-list').testVisual('tabs-vertical-list-tablet')
      cy.getByTestId('without-active-tab').testVisual('tabs-without-active-tab-tablet')
    })
  })

  context('mobile', () => {
    beforeEach(() => {
      cy.visit('/components/bal-tabs/test/bal-tabs.visual.html').platform('mobile').waitForDesignSystem()
    })

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('tabs-basic-mobile')
      cy.getByTestId('expanded').testVisual('tabs-expanded-mobile')
      cy.getByTestId('meta').testVisual('tabs-meta-mobile')
      cy.getByTestId('navbar').testVisual('tabs-navbar-mobile')
      cy.getByTestId('navigation').testVisual('tabs-navigation-mobile')
      cy.getByTestId('vertical').testVisual('tabs-vertical-mobile')
      cy.getByTestId('overflow-stack').testVisual('tabs-overflow-stack-mobile')
      cy.getByTestId('overflow-flex').testVisual('tabs-overflow-flex-mobile')
      cy.getByTestId('vertical-list').testVisual('tabs-vertical-list-mobile')
      cy.getByTestId('without-active-tab').testVisual('tabs-without-active-tab-mobile')
      cy.getByTestId('brand-icons').testVisual('tabs-with-brand-icons-mobile')
    })
  })
})
