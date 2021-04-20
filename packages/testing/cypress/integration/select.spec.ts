import { app } from '../support/app'

describe('Select', () => {
  let page = app.getSelectPage()

  it('should navigate to Select page and select first option', () => {
    page.open()
    page.select.get().click()
    page.select.get().select(0)
  })

  it('should navigate to Select page and assert values in Select', () => {
    page.open()
    page.select.get().assertOptions('v1995', 'v1996', 'v1997', 'v1998', 'v1999', 'v2000')
  })

  it('should navigate to Select page and check if input contains value 1995', () => {
    page.open()
    page.select.get().click()
    page.select.get().select(0)
    page.select.get().contains(1995)
  })
})
