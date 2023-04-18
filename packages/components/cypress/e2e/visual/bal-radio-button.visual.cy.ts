describe('bal-radio-button', () => {
  testRadioButton('mobile')
  testRadioButton('tablet')
  testRadioButton('desktop')

  function testRadioButton(platform: 'mobile' | 'tablet' | 'desktop') {
    beforeEach(() =>
      cy.visit('/components/form/bal-radio/test/bal-radio-button.visual.html').platform(platform).waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot(`radio-button-basic-${platform}`, 0.0)
      cy.getByTestId('grid').compareSnapshot(`radio-button-grid-${platform}`, 0.0)
      cy.getByTestId('colors').compareSnapshot(`radio-button-colors-${platform}`, 0.0)
    })
  }
})
