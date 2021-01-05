import { app } from '../support/app'

describe("Select", () => {
  let page = app.getSelectPage()

  it("should navigate to Select page and select first option", () => {
    page.open()
    page.select.get().click()
    page.select.get().select(0)
  })

  it("should navigate to Select page and assert values in Select", () => {
    page.open()
    page.select.get().assertOptions('1995', '1996', '1997', '1998', '1999', '2000')
  })

  it("should navigate to Select page and check if input contains value 1995", () => {
    page.open()
    page.select.get().click()
    page.select.get().select(0)
    page.select.get().contains(1995)
  })
})
