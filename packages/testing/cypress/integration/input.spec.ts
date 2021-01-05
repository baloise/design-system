import { app } from '../support/app'

describe("Input", () => {
  let page = app.getInputPage()

  it("should navigate to Input page and check the value in Input field", () => {
    page.open()
    page.input.get().assertValue('')
  })
})
