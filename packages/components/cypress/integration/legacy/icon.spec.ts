import { app } from '../../support/legacy/app'

describe('Legacy - Icon', () => {
  const page = app.getIconPage()

  it('should have src', () => {
    page.open()
    page.icon.get().assertIcon('info-circle')
  })
})
