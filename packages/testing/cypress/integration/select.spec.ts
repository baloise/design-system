import { app } from '../support/app'

describe("Select", () => {
  let page = app.getSelectPage()

  it("can be clicked", () => {
    page.open()
    page.select.get().click()
    page.select.get().select(0)
    page.select.get().assertOptions('1995', '1996', '1997', '1998', '1999', '2000')
    page.select.get().contains(1995)
  })
})
