import { app } from '../../support/legacy/app'

describe('Toast', () => {
  const page = app.getToastPage()

  it('should navigate to Toast page and open Toast', () => {
    page.open()
    page.toast.get().click({ multiple: true })
  })
})
