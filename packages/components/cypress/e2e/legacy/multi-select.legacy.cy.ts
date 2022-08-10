import { app } from '../../support/legacy/app'

describe('Legacy - MultiSelect Button', () => {
  const page = app.getCheckboxPage()

  it('should contain label', () => {
    page.open()
    page.multiSelect.get().select(1)
    page.multiSelect.get().assertIsSelected(1)
  })
})
