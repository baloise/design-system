import { Platforms } from '../../../src/types'

describe('bal-nav - touch', () => {
  testNavigationOnTouch('tablet')
  testNavigationOnTouch('mobile')

  function testNavigationOnTouch(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.platform(platform).visit('/components/bal-nav/test/bal-nav.visual.html').waitForDesignSystem().wait(400)
      })

      it('closed menu on top', () => {
        cy.testVisual(`nav-touch-${platform}-closed-top`, 0.2)
      })

      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.wait(400)
        cy.testVisual(`nav-touch-${platform}-closed-bottom`, 0.2)
      })

      it('open menu', () => {
        cy.scrollTo('top')
        cy.getByTestId('basic').find('.bal-nav-meta-bar').find('bal-stack > bal-button').eq(1).click()
        cy.wait(400)
        cy.testVisual(`nav-touch-${platform}-open`, 0.2)
      })
    })
  }
})
