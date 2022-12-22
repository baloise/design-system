import { Platforms } from '../../../src/types'
import { compareSnapshotOptions } from './snapshot-util'

describe('bal-navigation', () => {
  testNavigationOnDesktop('widescreen')
  testNavigationOnDesktop('highDefinition')
  testNavigationOnDesktop('desktop')

  testNavigationOnTouch('tablet')
  testNavigationOnTouch('mobile')

  function testNavigationOnDesktop(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.page('/components/bal-navigation/test/bal-navigation.visual.html')
          .platform(platform)
          .getComponent('bal-navigation')
          .then(() => {
            return new Promise(resolve => {
              if ('requestIdleCallback' in window) {
                ;(window as any).requestIdleCallback(resolve)
              } else {
                setTimeout(resolve, 32)
              }
            })
          })
          .wait(500)
      })

      it('closed menu on top', () => {
        cy.compareSnapshot(`navigation-desktop-${platform}-closed-top`, compareSnapshotOptions(platform, 0, 0, 0.1))
      })
      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.compareSnapshot(
          `navigation-desktop-${platform}-closed-bottom`,
          compareSnapshotOptions(platform, 0, 200, 0.1),
        )
      })
      it('open menu', () => {
        cy.scrollTo('top')
        cy.contains('Versichern').click()
        cy.compareSnapshot(`navigation-desktop-${platform}-open`, compareSnapshotOptions(platform, 0, 0, 0.1))
      })
      // TODO: Check why this fails
      it.skip('open popover', () => {
        cy.get('.bal-nav__meta__end').find('button').first().click()
        cy.compareSnapshot(`navigation-desktop-${platform}-popover-open`, compareSnapshotOptions(platform, 0, 0, 0.1))
      })
    })
  }

  function testNavigationOnTouch(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.page('/components/bal-navigation/test/bal-navigation.visual.html')
          .platform(platform)
          .getComponent('bal-navigation')
          .then(() => {
            return new Promise(resolve => {
              if ('requestIdleCallback' in window) {
                ;(window as any).requestIdleCallback(resolve)
              } else {
                setTimeout(resolve, 32)
              }
            })
          })
          .wait(500)
      })

      it('closed menu on top', () => {
        cy.compareSnapshot(`navigation-touch-${platform}-closed-top`, compareSnapshotOptions(platform, 0, 0, 0))
      })
      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.compareSnapshot(`navigation-touch-${platform}-closed-bottom`, compareSnapshotOptions(platform, 0, 200, 0))
      })
      it('open menu', () => {
        cy.scrollTo('top')
        cy.getByTestId('navigation-burger').click()
        cy.compareSnapshot(`navigation-touch-${platform}-open`, compareSnapshotOptions(platform, 0, 0, 0))
      })
      // TODO: Check why this fails
      it.skip('open popover', () => {
        cy.get('.bal-nav__foot-mobile').find('button').first().click().wait(100)
        cy.compareSnapshot(`navigation-touch-${platform}-popover-open`, compareSnapshotOptions(platform, 0, 0, 0))
        cy.get('.bal-nav__foot-mobile').find('button').first().click()
      })
    })
  }
})
