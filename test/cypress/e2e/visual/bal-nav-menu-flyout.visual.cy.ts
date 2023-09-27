describe('bal-nav-menu-flyout', () => {
  describe('basic', () => {
    it('basic component', () => {
      cy.visit('/components/bal-nav/bal-nav-menu-flyout/test/bal-nav-menu-flyout.visual.html')
        .platform('fullhd')
        .waitForDesignSystem()
        .wait(32)

      cy.compareSnapshot('menu-flyout-fullhd')

      cy.platform('highDefinition').wait(32)
      cy.compareSnapshot('menu-flyout-highDefinition')

      cy.platform('widescreen').wait(32)
      cy.compareSnapshot('menu-flyout-widescreen')

      cy.platform('desktop').wait(32)
      cy.compareSnapshot('menu-flyout-desktop')
    })

    it('basic component touch', () => {
      cy.visit('/components/bal-nav/bal-nav-menu-flyout/test/bal-nav-menu-flyout.visual.html')
        .platform('tablet')
        .waitForDesignSystem()
        .wait(400)

      cy.compareSnapshot('menu-flyout-tablet')

      cy.platform('mobile').wait(400)
      cy.compareSnapshot('menu-flyout-mobile')
    })
  })
})
