import { Platforms, balViewport } from 'support/utils'

describe('bal-nav - desktop', () => {
  testNavigationOnDesktop('widescreen')
  testNavigationOnDesktop('highDefinition')
  testNavigationOnDesktop('desktop')

  function testNavigationOnDesktop(platform: Platforms) {
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
        cy.testVisual(`nav-desktop-${platform}-closed-top`, visualOptions)
      })

      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.testVisual(`nav-desktop-${platform}-closed-bottom`, visualOptions)
      })

      it('open menu', () => {
        cy.getByTestId('basic')
          .find('.bal-nav-menu-bar__inner')
          .find('.bal-carousel__inner__container > bal-carousel-item')
          .eq(0)
          .find('button')
          .click()
          .waitForComponents()
        cy.testVisual(`nav-desktop-${platform}-open`, visualOptions)
      })

      it('open menu second tab', () => {
        cy.getByTestId('basic')
          .find('.bal-nav-menu-bar__inner')
          .find('.bal-carousel__inner__container > bal-carousel-item')
          .eq(1)
          .find('button')
          .click()
          .waitForComponents()
        cy.testVisual(`nav-desktop-${platform}-open-menu-second-tab`, visualOptions)
      })

      it('open search popoup', () => {
        cy.getByTestId('basic').find('#bal-nav__meta-buttons').eq(0).click().waitForComponents()
        cy.testVisual(`nav-desktop-${platform}-open-search-popup`, visualOptions)
      })
    })
  }
})
