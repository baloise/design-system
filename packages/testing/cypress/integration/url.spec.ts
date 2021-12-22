import { app } from '../support/app'

describe('Url with should', () => {
  const page = app.getButtonPage()

  it('should include url', () => {
    page.open()
    cy.url().should('include', '/components/bal-button') // => true
  })
})
