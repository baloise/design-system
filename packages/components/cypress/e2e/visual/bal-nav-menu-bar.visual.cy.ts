describe('bal-nav-menu-bar', () => {
  describe('basic', () => {
    beforeEach(() =>
      cy.visit('/components/bal-nav/bal-nav-menu-bar/test/bal-nav-menu-bar.visual.html').waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.platform('fullhd')
      cy.compareSnapshot('menu-bar-fullhd')

      cy.platform('highDefinition')
      cy.compareSnapshot('menu-bar-highDefinition')

      cy.platform('widescreen')
      cy.compareSnapshot('menu-bar-widescreen')

      cy.platform('desktop')
      cy.compareSnapshot('menu-bar-desktop')

      cy.platform('tablet')
      cy.compareSnapshot('menu-bar-tablet')

      cy.platform('mobile')
      cy.compareSnapshot('menu-bar-mobile')
    })
  })
})
