describe('bal-radio-button', () => {
  testRadioButton('mobile')
  testRadioButton('tablet')
  testRadioButton('desktop')

  function testRadioButton(platform: 'mobile' | 'tablet' | 'desktop') {
    beforeEach(() =>
      cy.visit('/components/bal-radio/test/bal-radio-button.visual.html').platform(platform).waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.getByTestId('basic').testVisual(`radio-button-basic-${platform}`)
      cy.getByTestId('grid').testVisual(`radio-button-grid-${platform}`)
      cy.getByTestId('colors').testVisual(`radio-button-colors-${platform}`)
    })
  }
})
