import { app } from '../support/app'

describe("Accordion", () => {
  let page = app.getAccordionPage()

  it("should navigate to Accordion page and test first Accordion on the page", () => {
    page.open()
    page.accordion.get().click()
    page.accordion.get().contains('Details ausblenden')
    page.accordion.get().assertBodyExists()
    page.accordion.get().click()
    page.accordion.get().assertBodyNotExists()
  })
})
