import { balViewport } from 'support/utils'

describe('bal-popover', () => {
  testPopover('mobile')
  testPopover('desktop')

  function testPopover(platform: 'desktop' | 'mobile') {
    describe(platform, () => {
      beforeEach(() =>
        cy
          .visit('/components/bal-popover/test/bal-popover.visual.html')
          .platform(platform)
          .waitForDesignSystem()
          .wait(32),
      )

      it('basic component ' + platform, () => {
        cy.getByTestId('popover-trigger').click()
        cy.testVisual(`popover-basic-${platform}`, {
          errorThreshold: 0.2,
          capture: 'viewport',
          clip: balViewport[platform],
        })
        cy.get('body').type('{esc}')
      })

      it('arrow backdrop component + platform ', () => {
        cy.getByTestId('popover-arrow-trigger').click()
        cy.testVisual(`popover-arrow-${platform}`, {
          errorThreshold: 0.2,
          capture: 'viewport',
          clip: balViewport[platform],
        })
        cy.get('body').type('{esc}')
      })

      it('tooltip component ' + platform, () => {
        cy.getByTestId('popover-tooltip-trigger').invoke('show').click({ force: true })
        cy.testVisual(`popover-tooltip-${platform}`, {
          errorThreshold: 0.2,
          capture: 'viewport',
          clip: balViewport[platform],
        })
      })
    })
  }
})
