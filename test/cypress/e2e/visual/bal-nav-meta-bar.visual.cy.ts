describe('bal-nav-meta-bar', () => {
  describe('basic', () => {
    beforeEach(() =>
      cy.visit('/components/bal-nav/bal-nav-meta-bar/test/bal-nav-meta-bar.visual.html').waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.platform('desktop')
      cy.compareSnapshot('meta-bar-desktop')

      cy.platform('tablet')
      cy.compareSnapshot('meta-bar-tablet')

      cy.platform('mobile')
      cy.compareSnapshot('meta-bar-mobile')
    })
  })
})
