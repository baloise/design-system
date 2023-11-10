import { Platforms } from '../../../src/types'
import { compareSnapshotOptions } from './snapshot-util'

describe('bal-nav - colors', () => {
  testNavigationOnDesktop('widescreen')

  function testNavigationOnDesktop(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.platform(platform).visit('/components/bal-nav/test/bal-nav-colors.visual.html').waitForDesignSystem()
      })

      it('open menu', () => {
        cy.contains('Versichern').click()
        cy.wait(400)
        cy.compareSnapshot(`nav-colors-desktop-${platform}-open`, compareSnapshotOptions(platform, 0, 0, 0.2))
      })
    })
  }
})

describe('bal-nav - long', () => {
  context('long-texts', () => {
    it('mobile', () => {
      cy.platform('mobile').visit('/components/bal-nav/test/bal-nav-long.visual.html').waitForDesignSystem()
      cy.getByTestId('basic').find('.bal-nav-meta-bar').find('bal-stack > bal-button').eq(1).click()
      cy.compareSnapshot(`nav-long-mobile-open`, compareSnapshotOptions('mobile', 0, 0, 0.2))
    })

    it('desktop', () => {
      cy.platform('desktop').visit('/components/bal-nav/test/bal-nav-long.visual.html').waitForDesignSystem()
      cy.contains('Versichern').click()
      cy.wait(400)
      cy.compareSnapshot(`nav-long-desktop-open`, compareSnapshotOptions('desktop', 0, 0, 0.2))
    })
  })
})
