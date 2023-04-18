describe('bal-checkbox-button', () => {
  testCheckboxButton('mobile')
  testCheckboxButton('tablet')
  testCheckboxButton('desktop')

  function testCheckboxButton(platform: 'mobile' | 'tablet' | 'desktop') {
    beforeEach(() =>
      cy
        .visit('/components/form/bal-checkbox/test/bal-checkbox-button.visual.html')
        .platform(platform)
        .waitForDesignSystem(),
    )

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot(`checkbox-button-basic-${platform}`, 0.0)
      cy.getByTestId('grid').compareSnapshot(`checkbox-button-grid-${platform}`, 0.0)
      cy.getByTestId('colors').compareSnapshot(`checkbox-button-colors-${platform}`, 0.0)
    })
  }
})
