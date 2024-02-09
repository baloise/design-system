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
        cy.getByTestId('basic').testVisual(`select-basic-${platform}`)

        cy.getByTestId('basic-input').click()
        cy.testVisual(`select-basic-open-${platform}`)

        cy.getByTestId('basic-input').balSelectFindOptions().eq(1).click()
        cy.getByTestId('basic').testVisual(`select-basic-value-${platform}`)

        cy.getByTestId('basic-input').click()
        cy.testVisual(`select-basic-open-selected-${platform}`)
      })

      it('disabled component', () => {
        cy.getByTestId('disabled').testVisual(`select-disabled-${platform}`)
      })

      it('invalid component', () => {
        cy.getByTestId('invalid').testVisual(`select-invalid-${platform}`)
      })

      it('field component', () => {
        cy.getByTestId('field').testVisual(`select-field-${platform}`)
      })

      it('free-solo component', () => {
        cy.getByTestId('free-solo').testVisual(`select-free-solo-${platform}`)
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
        cy.getByTestId('basic').testVisual(`select-multiple-basic-${platform}`)

        cy.getByTestId('basic-input').click()
        cy.testVisual(`select-multiple-basic-open-${platform}`)

        cy.getByTestId('basic-input').balSelectFindOptions().eq(1).click()
        cy.getByTestId('basic-input').balSelectFindOptions().eq(2).click()
        cy.getByTestId('basic').testVisual(`select-multiple-basic-value-${platform}`)

        cy.getByTestId('basic-input').click()
        cy.testVisual(`select-multiple-basic-open-selected-${platform}`)
      })

      it('disabled multiple component', () => {
        cy.getByTestId('disabled').testVisual(`select-multiple-disabled-${platform}`)
      })

      it('invalid multiple component', () => {
        cy.getByTestId('invalid').testVisual(`select-multiple-invalid-${platform}`)
      })

      it('field component', () => {
        cy.getByTestId('field').testVisual(`select-multiple-field-${platform}`)
      })
    })
  }
})
