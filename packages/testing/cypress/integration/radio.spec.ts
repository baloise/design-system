import { app } from '../support/app'

describe('Radio', () => {
  let page = app.getRadioPage()

  it('should select the 1st radio', () => {
    page.open()
    const radio = page.radio.get()
    radio.select(0).assertIsSelected(0)
  })

  // it('should select the 2nd select-button', () => {
  //   page.open()
  //   const selectButton = page.selectButton.get()
  //   selectButton.select(1).assertIsSelected(1)
  // })
})
