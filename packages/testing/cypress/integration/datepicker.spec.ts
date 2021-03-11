import { now } from '@baloise/ui-library'
import { app } from '../support/app'

describe('Datepicker', () => {
  let page = app.getDatepickerPage()

  it('should navigate to Datepicker page and open Datepicker', () => {
    page.open()
    page.datepicker.get().open()
  })

  it('should navigate to Datepicker page and pick the date in Datepicker', () => {
    page.open()
    page.datepicker.get().pick(now())
  })

  it('should navigate to Datepicker page and check the date in Datepicker', () => {
    page.open()
    page.datepicker.get().pick(new Date())
    page.datepicker.get().shouldHaveValue(new Date())
  })

  it('should navigate to Datepicker page and write the date in input of the Datepicker', () => {
    page.open()
    page.datepicker.get().open()
    page.datepicker.get().write('12.12.2020')
  })

  it('should navigate to Datepicker page and assert if date is in range in the Datepicker', () => {
    page.open()
    page.datepicker.get().open()
    page.datepicker.get().assertDateInRange(new Date(), false)
  })
})
