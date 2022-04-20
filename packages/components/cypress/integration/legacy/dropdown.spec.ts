import { app } from '../../support/legacy/app'

describe('Legacy - DropDown', () => {
  const page = app.getSelectPage()

  it('should navigate to Select page and assert values in Select', () => {
    page.open()
    page.dropdown
      .get()
      .assertOptions('v1995', 'v1996', 'v1997', 'v1998', 'v1999', 'v2000')
  })

  it('should navigate to Select page and check if input contains value 1995', () => {
    page.open()
    page.dropdown.get().click()
    page.dropdown.get().select(0)
    page.dropdown.get().contains(1995)
  })
})
