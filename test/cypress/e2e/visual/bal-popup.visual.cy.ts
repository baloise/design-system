import { Platforms, balViewport } from 'support/utils'

describe('bal-popup', () => {
  const errorThreshold = 0.3

  function testPopup(name: string, platform: Platforms = 'desktop') {
    const opt: any = {
      errorThreshold: 0.3,
      capture: 'viewport',
      clip: balViewport[platform],
    }
    cy.wait(400).testVisual(`popup-${name}-${platform}`, opt)
    cy.getByTestId(`${name}-trigger`).click()
    cy.wait(400).testVisual(`popup-${name}-${platform}-open`, opt)
    cy.getByTestId(`${name}-trigger`).click()
  }

  context('mobile', () => {
    beforeEach(() => {
      cy.visit('/components/bal-popup/test/bal-popup.visual.html').platform('mobile').waitForDesignSystem().wait(400)
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
      const opt: any = {
        errorThreshold: 0.3,
        capture: 'viewport',
        clip: balViewport['mobile'],
      }
      cy.testVisual(`popup-fullscreen-mobile`, opt)
      cy.getByTestId(`fullscreen-trigger`).click()
      cy.testVisual(`popup-fullscreen-mobile-open`, opt)
      cy.get('body').type('{esc}')

      cy.testVisual(`popup-drawer-mobile`, opt)
      cy.getByTestId(`drawer-trigger`).click()
      cy.testVisual(`popup-drawer-mobile-open`, opt)
      cy.get('body').type('{esc}')
    })
  })

  context('desktop', () => {
    beforeEach(() => {
      cy.visit('/components/bal-popup/test/bal-popup.visual.html').platform('desktop').waitForDesignSystem().wait(400)
    })

    it('basic component desktop', () => {
      testPopup('basic')
      testPopup('basic-backdrop-arrow')
      testPopup('basic-backdrop-offset')
    })

    it.skip('placement property desktop', () => {
      testPopup('placement-right')
      testPopup('placement-left')
      testPopup('placement-top')
      testPopup('placement-bottom')
    })

    it('tabs combination desktop', () => {
      testPopup('tabs')
    })

    it('variant property desktop', () => {
      const opt: any = {
        errorThreshold: 0.3,
        capture: 'viewport',
        clip: balViewport['desktop'],
      }
      cy.wait(400).testVisual(`popup-fullscreen-desktop`, opt)
      cy.getByTestId(`fullscreen-trigger`).click()
      cy.wait(400).testVisual(`popup-fullscreen-desktop-open`, opt)
      cy.get('body').type('{esc}')

      cy.wait(400).testVisual(`popup-drawer-desktop`, opt)
      cy.getByTestId(`drawer-trigger`).click()
      cy.wait(400).testVisual(`popup-drawer-desktop-open`, opt)
      cy.get('body').type('{esc}')
    })
  })
})
