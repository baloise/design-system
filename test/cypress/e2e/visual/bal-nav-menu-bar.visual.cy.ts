describe('bal-nav-menu-bar', () => {
  describe('basic', () => {
    beforeEach(() =>
      cy.visit('/components/bal-nav/bal-nav-menu-bar/test/bal-nav-menu-bar.visual.html').waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.platform('fullhd').wait(32)
      cy.testVisual('menu-bar-fullhd')

      cy.platform('highDefinition').wait(32)
      cy.testVisual('menu-bar-highDefinition')

      cy.platform('widescreen').wait(32)
      cy.testVisual('menu-bar-widescreen')

      cy.platform('desktop').wait(32)
      cy.testVisual('menu-bar-desktop')

      cy.platform('tablet').wait(32)
      cy.testVisual('menu-bar-tablet')

      cy.platform('mobile').wait(32)
      cy.testVisual('menu-bar-mobile')
    })
  })
})
