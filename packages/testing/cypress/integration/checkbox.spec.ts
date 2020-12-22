import { app } from '../support/app'

describe('Checkbox', () => {
  let page = app.getCheckboxPage()

  it('Can be checked and unchecked', () => {
    page.open()
    page.normalCheckboxElement.get().assertIsChecked(false)
    page.normalCheckboxElement.get().click()
    page.normalCheckboxElement.get().assertIsChecked()
    page.normalCheckboxElement.get().contains('Label')
  })

  it('Disable can not be checked', () => {
    page.open()
    page.disabledCheckboxElement.get().assertIsChecked(false)
    page.disabledCheckboxElement.get().assertIsDisabled()
    page.disabledCheckboxElement.get().click()
    page.disabledCheckboxElement.get().assertIsChecked(false)
  })
})
