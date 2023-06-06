import { Platforms } from '../../../src/types'

describe('bal-navbar', () => {
  testNavbar('desktop')
  testNavbar('tablet')
  testNavbar('mobile')

  function testNavbar(platform: Platforms) {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-navbar/test/bal-navbar.visual.html')
          .platform(platform)
          .waitForDesignSystem()
          .wait(100)
      })

      it('basic component', () => {
        cy.getByTestId('basic').compareSnapshot(`navbar-basic-${platform}`, 0.0)
        if (platform !== 'desktop') {
          cy.getByTestId('basic').find('.bal-navbar__brand__burger').click().wait(100)
          cy.compareSnapshot(`navbar-basic-opened-${platform}`, 0.0)
          cy.getByTestId('basic').find('.bal-navbar__brand__burger').click().wait(100)
        }
        cy.getByTestId('simple-light').compareSnapshot(`navbar-simple-light-${platform}`, 0.0)
        cy.getByTestId('container').compareSnapshot(`navbar-container-${platform}`, 0.0)
      })
    })
  }
})
