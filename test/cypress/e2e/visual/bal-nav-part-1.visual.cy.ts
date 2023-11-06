import { Platforms } from '../../../src/types'
import { compareSnapshotOptions } from './snapshot-util'

describe('bal-nav - desktop', () => {
  testNavigationOnDesktop('widescreen')
  testNavigationOnDesktop('highDefinition')
  testNavigationOnDesktop('desktop')

  function testNavigationOnDesktop(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.platform(platform).visit('/components/bal-nav/test/bal-nav.visual.html').waitForDesignSystem().wait(400)
      })

      it('closed menu on top', () => {
        cy.compareSnapshot(`nav-desktop-${platform}-closed-top`, compareSnapshotOptions(platform, 0, 0, 0.2))
      })

      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.compareSnapshot(`nav-desktop-${platform}-closed-bottom`, compareSnapshotOptions(platform, 0, 200, 0.2))
      })

      it('open menu', () => {
        cy.getByTestId('basic')
          .find('.bal-nav-menu-bar__inner')
          .find('.bal-carousel__inner__container > bal-carousel-item')
          .eq(0)
          .find('button')
          .click()
        cy.wait(400)
        cy.compareSnapshot(`nav-desktop-${platform}-open`, compareSnapshotOptions(platform, 0, 0, 0.2))
      })

      it('open menu second tab', () => {
        cy.getByTestId('basic')
          .find('.bal-nav-menu-bar__inner')
          .find('.bal-carousel__inner__container > bal-carousel-item')
          .eq(1)
          .find('button')
          .click()
        cy.wait(400)
        cy.compareSnapshot(`nav-desktop-${platform}-open-menu-second-tab`, compareSnapshotOptions(platform, 0, 0, 0.2))
      })

      it('open search popoup', () => {
        cy.getByTestId('basic').find('#bal-nav__meta-buttons').eq(0).click()
        cy.wait(400)
        cy.compareSnapshot(`nav-desktop-${platform}-open-search-popup`, compareSnapshotOptions(platform, 0, 0, 0.2))
      })
    })
  }
})
