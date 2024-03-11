import { Platforms } from '../../support/utils'

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
        cy.getByTestId('basic').testVisual(`navbar-basic-${platform}`)
        if (platform !== 'desktop') {
          cy.getByTestId('basic').find('.bal-navbar__brand__burger').click().wait(100)
          cy.testVisual(`navbar-basic-opened-${platform}`)
          cy.getByTestId('basic').find('.bal-navbar__brand__burger').click().wait(100)
        }
        cy.getByTestId('simple-light').testVisual(`navbar-simple-light-${platform}`)
        cy.getByTestId('container').testVisual(`navbar-container-${platform}`)
      })
    })
  }
})
