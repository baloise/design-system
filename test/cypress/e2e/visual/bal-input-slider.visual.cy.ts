describe('bal-input-slider', () => {
  beforeEach(() =>
    cy.visit('/components/form/bal-input-slider/test/bal-input-slider.visual.html').waitForDesignSystem(),
  )

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('input-slider-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('input-slider-basic-mobile')
  })

  it('with-ticks component', () => {
    cy.platform('desktop')
    cy.getByTestId('with-ticks').compareSnapshot('input-slider-with-ticks')

    cy.platform('mobile')
    cy.getByTestId('with-ticks').compareSnapshot('input-slider-with-ticks-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('input-slider-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('input-slider-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('input-slider-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('input-slider-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('input-slider-field')

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('input-slider-field-mobile')
  })
})
