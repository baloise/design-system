import { app } from '../../support/legacy/app'

describe('Legacy - SelectButton', () => {
  const page = app.getRadioPage()

  it('should select', () => {
    page.open()
    page.selectButton.get().select(1)
  })
})
