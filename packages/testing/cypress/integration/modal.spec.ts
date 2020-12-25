import { app } from '../support/app'

describe("Modal", () => {
  let page = app.getModalPage()

  it("can be clicked", () => {
    page.open()
    page.clickOpenModalButton().assertBigModalContent('Modal Title')
    page.modal.get().closeModal()
  })
})
