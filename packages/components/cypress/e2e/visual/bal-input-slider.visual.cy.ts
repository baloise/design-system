describe('bal-input-slider', () => {
  before(() => cy.page('/components/form/bal-input-slider/test/bal-input-slider.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('input-slider-basic', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('input-slider-basic-mobile', 0.0)
  })

  it('with-ticks component', () => {
    cy.platform('desktop')
    cy.getByTestId('with-ticks').compareSnapshot('input-slider-with-ticks', 0.0)

    cy.platform('mobile')
    cy.getByTestId('with-ticks').compareSnapshot('input-slider-with-ticks-mobile', 0.0)
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('input-slider-disabled', 0.0)

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('input-slider-disabled-mobile', 0.0)
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('input-slider-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('input-slider-invalid-mobile', 0.0)
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('input-slider-field', 0.0)

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('input-slider-field-mobile', 0.0)
  })
})
