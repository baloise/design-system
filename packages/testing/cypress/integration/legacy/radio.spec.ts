import { app } from '../../support/legacy/app'

describe('Radio', () => {
  const page = app.getRadioPage()

  it('should navigate to Radio page and select second option on first Radio on the page', () => {
    page.open()
    page.radio.get().select(1)
  })
})
