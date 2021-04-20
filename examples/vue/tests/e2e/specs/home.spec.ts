import { app } from '../support/app'

describe('Home Page', () => {
  const page = app.getHomePage()

  it('Visits the app root url', () => {
    page.open()

    page.button.get().click()
    page.button.get().click()

    page.getCountMessage().contains('The button was called 2 times!')
  })
})
