import { app } from '../support/app'

describe("Radio", () => {
  let page = app.getRadioPage()

  it("can be clicked", () => {
    page.open()
    page.radio.get().select(1)
  })
})
