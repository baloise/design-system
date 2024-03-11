import { Platforms } from '../../support/utils'

describe.skip('bal-navigation', () => {
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
        cy.testVisual(`navigation-desktop-${platform}-closed-top`, 0.2)
      })
      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.testVisual(`navigation-desktop-${platform}-closed-bottom`, 0.2)
      })
      it('open menu', () => {
        cy.contains('Versichern').click()
        cy.wait(400)
        cy.testVisual(`navigation-desktop-${platform}-open`, 0.2)
      })
    })
  }

  function testNavigationOnTouch(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-navigation/test/bal-navigation.visual.html').platform(platform).waitForDesignSystem()
      })

      it('closed menu on top', () => {
        cy.testVisual(`navigation-touch-${platform}-closed-top`, 0.2)
      })
      it('closed menu on bottom', () => {
        cy.scrollTo('bottom')
        cy.testVisual(`navigation-touch-${platform}-closed-bottom`, 0.2)
      })
      it('open menu', () => {
        cy.scrollTo('top')
        cy.getByTestId('navigation-burger').click()
        cy.testVisual(`navigation-touch-${platform}-open`, 0.2)
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
        cy.testVisual(`navigation-colors-desktop-${platform}-open`, 0.2)
      })
    })
  }
})
