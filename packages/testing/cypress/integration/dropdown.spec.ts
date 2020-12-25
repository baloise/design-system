import { app } from '../support/app'

describe("DropDown", () => {
  let page = app.getDropDownPage()

  it("can be clicked", () => {
    page.open()
    page.dropdown.get().click()
    page.dropdown.get().click()
  })
})
