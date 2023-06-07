describe('bal-meta-bar', () => {
  describe('basic', () => {
    beforeEach(() => cy.visit('/components/bal-meta-bar/test/bal-meta-bar.visual.html').waitForDesignSystem())

    it('basic component', () => {
      cy.platform('desktop')
      cy.getByTestId('basic').compareSnapshot('meta-bar-desktop', 0.0)

      cy.platform('tablet')
      cy.getByTestId('basic').compareSnapshot('meta-bar-tablet', 0.0)

      cy.platform('mobile')
      cy.getByTestId('basic').compareSnapshot('meta-bar-mobile', 0.0)
    })
  })
})
