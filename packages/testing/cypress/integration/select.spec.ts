import { app } from '../support/app'

describe.only('Select', () => {
  let page = app.getSelectPage()

  describe('select', () => {
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

  describe('typeahead', () => {
    it('should navigate to Select page and select first option', () => {
      page.open()
      const typeahead = page.typeahead.get()
      typeahead.click().clear().type('Black{enter}').contains('Black Widow')
    })
  })

  describe('multiple', () => {
    it('should navigate to Select page and select first option', () => {
      page.open()
      const multiple = page.multiple.get()
      multiple.click().select(0).select(2).assertIsSelected([0, 2]).clear()
    })
  })
})
