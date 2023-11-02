import { Platforms } from '../../../src/types'
import { compareSnapshotOptions } from './snapshot-util'

describe('bal-nav - touch', () => {
  testNavigationOnTouch('tablet')
  testNavigationOnTouch('mobile')

  function testNavigationOnTouch(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-nav/test/bal-nav.visual.html').platform(platform).waitForDesignSystem()
      })

      it('closed menu on top', () => {
        cy.compareSnapshot(`nav-touch-${platform}-closed-top`, compareSnapshotOptions(platform, 0, 0, 0.2))
      })

      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.wait(400)
        cy.compareSnapshot(`nav-touch-${platform}-closed-bottom`, compareSnapshotOptions(platform, 0, 200, 0.2))
      })

      it('open menu', () => {
        cy.scrollTo('top')
        cy.getByTestId('basic').find('.bal-nav-meta-bar').find('bal-stack > bal-button').eq(1).click()
        cy.wait(400)
        cy.compareSnapshot(`nav-touch-${platform}-open`, compareSnapshotOptions(platform, 0, 0, 0.2))
      })
    })
  }
})
