import { app } from '../support/app'

describe('Tabs', () => {
  let page = app.getTabsPage()

  it('should navigate to Tabs page and select Tab B on first Tab component on the page', () => {
    page.open()
    page.tabs.get().select(2)
  })

  it('should navigate to Tabs page and assert if name of the first Tab component on the page is Tab A', () => {
    page.open()
    page.tabs.get().assertVisible('Tab A')
  })
})
