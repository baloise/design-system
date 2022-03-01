import { app } from '../../support/legacy/app'

describe('Legacy - Toast', () => {
  const page = app.getToastPage()

  it('should navigate to Toast page and open Toast', () => {
    page.open()
    page.toast.get().click({ multiple: true })
    page.toast.get().assertToast('Hi I am a default Toast! Hi I am a default Toast!')
  })
})
