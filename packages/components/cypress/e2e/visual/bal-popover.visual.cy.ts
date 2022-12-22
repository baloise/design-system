describe('bal-popover', () => {
  testPopover('mobile')
  testPopover('desktop')

  function testPopover(platform: 'desktop' | 'mobile') {
    describe(platform, () => {
      beforeEach(() =>
        cy
          .page('/components/bal-popover/test/bal-popover.visual.html')
          .platform(platform)
          .then(() => {
            return new Promise(resolve => {
              if ('requestIdleCallback' in window) {
                ;(window as any).requestIdleCallback(resolve)
              } else {
                setTimeout(resolve, 32)
              }
            })
          }),
      )

      it('basic component', () => {
        cy.getByTestId('popover-trigger').click()
        cy.compareSnapshot(`popover-basic-${platform}`, 0.0)
        cy.get('body').type('{esc}')
      })

      it('arrow backdrop component', () => {
        cy.getByTestId('popover-arrow-trigger').click()
        cy.compareSnapshot(`popover-arrow-${platform}`, 0.0)
        cy.get('body').type('{esc}')
      })

      it('tooltip component', () => {
        cy.getByTestId('popover-tooltip-trigger').invoke('show').click({ force: true })
        cy.compareSnapshot(`popover-tooltip-${platform}`, 0.0)
      })
    })
  }
})
