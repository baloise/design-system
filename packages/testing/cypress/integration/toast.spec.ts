import { app } from '../support/app'

describe("Toast", () => {
  let page = app.getToastPage()

  it("can be clicked", () => {
    page.open()
    page.toast.get().click()
  })
})
