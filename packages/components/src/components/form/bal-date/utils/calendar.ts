import padStart from 'lodash.padstart'
import { I18n } from '../../../../interfaces'
import { BalDate } from '../../../../utils/date'
import { I18nDate, i18nDate } from '../bal-date.i18n'
import isNil from 'lodash.isnil'

// Function to get the number of days in a month
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export interface DayCell {
  day: number
  month: number
  year: number
  isoDate: string
  fullDate: string
  empty: boolean
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
    empty: true,
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
): DayCell[][] {
  console.log('generateCalendarGrid')
  // Get the number of days in the month
  const numDays: number = getDaysInMonth(year, month)

  // Create a new Date object for the first day of the month
  const firstDay: Date = new Date(year, month - 1, 1)

  // Determine the index of the first day in the week (0-6)
  const firstDayIndex: number = firstDay.getDay()

  // Create an empty grid array
  const grid: DayCell[][] = []

  // Calculate the number of rows needed in the grid
  const numRows: number = Math.ceil((numDays + firstDayIndex) / 7)

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
  let day = 1
  for (let row = 0; row < numRows; row++) {
    const week: DayCell[] = []
    for (let col = 0; col < 7; col++) {
      if ((row === 0 && col < firstDayIndex) || day > numDays) {
        // Empty cell before the first day or after the last day
        week.push(emptyCell())
      } else {
        // Fill cell with day number
        const isoDate = isoDateOfDay(day, month, year)
        week.push({
          day,
          month,
          year,
          isoDate,
          fullDate: BalDate.fromISO(isoDate).toFormat(),
          empty: false,
          today: isoToday === isoDate,
          disabled: dateMin.isAfter(isoDate) || dateMax.isBefore(isoDate) || allowedDate(isoDate),
        })
        day++
      }
    }
    grid.push(week)
  }

  return grid
}

// Function to get the first weekday of the month
export function getFirstWeekdayOfMonth(year: number, month: number): number {
  // Create a new Date object with the given year and month
  const date = new Date(year, month - 1, 1)

  // Get the weekday of the first day of the month (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const weekday = date.getDay()

  return weekday
}

export type WeekdayCell = { ariaLabel: string; textContent: string }

// Function to generate the weekday header row with the label and the content
export function generateWeekDays(language: keyof I18n<I18nDate>): WeekdayCell[] {
  const weekdaysMin = [...i18nDate[language].weekdaysMin]
  const weekdays = [...i18nDate[language].weekdays]

  // Start the week on mondays instead of sundays
  weekdaysMin.push(weekdaysMin.shift() || '')
  weekdays.push(weekdays.shift() || '')

  return weekdaysMin.map((weekdayMin, index) => ({
    ariaLabel: weekdays[index],
    textContent: weekdayMin,
  }))
}
