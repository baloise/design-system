import { Platforms } from '../../support/utils'
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
        cy.visit('/components/bal-navigation/test/bal-navigation.visual.html')
          .platform(platform)
          .waitForDesignSystem()
          .wait(400)
      })

      it('closed menu on top', () => {
        cy.compareSnapshot(`navigation-desktop-${platform}-closed-top`, compareSnapshotOptions(platform, 0, 0))
      })
      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.compareSnapshot(`navigation-desktop-${platform}-closed-bottom`, compareSnapshotOptions(platform, 0, 200))
      })
      it('open menu', () => {
        cy.contains('Versichern').click()
        cy.wait(400)
        cy.compareSnapshot(`navigation-desktop-${platform}-open`, compareSnapshotOptions(platform, 0, 0))
      })
    })
  }

  function testNavigationOnTouch(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-navigation/test/bal-navigation.visual.html').platform(platform).waitForDesignSystem()
      })

      it('closed menu on top', () => {
        cy.compareSnapshot(`navigation-touch-${platform}-closed-top`, compareSnapshotOptions(platform, 0, 0))
      })
      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.compareSnapshot(`navigation-touch-${platform}-closed-bottom`, compareSnapshotOptions(platform, 0, 200))
      })
      it('open menu', () => {
        cy.scrollTo('top')
        cy.getByTestId('navigation-burger').click()
        cy.compareSnapshot(`navigation-touch-${platform}-open`, compareSnapshotOptions(platform, 0, 0))
      })
    })
  }
})

describe('bal-navigation-colors', () => {
  testNavigationOnDesktop('widescreen')

  function testNavigationOnDesktop(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-navigation/test/bal-navigation-colors.visual.html')
          .platform(platform)
          .waitForDesignSystem()
      })

      it('open menu', () => {
        cy.contains('Versichern').click()
        cy.wait(400)
        cy.compareSnapshot(`navigation-colors-desktop-${platform}-open`, compareSnapshotOptions(platform, 0, 0))
      })
    })
  }
})
