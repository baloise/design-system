import { app } from '../support/app'

describe("Dropdown", () => {
  let page = app.getDropdownPage()

  it("should navigate to Dropdown page and open and close the Dropdown", () => {
    page.open()
    page.dropdown.get().click()
    page.dropdown.get().click()
  })
})
