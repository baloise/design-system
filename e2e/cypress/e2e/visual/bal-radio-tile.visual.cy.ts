describe('bal-radio-tile', () => {
  testRadioButton('mobile')
  testRadioButton('tablet')
  testRadioButton('desktop')

  function testRadioButton(platform: 'mobile' | 'tablet' | 'desktop') {
    beforeEach(() =>
      cy.visit('/components/bal-radio/test/bal-radio-tiles.visual.html').platform(platform).waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.getByTestId('basic').testVisual(`radio-tile-basic-${platform}`)
      cy.getByTestId('grid').testVisual(`radio-tile-grid-${platform}`)
      cy.getByTestId('colors').testVisual(`radio-tile-colors-${platform}`)
    })
  }
})
