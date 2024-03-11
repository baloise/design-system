import { Platforms, balViewport } from 'support/utils'

describe('bal-nav - touch', () => {
  testNavigationOnTouch('tablet')
  testNavigationOnTouch('mobile')

  function testNavigationOnTouch(platform: Platforms) {
    describe(platform, () => {
      const visualOptions: any = {
        errorThreshold: 0.2,
        capture: 'viewport',
        clip: balViewport[platform],
      }

      beforeEach(() => {
        cy.visit('/components/bal-nav/test/bal-nav.visual.html').platform(platform).waitForDesignSystem()
      })

      it('closed menu on top', () => {
        cy.testVisual(`nav-touch-${platform}-closed-top`, visualOptions)
      })

      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.waitForBrowser()
        cy.testVisual(`nav-touch-${platform}-closed-bottom`, visualOptions)
      })

      it('open menu', () => {
        cy.scrollTo('top')
        cy.getByTestId('basic')
          .find('.bal-nav-meta-bar')
          .find('bal-stack > bal-button')
          .eq(1)
          .click()
          .waitForComponents()
        cy.testVisual(`nav-touch-${platform}-open`, visualOptions)
      })
    })
  }
})
