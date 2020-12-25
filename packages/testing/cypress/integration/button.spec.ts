import { app } from '../support/app'

describe("Button", () => {
  let page = app.getButtonPage()

  it("should navigate to Button page and test first Button on the page", () => {
    page.open()
    page.primaryButton.get().contains("Primary")
    page.primaryButton.get().click()
    page.primaryButton.get().assertIsEnabled()
    // page.primaryButton.get().assertIsDisabled()
    page.primaryButton.get().assertExists()
  })
})
