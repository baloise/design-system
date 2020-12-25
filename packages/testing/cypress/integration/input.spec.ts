import { app } from '../support/app'

describe("Input", () => {
  let page = app.getInputPage()

  it("can be clicked", () => {
    page.open()
    page.input.get().assertValue('')
  })
})
