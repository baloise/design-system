describe('bal-datepicker', () => {
  beforeEach(() => cy.visit('/components/bal-datepicker/test/bal-datepicker.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('datepicker-basic')

    cy.getByTestId('basic-picker').balDatepickerToggle()
    cy.testVisual('datepicker-basic-open')

    cy.getByTestId('basic-picker').balDatepickerPick(new Date(2022, 9, 7))
    cy.getByTestId('basic-picker').balDatepickerToggle()
    cy.testVisual('datepicker-basic-open-selected')
  })

  it('basic mobile component', () => {
    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('datepicker-basic-mobile')

    cy.getByTestId('basic-picker').balDatepickerToggle()
    cy.testVisual('datepicker-basic-open-mobile')

    cy.getByTestId('basic-picker').balDatepickerPick(new Date(2022, 9, 7))
    cy.getByTestId('basic-picker').balDatepickerToggle()
    cy.testVisual('datepicker-basic-open-selected-mobile')

    cy.getByTestId('basic-picker').balDatepickerToggle()
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').testVisual('datepicker-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').testVisual('datepicker-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').testVisual('datepicker-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').testVisual('datepicker-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').testVisual('datepicker-field')

    cy.platform('mobile')
    cy.getByTestId('field').testVisual('datepicker-field-mobile')
  })
})
