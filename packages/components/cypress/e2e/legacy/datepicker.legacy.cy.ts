import { byTestId, DatePickerAccessor } from '../../../../testing/src'

const now = () => new Date()

describe('Legacy - Datepicker', () => {
  beforeEach(() => cy.platform('desktop').page('/components/form/bal-datepicker/test/bal-datepicker.cy.html'))

  it('should be able to use the legacy accessors', () => {
    const accessor = DatePickerAccessor(byTestId('basic'))
    accessor.get().open()
    cy.getByTestId('basic').balDatepickerIsOpen().balDatepickerToggle()
    accessor.get().pick(now()).shouldHaveValue(new Date())
    cy.getByTestId('basic').clear().type('{enter}')
    accessor.get().write('12.12.2020')
    cy.getByTestId('basic').contains('12.12.2020')
  })
})
