describe('bal-tooltip', () => {
  testTooltip('desktop')

  function testTooltip(platform: 'desktop' | 'mobile') {
    describe(platform, () => {
      beforeEach(() =>
        cy.visit('/components/bal-tooltip/test/bal-tooltip.visual.html').platform(platform).waitForDesignSystem(),
      )

      it('basic tooltip', () => {
        cy.getByTestId('basic-trigger').click()
        cy.compareSnapshot(`tooltip-basic-${platform}`)
        cy.get('body').type('{esc}')
      })

      it('with placement on the right', () => {
        cy.getByTestId('placement-right-trigger').invoke('show').click({ force: true })
        cy.compareSnapshot(`tooltip-right-placement-${platform}`)
      })
    })
  }
})
