describe('bal-nav-menu-bar', () => {
  describe('basic', () => {
    beforeEach(() =>
      cy.visit('/components/bal-nav/bal-nav-menu-bar/test/bal-nav-menu-bar.visual.html').waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.platform('fullhd').waitAfterIdleCallback()
      cy.compareSnapshot('menu-bar-fullhd')

      cy.platform('highDefinition').waitAfterIdleCallback()
      cy.compareSnapshot('menu-bar-highDefinition')

      cy.platform('widescreen').waitAfterIdleCallback()
      cy.compareSnapshot('menu-bar-widescreen')

      cy.platform('desktop').waitAfterIdleCallback()
      cy.compareSnapshot('menu-bar-desktop')

      cy.platform('tablet').waitAfterIdleCallback()
      cy.compareSnapshot('menu-bar-tablet')

      cy.platform('mobile').waitAfterIdleCallback()
      cy.compareSnapshot('menu-bar-mobile')
    })
  })
})
