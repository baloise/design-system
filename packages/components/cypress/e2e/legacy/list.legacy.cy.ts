import { app } from '../../support/legacy/app'

describe('Legacy - List', () => {
  const page = app.getListPage()

  it('should contain label', () => {
    page.open()
    page.list.get().assertIsSelected(2)
    page.list.get().select(3)
    page.list.get().assertIsSelected(4)
  })
})
