import { I18n } from '../../../../interfaces'
import { I18nDate } from '../bal-date.i18n'
import {
  DayCell,
  WeekdayCell,
  generateCalendarGrid,
  generateWeekDays,
  getDaysInMonth,
  getFirstDayOfMonth,
  getFirstWeekdayOfMonth,
} from './calendar'

describe('getFirstDayOfMonth Function', () => {
  test('should return the correct number of days in a month', () => {
    // Test for different months and years
    expect(getFirstDayOfMonth(2023, 1)?.getDay()).toBe(0)
    expect(getFirstDayOfMonth(2023, 1)?.getDate()).toBe(1)

    expect(getFirstDayOfMonth(2023, 2)?.getDay()).toBe(3)
    expect(getFirstDayOfMonth(2023, 2)?.getDate()).toBe(1)

    expect(getFirstDayOfMonth(2023, 5)?.getDay()).toBe(1)
    expect(getFirstDayOfMonth(2023, 5)?.getDate()).toBe(1)
  })

  test('should handle invalid input', () => {
    expect(getFirstDayOfMonth(2023, 0)).toBeUndefined()
    expect(getFirstDayOfMonth(2023, -1)).toBeUndefined()
    expect(getFirstDayOfMonth(2023, 13)).toBeUndefined()
  })
})

describe('getDaysInMonth Function', () => {
  test('should return the correct number of days in a month', () => {
    // Test for different months and years
    expect(getDaysInMonth(2023, 1)).toBe(31) // January 2023 has 31 days
    expect(getDaysInMonth(2023, 2)).toBe(28) // February 2023 has 28 days (non-leap year)
    expect(getDaysInMonth(2020, 2)).toBe(29) // February 2020 has 29 days (leap year)
    expect(getDaysInMonth(2023, 4)).toBe(30) // April 2023 has 30 days
    expect(getDaysInMonth(2023, 5)).toBe(31) // Mai 2023 has 31 days
    expect(getDaysInMonth(2023, 11)).toBe(30)
    expect(getDaysInMonth(2023, 12)).toBe(31)
  })

  test('should handle invalid input', () => {
    // Test for invalid input, e.g., month = 0, negative year, etc.
    // For invalid inputs, the function is expected to return NaN or throw an error.
    expect(getDaysInMonth(2023, 0)).toBeUndefined() // January is 1-based, so month 0 is invalid
    expect(getDaysInMonth(2023, -1)).toBeUndefined() // Negative month should throw an error
    expect(getDaysInMonth(-2023, 5)).toBeUndefined() // Negative year should throw an error
  })
})

describe('getFirstWeekdayOfMonth Function', () => {
  test('should return the correct first weekday of a month', () => {
    // Test for different months and years
    expect(getFirstWeekdayOfMonth(2023, 1)).toBe(7) // January 2023 starts on a Sunday (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    expect(getFirstWeekdayOfMonth(2023, 2)).toBe(3) // February 2023 starts on a Wednesday
    expect(getFirstWeekdayOfMonth(2020, 2)).toBe(6) // February 2020 starts on a Saturday
    expect(getFirstWeekdayOfMonth(2023, 4)).toBe(6) // April 2023 starts on a Saturday
  })

  test('should handle invalid input', () => {
    // Test for invalid input, e.g., month = 0, negative year, etc.
    // For invalid inputs, the function is expected to throw an error.
    expect(getFirstWeekdayOfMonth(2023, 0)).toBe(1) // January is 1-based, so month 0 is invalid
    expect(getFirstWeekdayOfMonth(2023, -1)).toBe(1) // Negative month should throw an error
    expect(getFirstWeekdayOfMonth(-2023, 5)).toBe(1) // Negative year should throw an error
  })
})

