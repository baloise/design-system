import { app } from '../support/app'

describe("Accordion", () => {
  let page = app.getAccordionPage()

  it("should navigate to Accordion page and open all Accordions on the page", () => {
    page.open()
    page.accordion.get().click({ multiple: true })
  })

  it("should navigate to Accordion page and check if Accordian contains value", () => {
    page.open()
    page.accordion.get().contains('Details ausblenden')
  })

  it("should navigate to Accordion page and assert if body exist", () => {
    page.open()
    page.accordion.get().click({ multiple: true })
    page.accordion.get().assertBodyExists()
  })

  it("should navigate to Accordion page and assert if body not exist", () => {
    page.open()
    page.accordion.get().assertBodyNotExists()
  })
})
