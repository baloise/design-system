describe('bal-input-slider', () => {
  beforeEach(() => cy.visit('/components/bal-input-slider/test/bal-input-slider.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('input-slider-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('input-slider-basic-mobile')
  })

  it('with-ticks component', () => {
    cy.platform('desktop')
    cy.getByTestId('with-ticks').testVisual('input-slider-with-ticks')

    cy.platform('mobile')
    cy.getByTestId('with-ticks').testVisual('input-slider-with-ticks-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').testVisual('input-slider-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').testVisual('input-slider-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').testVisual('input-slider-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').testVisual('input-slider-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').testVisual('input-slider-field')

    cy.platform('mobile')
    cy.getByTestId('field').testVisual('input-slider-field-mobile')
  })
})
