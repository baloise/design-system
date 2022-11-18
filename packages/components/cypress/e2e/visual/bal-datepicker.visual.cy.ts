describe('bal-datepicker', () => {
  before(() => cy.page('/components/form/bal-datepicker/test/bal-datepicker.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('datepicker-basic', 0.0)

    cy.getByTestId('basic-picker').balDatepickerToggle()
    cy.compareSnapshot('datepicker-basic-open', 0.0)

    cy.getByTestId('basic-picker').balDatepickerPick(new Date(2022, 11, 7))
    cy.getByTestId('basic-picker').balDatepickerToggle()
    cy.compareSnapshot('datepicker-basic-open-selected', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic-picker').clear()
    cy.getByTestId('basic').compareSnapshot('datepicker-basic-mobile', 0.0)

    cy.getByTestId('basic-picker').balDatepickerToggle()
    cy.compareSnapshot('datepicker-basic-open-mobile', 0.0)

    cy.getByTestId('basic-picker').balDatepickerPick(new Date(2022, 11, 7))
    cy.getByTestId('basic-picker').balDatepickerToggle()
    cy.compareSnapshot('datepicker-basic-open-selected-mobile', 0.0)

    cy.getByTestId('basic-picker').balDatepickerToggle()
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('datepicker-disabled', 0.0)

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('datepicker-disabled-mobile', 0.0)
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('datepicker-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('datepicker-invalid-mobile', 0.0)
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('datepicker-field', 0.0)

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('datepicker-field-mobile', 0.0)
  })
})
