import { app } from '../support/app'

describe("Toast", () => {
  let page = app.getToastPage()

  it("should navigate to Toast page and open Toast", () => {
    page.open()
    page.toast.get().click({ multiple: true })
  })
})
