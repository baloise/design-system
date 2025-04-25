describe('bal-checkbox tile', () => {
  testCheckboxTile('mobile')
  testCheckboxTile('tablet')
  testCheckboxTile('desktop')

  function testCheckboxTile(platform: 'mobile' | 'tablet' | 'desktop') {
    beforeEach(() =>
      cy.visit('/components/bal-checkbox/test/bal-checkbox-tiles.visual.html').platform(platform).waitForDesignSystem(),
    )

    it('basic component', () => {
      const opts = {
        errorThreshold: 0.35,
      }
      cy.getByTestId('basic').testVisual(`checkbox-tile-basic-${platform}`, opts)
      cy.getByTestId('grid').testVisual(`checkbox-tile-grid-${platform}`, opts)
      cy.getByTestId('colors').testVisual(`checkbox-tile-colors-${platform}`, opts)
    })
  }
})
