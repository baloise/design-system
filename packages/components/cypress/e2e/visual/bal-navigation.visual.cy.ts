import { Platforms } from '../../../src/types'
import { compareSnapshotOptions } from './snapshot-util'

describe('bal-navigation', () => {
  function testNavigationOnDesktop(platform: Platforms) {
    describe(platform, () => {
      before(() => {
        cy.page('/components/bal-navigation/test/bal-navigation.visual.html')
      })

      beforeEach(() => {
        cy.platform(platform).getComponent('bal-navigation').wait(200)
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
      it('open popover', () => {
        cy.get('.bal-nav__meta__end').find('button').first().click()
        cy.compareSnapshot(`navigation-desktop-${platform}-popover-open`, compareSnapshotOptions(platform, 0, 0, 0.1))
      })
    })
  }

  testNavigationOnDesktop('widescreen')
  testNavigationOnDesktop('highDefinition')
  testNavigationOnDesktop('desktop')

  function testNavigationOnTouch(platform: Platforms) {
    describe(platform, () => {
      before(() => cy.page('/components/bal-navigation/test/bal-navigation.visual.html'))

      beforeEach(() => {
        cy.platform(platform).getComponent('bal-navigation').wait(200)
      })

      it('closed menu on top', () => {
        cy.compareSnapshot(`navigation-touch-${platform}-closed-top`, compareSnapshotOptions(platform, 0, 0, 0.1))
      })
      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.compareSnapshot(`navigation-touch-${platform}-closed-bottom`, compareSnapshotOptions(platform, 0, 200, 0.1))
      })
      it('open menu', () => {
        cy.scrollTo('top')
        cy.getByTestId('navigation-burger').click()
        cy.compareSnapshot(`navigation-touch-${platform}-open`, compareSnapshotOptions(platform, 0, 0, 0.1))
      })
      it('open popover', () => {
        cy.get('.bal-nav__foot-mobile').find('button').first().click().wait(100)
        cy.compareSnapshot(`navigation-touch-${platform}-popover-open`, compareSnapshotOptions(platform, 0, 0, 0.1))
        cy.get('.bal-nav__foot-mobile').find('button').first().click()
      })
    })
  }

  testNavigationOnTouch('tablet')
  testNavigationOnTouch('mobile')
})
