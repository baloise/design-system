describe('bal-nav-menu-flyout', () => {
  describe('basic', () => {
    beforeEach(() =>
      cy.visit('/components/bal-nav/bal-nav-menu-flyout/test/bal-nav-menu-flyout.visual.html').waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.platform('fullhd')
      cy.compareSnapshot('menu-flyout-fullhd')

      cy.platform('highDefinition')
      cy.compareSnapshot('menu-flyout-highDefinition')

      cy.platform('widescreen')
      cy.compareSnapshot('menu-flyout-widescreen')

      cy.platform('desktop')
      cy.compareSnapshot('menu-flyout-desktop')

      cy.platform('tablet')
      cy.compareSnapshot('menu-flyout-tablet')

      cy.platform('mobile')
      cy.compareSnapshot('menu-flyout-mobile')
    })
  })
})
