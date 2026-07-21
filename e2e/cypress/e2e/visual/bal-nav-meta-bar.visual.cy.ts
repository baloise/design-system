describe('bal-nav-meta-bar', () => {
  describe('basic', () => {
    beforeEach(() =>
      cy.visit('/components/bal-nav/bal-nav-meta-bar/test/bal-nav-meta-bar.visual.html').waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.platform('desktop').wait(32)
      cy.testVisual('meta-bar-desktop')

      cy.platform('tablet').wait(32)
      cy.testVisual('meta-bar-tablet')

      cy.platform('mobile').wait(32)
      cy.testVisual('meta-bar-mobile')
    })
  })
})
