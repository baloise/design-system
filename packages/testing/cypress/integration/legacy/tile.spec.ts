import { app } from '../../support/legacy/app'

describe('Legacy - Tile', () => {
  const page = app.getTilePage()

  it('should navigate to Select page and assert values in Select', () => {
    page.open()
    page.tile.get().containsTileContent('My title')
  })
})
