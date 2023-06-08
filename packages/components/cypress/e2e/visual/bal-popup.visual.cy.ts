describe('bal-popup', () => {
  testRadioButton('mobile')
  testRadioButton('desktop')

  function testRadioButton(platform: 'mobile' | 'desktop') {
    beforeEach(() =>
      cy.visit('/components/bal-popup/test/bal-popup.visual.html').platform(platform).waitForDesignSystem().wait(32),
    )

    it('basic component ' + platform, () => {
      cy.compareSnapshot(`popup-basic-${platform}`, 0.0)
      cy.getByTestId('basic-trigger').click()
      cy.compareSnapshot(`popup-basic-${platform}-open`, 0.0)
      cy.get('body').type('{esc}').wait(32)

      cy.getByTestId('popover-left-trigger').click().wait(32)
      cy.compareSnapshot(`popup-popover-left-${platform}-open`, 0.0)
      cy.getByTestId('popover-right-trigger').click().wait(32)
      cy.compareSnapshot(`popup-popover-right-${platform}-open`, 0.0)
      cy.get('body').type('{esc}').wait(32)

      cy.compareSnapshot(`popup-fullscreen-${platform}`, 0.0)
      cy.getByTestId('fullscreen-trigger').click().wait(32)
      cy.compareSnapshot(`popup-fullscreen-${platform}-open`, 0.0)
      cy.get('body').type('{esc}').wait(32)

      cy.compareSnapshot(`popup-drawer-${platform}`, 0.0)
      cy.getByTestId('drawer-trigger').click().wait(32)
      cy.compareSnapshot(`popup-drawer-${platform}-open`, 0.0)
      cy.get('body').type('{esc}').wait(32)
    })
  }
})
