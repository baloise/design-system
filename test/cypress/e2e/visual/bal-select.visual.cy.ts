describe('bal-select', () => {
  visualSelectTest('desktop')
  visualSelectTest('mobile')

  visualSelectMultipleTest('desktop')
  visualSelectMultipleTest('mobile')

  function visualSelectTest(platform: 'mobile' | 'desktop') {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-select/test/bal-select.visual.html').platform(platform).waitForDesignSystem()
      })

      it('basic component', () => {
        cy.getByTestId('basic').compareSnapshot(`select-basic-${platform}`)

        cy.getByTestId('basic-input').click()
        cy.compareSnapshot(`select-basic-open-${platform}`)

        cy.getByTestId('basic-input').balSelectFindOptions().eq(1).click()
        cy.getByTestId('basic').compareSnapshot(`select-basic-value-${platform}`)

        cy.getByTestId('basic-input').click()
        cy.compareSnapshot(`select-basic-open-selected-${platform}`)
      })

      it('disabled component', () => {
        cy.getByTestId('disabled').compareSnapshot(`select-disabled-${platform}`)
      })

      it('invalid component', () => {
        cy.getByTestId('invalid').compareSnapshot(`select-invalid-${platform}`)
      })

      it('field component', () => {
        cy.getByTestId('field').compareSnapshot(`select-field-${platform}`)
      })

      it('free-solo component', () => {
        cy.getByTestId('free-solo').compareSnapshot(`select-free-solo-${platform}`)
      })
    })
  }

  function visualSelectMultipleTest(platform: 'mobile' | 'desktop') {
    describe(platform, () => {
      beforeEach(() => {
        cy.visit('/components/bal-select/test/bal-select-multiple.visual.html')
          .platform(platform)
          .waitForDesignSystem()
      })

      it('basic multiple component', () => {
        cy.getByTestId('basic').compareSnapshot(`select-multiple-basic-${platform}`)

        cy.getByTestId('basic-input').click()
        cy.compareSnapshot(`select-multiple-basic-open-${platform}`)

        cy.getByTestId('basic-input').balSelectFindOptions().eq(1).click()
        cy.getByTestId('basic-input').balSelectFindOptions().eq(2).click()
        cy.getByTestId('basic').compareSnapshot(`select-multiple-basic-value-${platform}`)

        cy.getByTestId('basic-input').click()
        cy.compareSnapshot(`select-multiple-basic-open-selected-${platform}`)
      })

      it('disabled multiple component', () => {
        cy.getByTestId('disabled').compareSnapshot(`select-multiple-disabled-${platform}`)
      })

      it('invalid multiple component', () => {
        cy.getByTestId('invalid').compareSnapshot(`select-multiple-invalid-${platform}`)
      })

      it('field component', () => {
        cy.getByTestId('field').compareSnapshot(`select-multiple-field-${platform}`)
      })
    })
  }
})
