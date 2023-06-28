describe('bal-popup', () => {
  function testPopup(name: string, platform: 'mobile' | 'desktop' = 'desktop') {
    cy.compareSnapshot(`popup-${name}-${platform}`, 0.0)
    cy.getByTestId(`${name}-trigger`).click()
    cy.getByTestId(`basic`)
    cy.getByTestId(`popup-small`)
    cy.compareSnapshot(`popup-${name}-${platform}-open`, 0.0)
    cy.getByTestId(`${name}-trigger`).click()
  }

  context('mobile', () => {
    beforeEach(() => {
      cy.visit('/components/bal-popup/test/bal-popup.visual.html').platform('mobile').waitForDesignSystem().wait(32)
    })

    it('basic component mobile', () => {
      testPopup('basic', 'mobile')
      testPopup('basic-backdrop-arrow', 'mobile')
      testPopup('basic-backdrop-offset', 'mobile')
    })

    it('placement property mobile', () => {
      testPopup('placement-right', 'mobile')
      testPopup('placement-left', 'mobile')
      testPopup('placement-top', 'mobile')
      testPopup('placement-bottom', 'mobile')
    })

    it('tabs combination mobile', () => {
      testPopup('tabs', 'mobile')
    })

    it('variant property mobile', () => {
      cy.compareSnapshot(`popup-fullscreen-mobile`, 0.0)
      cy.getByTestId(`fullscreen-trigger`).click()
      cy.getByTestId(`popup-tabs`)
      cy.compareSnapshot(`popup-fullscreen-mobile-open`, 0.0)
      cy.get('body').type('{esc}').wait(32)

      cy.compareSnapshot(`popup-drawer-mobile`, 0.0)
      cy.getByTestId(`drawer-trigger`).click()
      cy.getByTestId(`popup-tabs`)
      cy.compareSnapshot(`popup-drawer-mobile-open`, 0.0)
      cy.get('body').type('{esc}').wait(32)
    })
  })

  context('desktop', () => {
    beforeEach(() => {
      cy.visit('/components/bal-popup/test/bal-popup.visual.html').platform('desktop').waitForDesignSystem().wait(32)
    })

    it('basic component desktop', () => {
      testPopup('basic')
      testPopup('basic-backdrop-arrow')
      testPopup('basic-backdrop-offset')
    })

    it('placement property desktop', () => {
      testPopup('placement-right')
      testPopup('placement-left')
      testPopup('placement-top')
      testPopup('placement-bottom')
    })

    it('tabs combination desktop', () => {
      testPopup('tabs')
    })

    it('variant property desktop', () => {
      cy.compareSnapshot(`popup-fullscreen-desktop`, 0.0)
      cy.getByTestId(`fullscreen-trigger`).click()
      cy.getByTestId(`popup-tabs`)
      cy.compareSnapshot(`popup-fullscreen-desktop-open`, 0.0)
      cy.get('body').type('{esc}').wait(32)

      cy.compareSnapshot(`popup-drawer-desktop`, 0.0)
      cy.getByTestId(`drawer-trigger`).click()
      cy.getByTestId(`popup-tabs`)
      cy.compareSnapshot(`popup-drawer-desktop-open`, 0.0)
      cy.get('body').type('{esc}').wait(32)
    })
  })
})
