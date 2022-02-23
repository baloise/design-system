import { app } from '../../support/legacy/app'

describe('Input', () => {
  const page = app.getInputPage()

  it('should navigate to Input page and check the value in Input field', () => {
    page.open()
    page.input.get().assertValue('')
  })
})
