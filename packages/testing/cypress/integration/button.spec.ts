import { app } from '../support/app'

describe('Button', () => {
  let page = app.getButtonPage()

  it('should navigate to Button page and test enabled Button on the page', () => {
    page.open()
    page.primaryButton.get().contains('Primary')
    page.primaryButton.get().click()
    page.primaryButton.get().assertIsDisabled(false)
    page.primaryButton.get().assertExists()
  })

  it('should navigate to Button page and test disabled Button on the page', () => {
    page.open()
    page.primaryButtonDisabled.get().contains('Primary')
    page.primaryButtonDisabled.get().assertIsDisabled()
    page.primaryButtonDisabled.get().assertExists()
  })
})
