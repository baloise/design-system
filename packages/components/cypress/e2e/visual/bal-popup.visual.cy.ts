describe('bal-popup', () => {
  testRadioButton('mobile')
  testRadioButton('desktop')

  function testRadioButton(platform: 'mobile' | 'desktop') {
    context(platform, () => {
      before(() =>
        cy.visit('/components/bal-popup/test/bal-popup.visual.html').platform(platform).waitForDesignSystem().wait(32),
      )

      function testPopup(name: string) {
        cy.compareSnapshot(`popup-${name}-${platform}`, 0.0)
        cy.getByTestId(`${name}-trigger`).click()
        cy.compareSnapshot(`popup-${name}-${platform}-open`, 0.0)
        cy.get('body').type('{esc}').wait(32)
      }

      it('basic component ' + platform, () => {
        testPopup('basic')
        testPopup('basic-backdrop-arrow')
        testPopup('basic-backdrop-offset')
      })

      it('placement property ' + platform, () => {
        testPopup('placement-right')
        testPopup('placement-left')
        testPopup('placement-top')
        testPopup('placement-bottom')
      })

      it('variant property ' + platform, () => {
        testPopup('fullscreen')
        testPopup('drawer')
      })

      it('tabs combination ' + platform, () => {
        testPopup('tabs')
      })
    })
  }
})
