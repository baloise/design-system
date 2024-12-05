import { Platforms, balViewport } from 'support/utils'

describe('bal-nav - colors', () => {
  testNavigationOnDesktop('widescreen')

  function testNavigationOnDesktop(platform: Platforms) {
    describe(platform, () => {
      const visualOptions: any = {
        errorThreshold: 0.2,
        capture: 'viewport',
        clip: balViewport[platform],
      }

      beforeEach(() => {
        cy.visit('/components/bal-nav/test/bal-nav-colors.visual.html').platform(platform).waitForDesignSystem()
      })

      it('open menu', () => {
        cy.contains('Versichern').click().waitForComponents()
        cy.testVisual(`nav-colors-desktop-${platform}-open`, visualOptions)
      })
    })
  }
})

describe('bal-nav - long', () => {
  context('long-texts', () => {
    it('mobile', () => {
      cy.visit('/components/bal-nav/test/bal-nav-long.visual.html').platform('mobile').waitForDesignSystem()
      cy.getByTestId('basic').find('.bal-nav-meta-bar').find('bal-stack > bal-button').eq(1).click().waitForComponents()
      cy.testVisual(`nav-long-mobile-open`, {
        errorThreshold: 0.2,
        capture: 'viewport',
        clip: balViewport['mobile'],
      })
    })

    it('desktop', () => {
      cy.visit('/components/bal-nav/test/bal-nav-long.visual.html').platform('desktop').waitForDesignSystem()
      cy.contains('Versichern').click().waitForComponents()
      cy.testVisual(`nav-long-desktop-open`, {
        errorThreshold: 0.2,
        capture: 'viewport',
        clip: balViewport['desktop'],
      })
    })
  })
})

describe('bal-nav - tab change', () => {
  it('should switch meta nav tab', () => {
    cy.visit('/components/bal-nav/test/bal-nav-long.visual.html').platform('desktop').waitForDesignSystem()
    cy.contains('Unternehmenskunden').click().waitForComponents().wait(100)
    cy.testVisual(`nav-long-desktop-meta-change`, {
      errorThreshold: 0.2,
      capture: 'viewport',
      clip: balViewport['desktop'],
    })
  })
})
