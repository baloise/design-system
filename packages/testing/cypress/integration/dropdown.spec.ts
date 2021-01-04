import { app } from '../support/app'

describe("DropDown", () => {
  let page = app.getDropDownPage()

  it("should navigate to DropDown page and open and close the DropDown", () => {
    page.open()
    page.dropdown.get().click()
    page.dropdown.get().click()
  })
})