describe('generateWeekDays Function', () => {
  test('should generate the correct weekday header', () => {
    // Test generating weekday headers for English (assuming Monday is the first day of the week)
    const language: keyof I18n<I18nDate> = 'en'
    const weekdays: WeekdayCell[] = generateWeekDays(language)

    // Assert that the weekday headers are correct
    expect(weekdays.length).toBe(7) // There should be 7 weekdays

    // Assuming Monday is the first day of the week in the "en" locale
    expect(weekdays[0].textContent).toBe('Mo')
    expect(weekdays[1].textContent).toBe('Tu')
    expect(weekdays[2].textContent).toBe('We')
    expect(weekdays[3].textContent).toBe('Th')
    expect(weekdays[4].textContent).toBe('Fr')
    expect(weekdays[5].textContent).toBe('Sa')
    expect(weekdays[6].textContent).toBe('Su')
  })

  test('should generate the correct weekday header in german', () => {
    const language: keyof I18n<I18nDate> = 'de'
    const weekdays: WeekdayCell[] = generateWeekDays(language)

    // Assert that the weekday headers are correct
    expect(weekdays.length).toBe(7) // There should be 7 weekdays

    // Assuming Monday is the first day of the week in the "en" locale
    expect(weekdays[0].textContent).toBe('Mo')
    expect(weekdays[1].textContent).toBe('Di')
    expect(weekdays[2].textContent).toBe('Mi')
    expect(weekdays[3].textContent).toBe('Do')
    expect(weekdays[4].textContent).toBe('Fr')
    expect(weekdays[5].textContent).toBe('Sa')
    expect(weekdays[6].textContent).toBe('So')
  })

  test('should handle invalid language', () => {
    // Test for an unsupported language or invalid language code
    // For invalid input, the function is expected to throw an error or handle it gracefully.
    const language: any = 'xyz' // An unsupported language code
    const weekdays: WeekdayCell[] = generateWeekDays(language)

    // Assert that the weekday headers are correct
    expect(weekdays.length).toBe(7) // There should be 7 weekdays

    // Assuming Monday is the first day of the week in the "en" locale
    expect(weekdays[0].textContent).toBe('Mo')
    expect(weekdays[1].textContent).toBe('Di')
    expect(weekdays[2].textContent).toBe('Mi')
    expect(weekdays[3].textContent).toBe('Do')
    expect(weekdays[4].textContent).toBe('Fr')
    expect(weekdays[5].textContent).toBe('Sa')
    expect(weekdays[6].textContent).toBe('So')
  })
})

describe.only('generateCalendarGrid Function', () => {
  test('should generate the correct calendar grid for a month starts on a sunday', () => {
    // Test generating the calendar grid for January 2023
    const year = 2023
    const month = 1 // January (1-based index)
    const grid: DayCell[] = generateCalendarGrid(year, month)

    // Assert that the grid has the correct number of rows and columns
    expect(grid.length).toBe(31) // At most 6 rows in a month

    // Assert that the first and last days of the month are correct
    expect(grid[0].day).toBe(1) // First day of January 2023 (assuming Sunday is the first day of the week)
    expect(grid[grid.length - 1].day).toBe(31) // Last day of January 2023
  })

  test('should generate the correct calendar grid for the month february', () => {
    // Test generating the calendar grid for Mai 2023
    const year = 2023
    const month = 2
    const grid: DayCell[] = generateCalendarGrid(year, month)

    // Assert that the grid has the correct number of rows and columns
    expect(grid.length).toBe(28) // At most 6 rows in a month

    // Assert that the first and last days of the month are correct
    expect(grid[0].day).toBe(1)
    expect(grid[grid.length - 1].day).toBe(28)
  })

  test('should generate the correct calendar grid for a month starts on a monday', () => {
    // Test generating the calendar grid for Mai 2023
    const year = 2023
    const month = 5 // Mai (1-based index)
    const grid: DayCell[] = generateCalendarGrid(year, month)

    // Assert that the grid has the correct number of rows and columns
    expect(grid.length).toBe(31) // At most 6 rows in a month

    // Assert that the first and last days of the month are correct
    expect(grid[0].day).toBe(1)
    expect(grid[grid.length - 1].day).toBe(31)
  })

  test('should handle min and max date constraints', () => {
    // Test generating the calendar grid for a month with min and max date constraints
    const year = 2023
    const month = 1 // January (1-based index)
    const minDate = '2023-01-15'
    const maxDate = '2023-01-25'
    const grid: DayCell[] = generateCalendarGrid(year, month, minDate, maxDate)

    // Assert that the days outside the min and max date range are disabled
    expect(grid[0].disabled).toBe(true)
    expect(grid[13].disabled).toBe(true)
    expect(grid[14].disabled).toBe(false)
    expect(grid[24].disabled).toBe(false)
    expect(grid[25].disabled).toBe(true)
    expect(grid[30].disabled).toBe(true)
  })

  test('should handle allowed dates callback', () => {
    // Test generating the calendar grid with a custom allowedDates callback
    const year = 2023
    const month = 1 // January (1-based index)
    const allowedDates = (isoDate: string) => isoDate.endsWith('15') // Allow only days ending with '15'
    const grid: DayCell[] = generateCalendarGrid(year, month, undefined, undefined, allowedDates)

    // Assert that the allowed dates are not disabled while others are disabled
    expect(grid[0].disabled).toBe(true)
    expect(grid[13].disabled).toBe(true)
    expect(grid[14].disabled).toBe(false)
    expect(grid[15].disabled).toBe(true)
    expect(grid[30].disabled).toBe(true)
  })
})
