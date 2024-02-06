import { Platforms, balViewport } from 'support/utils'

describe('bal-popup', () => {
  function testPopup(name: string, platform: Platforms = 'desktop') {
    const opt: any = {
      errorThreshold: 0.3,
      capture: 'viewport',
      clip: balViewport[platform],
    }
    cy.testVisual(`popup-${name}-${platform}`, opt)
    cy.getByTestId(`${name}-trigger`).click().waitForComponents()
    cy.testVisual(`popup-${name}-${platform}-open`, opt)
    cy.getByTestId(`${name}-trigger`).click().waitForComponents()
  }

  context('desktop', () => {
    beforeEach(() => {
      cy.visit('/components/bal-popup/test/bal-popup.visual.html').platform('desktop').waitForDesignSystem()
    })

    it('basic component desktop', () => {
      testPopup('basic')
    })
  })
})
