describe('bal-nav-menu-flyout', () => {
  describe('basic', () => {
    beforeEach(() =>
      cy.visit('/components/bal-nav/bal-nav-menu-flyout/test/bal-nav-menu-flyout.visual.html').waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.platform('fullhd').wait(32)
      cy.compareSnapshot('menu-flyout-fullhd')

      cy.platform('highDefinition').wait(32)
      cy.compareSnapshot('menu-flyout-highDefinition')

      cy.platform('widescreen').wait(32)
      cy.compareSnapshot('menu-flyout-widescreen')

      cy.platform('desktop').wait(32)
      cy.compareSnapshot('menu-flyout-desktop')

      cy.platform('tablet').wait(32)
      cy.compareSnapshot('menu-flyout-tablet')

      cy.platform('mobile').wait(32)
      cy.compareSnapshot('menu-flyout-mobile')
    })
  })
})
