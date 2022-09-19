import { addDays, addWeeks, formatISO, subDays, subWeeks } from 'date-fns'

const now = () => new Date()
const formatDateString = (date: Date) => formatISO(date, { representation: 'date' })
const format = (date: Date) => {
  const day = `${date.getDate()}`
  const month = `${date.getMonth() + 1}`

  return `${day}.${month}.${date.getFullYear()}`
}

describe('Datepicker', () => {
  before(() => cy.platform('desktop').page('/components/form/bal-datepicker/test/bal-datepicker.cy.html'))

  describe('open & close', () => {
    it('should open and close', () => {
      cy.getByTestId('basic').balDatepickerToggle().balDatepickerIsOpen().balDatepickerToggle().balDatepickerIsClosed()
    })
  })

  describe('pick', () => {
    it('should pick the date in datepicker', () => {
      cy.getByTestId('basic')
        .balDatepickerToggle()
        .balDatepickerPick(now())
        .balDatepickerIsClosed()
        .contains(format(now()))
    })
  })

  describe('range', () => {
    it('should have a min and max date', () => {
      const today = new Date(2022, 3, 16)
      const future = addWeeks(today, 1)
      const futureDisabled = addDays(future, 1)
      const past = subWeeks(today, 1)
      const pastDisabled = subDays(past, 1)

      cy.getByTestId('basic')
        .setProperty('min', formatDateString(past))
        .setProperty('max', formatDateString(future))
        .setProperty('value', formatDateString(today))
        .balDatepickerToggle()
        .balDatepickerIsOpen()
        .balDatepickerIsDateInRange(today)
        .balDatepickerIsDateInRange(past)
        .balDatepickerIsDateInRange(future)
        .balDatepickerIsDateNotInRange(futureDisabled)
        .balDatepickerIsDateNotInRange(pastDisabled)
    })
  })

  describe('reset form', () => {
    it('should reset to default values', () => {
      cy.getByTestId('reset').balDatepickerToggle().balDatepickerPick(now())
      cy.getByTestId('button-reset')
        .click()
        .contains(format(new Date(2022, 8, 16)))
    })
  })
})
