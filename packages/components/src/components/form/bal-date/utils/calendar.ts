import { I18n } from '../../../../interfaces'
import { I18nDate, i18nDate } from '../bal-date.i18n'

// Function to get the number of days in a month
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

// Function to generate the calendar grid
export function generateCalendarGrid(year: number, month: number): number[][] {
  // Get the number of days in the month
  const numDays: number = getDaysInMonth(year, month)

  // Create a new Date object for the first day of the month
  const firstDay: Date = new Date(year, month - 1, 1)

  // Determine the index of the first day in the week (0-6)
  const firstDayIndex: number = firstDay.getDay()

  // Create an empty grid array
  const grid: number[][] = []

  // Calculate the number of rows needed in the grid
  const numRows: number = Math.ceil((numDays + firstDayIndex) / 7)

  // Fill the grid with day numbers
  let day = 1
  for (let row = 0; row < numRows; row++) {
    const week: number[] = []
    for (let col = 0; col < 7; col++) {
      if ((row === 0 && col < firstDayIndex) || day > numDays) {
        // Empty cell before the first day or after the last day
        week.push(0)
      } else {
        // Fill cell with day number
        week.push(day++)
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
