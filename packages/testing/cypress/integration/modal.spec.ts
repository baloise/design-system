import { app } from '../support/app'

describe("Modal", () => {
  let page = app.getModalPage()

  it("should navigate to Modal page and open and close Modal", () => {
    page.open()
    page.clickOpenModalButton()
    page.modal.get().closeModal()
  })

  it("should navigate to Modal page and assert content", () => {
    page.open()
    page.clickOpenModalButton().assertBigModalContent('Modal Title')
  })
})
