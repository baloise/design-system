import { balViewport } from 'support/utils'

describe('bal-nav-menu-flyout', () => {
  it('basic component', () => {
    cy.visit('/components/bal-nav/bal-nav-menu-flyout/test/bal-nav-menu-flyout.visual.html')
      .platform('fullhd')
      .waitForDesignSystem()

    cy.testVisual('menu-flyout-fullhd', {
      errorThreshold: 0.3,
      capture: 'viewport',
      clip: balViewport['fullhd'],
    })

    cy.platform('highDefinition')
    cy.testVisual('menu-flyout-highDefinition', {
      errorThreshold: 0.3,
      capture: 'viewport',
      clip: balViewport['highDefinition'],
    })

    cy.platform('widescreen')
    cy.testVisual('menu-flyout-widescreen', {
      errorThreshold: 0.3,
      capture: 'viewport',
      clip: balViewport['widescreen'],
    })

    cy.platform('desktop')
    cy.testVisual('menu-flyout-desktop', {
      errorThreshold: 0.3,
      capture: 'viewport',
      clip: balViewport['desktop'],
    })
  })

  it('basic component touch', () => {
    cy.visit('/components/bal-nav/bal-nav-menu-flyout/test/bal-nav-menu-flyout.visual.html')
      .platform('tablet')
      .waitForDesignSystem()

    cy.testVisual('menu-flyout-tablet', {
      errorThreshold: 0.3,
      capture: 'viewport',
      clip: balViewport['tablet'],
    })

    cy.platform('mobile')
    cy.testVisual('menu-flyout-mobile', {
      errorThreshold: 0.3,
      capture: 'viewport',
      clip: balViewport['mobile'],
    })
  })
})
