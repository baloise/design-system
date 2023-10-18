import { Platforms } from '../../../src/types'
import { compareSnapshotOptions } from './snapshot-util'

describe('bal-nav', () => {
  testNavigationOnDesktop('widescreen')
  testNavigationOnDesktop('highDefinition')
  testNavigationOnDesktop('desktop')

  testNavigationOnTouch('tablet')
  testNavigationOnTouch('mobile')

  function testNavigationOnDesktop(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-nav/test/bal-nav.visual.html').platform(platform).waitForDesignSystem().wait(400)
      })

      it('closed menu on top', () => {
        cy.compareSnapshot(`nav-desktop-${platform}-closed-top`, compareSnapshotOptions(platform, 0, 0))
      })

      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.compareSnapshot(`nav-desktop-${platform}-closed-bottom`, compareSnapshotOptions(platform, 0, 200))
      })

      it('open menu', () => {
        cy.getByTestId('basic')
          .find('.bal-nav-menu-bar__inner')
          .find('.bal-carousel__inner__container > bal-carousel-item')
          .eq(0)
          .find('button')
          .click()
        cy.wait(400)
        cy.compareSnapshot(`nav-desktop-${platform}-open`, compareSnapshotOptions(platform, 0, 0))
      })

      it('open menu second tab', () => {
        cy.getByTestId('basic')
          .find('.bal-nav-menu-bar__inner')
          .find('.bal-carousel__inner__container > bal-carousel-item')
          .eq(1)
          .find('button')
          .click()
        cy.wait(400)
        cy.compareSnapshot(`nav-desktop-${platform}-open-menu-second-tab`, compareSnapshotOptions(platform, 0, 0))
      })

      it('open search popoup', () => {
        cy.getByTestId('basic').find('#bal-nav__meta-buttons').eq(0).click()
        cy.wait(400)
        cy.compareSnapshot(`nav-desktop-${platform}-open-search-popup`, compareSnapshotOptions(platform, 0, 0))
      })
    })
  }

  function testNavigationOnTouch(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-nav/test/bal-nav.visual.html').platform(platform).waitForDesignSystem()
      })

      it('closed menu on top', () => {
        cy.compareSnapshot(`nav-touch-${platform}-closed-top`, compareSnapshotOptions(platform, 0, 0))
      })

      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.wait(400)
        cy.compareSnapshot(`nav-touch-${platform}-closed-bottom`, compareSnapshotOptions(platform, 0, 200))
      })

      it('open menu', () => {
        cy.scrollTo('top')
        cy.getByTestId('basic').find('.bal-nav-meta-bar').find('bal-stack > bal-button').eq(2).click()
        cy.wait(400)
        cy.compareSnapshot(`nav-touch-${platform}-open`, compareSnapshotOptions(platform, 0, 0))
      })
    })
  }
})

describe('bal-nav-colors', () => {
  testNavigationOnDesktop('widescreen')

  function testNavigationOnDesktop(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-nav/test/bal-nav-colors.visual.html').platform(platform).waitForDesignSystem()
      })

      it('open menu', () => {
        cy.contains('Versichern').click()
        cy.wait(400)
        cy.compareSnapshot(`nav-colors-desktop-${platform}-open`, compareSnapshotOptions(platform, 0, 0))
      })
    })
  }
})

describe('bal-nav-long', () => {
  context('long-texts', () => {
    it('mobile', () => {
      cy.visit('/components/bal-nav/test/bal-nav-long.visual.html').platform('mobile').waitForDesignSystem()
      cy.getByTestId('basic').find('.bal-nav-meta-bar').find('bal-stack > bal-button').eq(2).click()
      cy.compareSnapshot(`nav-long-mobile-open`, compareSnapshotOptions('mobile', 0, 0))
    })

    it('desktop', () => {
      cy.visit('/components/bal-nav/test/bal-nav-long.visual.html').platform('desktop').waitForDesignSystem()
      cy.contains('Versichern').click()
      cy.wait(400)
      cy.compareSnapshot(`nav-long-desktop-open`, compareSnapshotOptions('desktop', 0, 0))
    })
  })
})
