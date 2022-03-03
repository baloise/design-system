import { app } from '../../support/legacy/app'

describe('Legacy - Tooltip', () => {
  const page = app.getTooltipPage()

  it('should ', () => {
    page.open()
    page.tooltip.get().hover().contains('Spider-Man')
  })
})
