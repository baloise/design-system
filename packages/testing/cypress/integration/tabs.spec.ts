import { app } from '../support/app'

describe("Tabs", () => {
  let page = app.getTabsPage()

  it("can be clicked", () => {
    page.open()
    page.tabs.get().select(1)
    page.tabs.get().assertVisible('Test')
  })
})
