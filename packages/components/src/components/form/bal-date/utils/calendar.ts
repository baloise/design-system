import padStart from 'lodash.padstart'
import isNil from 'lodash.isnil'
import { I18n } from '../../../../interfaces'
import { BalDate } from '../../../../utils/date'
import { I18nDate, i18nDate } from '../bal-date.i18n'

// Function to get the number of days in a month
export function getDaysInMonth(year: number, month: number): number | undefined {
  if (month < 1 || year < 1900) {
    return undefined
  }
  return new Date(year, month, 0).getDate()
}

export interface DayCell {
  day: number
  month: number
  year: number
  isoDate: string
  fullDate: string
  today: boolean
  disabled: boolean
}

export function emptyCell() {
  return {
    day: 0,
    month: 0,
    year: 0,
    isoDate: '',
    fullDate: '',
    today: false,
    disabled: false,
  }
}

function isoDateOfDay(day: number, month: number, year: number): string {
  return `${year}-${padStart(`${month}`, 2, '0')}-${padStart(`${day}`, 2, '0')}`
}

function isoDateOfToday(): string {
  const today = new Date()
  return `${today.getFullYear()}-${padStart(`${today.getMonth() + 1}`, 2, '0')}-${padStart(
    `${today.getDate()}`,
    2,
    '0',
  )}`
}

// Function to generate the calendar grid
export function generateCalendarGrid(
  year: number,
  month: number,
  min?: string,
  max?: string,
  allowedDates?: BalProps.BalDateCalendarAllowedDatesCallback,
): DayCell[] {
  // Create an empty grid array
  const grid: DayCell[] = []

  // Get the number of days in the month
  const numDays = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  if (numDays !== undefined && firstDay) {
    // Create a new Date object for the first day of the month
    const isoToday = isoDateOfToday()
    const dateMin = BalDate.fromISO(min)
    const dateMax = BalDate.fromISO(max)

    const allowedDate = (isoDate: string) => {
      if (isNil(allowedDates)) {
        return false
      }
      return !(allowedDates as BalProps.BalDatepickerCallback)(isoDate)
    }

    // Fill the grid with day numbers
    for (let day = 1; day <= numDays; day++) {
      const isoDate = isoDateOfDay(day, month, year)
      grid.push({
        day,
        month,
        year,
        isoDate,
        fullDate: BalDate.fromISO(isoDate).toFormat(),
        today: isoToday === isoDate,
        disabled: dateMin.isAfter(isoDate) || dateMax.isBefore(isoDate) || allowedDate(isoDate),
      })
    }
  }
  return grid
}

// Function to get the first weekday of the month
export function getFirstWeekdayOfMonth(year: number, month: number): number {
  if (month < 1 || year < 1900) {
    return 1
  }

  // Create a new Date object with the given year and month
  const date = new Date(year, month - 1, 1)

  // Get the weekday of the first day of the month (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const weekday = date.getDay()

  return weekday === 0 ? 7 : weekday
}

export type WeekdayCell = { ariaLabel: string; textContent: string }

export function validateLanguage(language: string): keyof I18n<I18nDate> {
  if (['en', 'de', 'fr', 'it', 'nl', 'es', 'pl', 'pt', 'sv', 'fi'].includes(language)) {
    return language as keyof I18n<I18nDate>
  }
  return 'de'
}

// Function to generate the weekday header row with the label and the content
export function generateWeekDays(language: keyof I18n<I18nDate>): WeekdayCell[] {
  const locale = validateLanguage(language)
  const weekdaysMin = [...i18nDate[locale].weekdaysMin]
  const weekdays = [...i18nDate[locale].weekdays]

  // Start the week on mondays instead of sundays
  weekdaysMin.push(weekdaysMin.shift() || '')
  weekdays.push(weekdays.shift() || '')

  return weekdaysMin.map((weekdayMin, index) => ({
    ariaLabel: weekdays[index],
    textContent: weekdayMin,
  }))
}

export function getFirstDayOfMonth(year: number, month: number): Date | undefined {
  if (month < 1 || month > 12 || year < 1900) {
    return undefined
  }

  return new Date(year, month - 1, 1)
}
