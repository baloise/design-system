import { app } from '../support/app'

describe("Datepicker", () => {
  let page = app.getDatePickerPage()

  it("can be clicked", () => {
    page.open()
    // page.datepicker.get().open()
    page.datepicker.get().pick(new Date())
    // page.datepicker.get().shouldHaveValue(new Date())
    // page.datepicker.get().write('12.12.2020')
    // page.datepicker.get().assertDateInRange(new Date(), false)
  })
})
