import { app } from '../../support/legacy/app'

describe('Legacy - Checkbox', () => {
  const page = app.getCheckboxPage()

  it('Can be checked and unchecked', () => {
    page.open()
    page.normalCheckboxElement.get().assertIsChecked(false)
    page.normalCheckboxElement.get().click()
    page.normalCheckboxElement.get().assertIsChecked()
    page.normalCheckboxElement.get().contains('Label')
  })
})
