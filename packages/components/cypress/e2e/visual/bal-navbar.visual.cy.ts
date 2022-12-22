import { Platforms } from '../../../src/types'

describe('bal-navbar', () => {
  testNavbar('desktop')
  testNavbar('tablet')
  testNavbar('mobile')

  function testNavbar(platform: Platforms) {
    describe(platform, () => {
      before(() => {
        cy.page('/components/bal-navbar/test/bal-navbar.visual.html')
          .then(() => {
            return new Promise(resolve => {
              if ('requestIdleCallback' in window) {
                ;(window as any).requestIdleCallback(resolve)
              } else {
                setTimeout(resolve, 32)
              }
            })
          })
          .wait(500)
      })

      beforeEach(() => {
        cy.platform(platform)
          .getComponent('bal-navbar')
          .then(() => {
            return new Promise(resolve => {
              if ('requestIdleCallback' in window) {
                ;(window as any).requestIdleCallback(resolve)
              } else {
                setTimeout(resolve, 32)
              }
            })
          })
          .wait(500)
      })

      it('basic component', () => {
        cy.platform(platform)
        cy.getByTestId('basic').compareSnapshot(`navbar-basic-${platform}`, 0.0)
        if (platform !== 'desktop') {
          cy.getByTestId('basic').find('.bal-navbar__brand__burger').click()
          cy.compareSnapshot(`navbar-basic-opened-${platform}`, 0.0)
          cy.getByTestId('basic').find('.bal-navbar__brand__burger').click()
        }
        cy.getByTestId('simple-light').compareSnapshot(`navbar-simple-light-${platform}`, 0.0)
        cy.getByTestId('container').compareSnapshot(`navbar-container-${platform}`, 0.0)
      })
    })
  }
})
