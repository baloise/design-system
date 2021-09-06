import { app } from '../support/app'

describe('Input', () => {
  let page = app.getInputPage()

  it('should navigate to Input page and check the value in Input field', () => {
    page.open()
    page.input
      .get()
      .should('have.value', '')
      .type('Value')
      .should('have.value', 'Value')
      .clear()
      .should('have.value', '')
  })

  it('should navigate to Input page and check if the second input is disabled', () => {
    page.open()
    page.inputDisabled.get().assertIsDisabled().should('have.value', '')
  })
})
