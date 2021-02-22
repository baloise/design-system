import { parseDate, unformat } from '../../utils/balDateUtil'

const twoDigit = (val: number | undefined): string => {
  return ('0' + (val !== undefined ? Math.abs(val) : '0')).slice(-2)
}

const fourDigit = (val: number | undefined): string => {
  return ('000' + (val !== undefined ? Math.abs(val) : '0')).slice(-4)
}



// export const formatInputValue = (value: string): string => {
//   if (!isValidDateString(value)) {
//     return ''
//   }
//   const d = unformat(value)
//   return `${twoDigit(d.day)}.${twoDigit(d.month)}.${fourDigit(d.year)}`
// }

// export const convertInputValueToDateString = (value: string | null | undefined): string | undefined => {
//   const date = parseDate(value)
//   if (date === undefined) {
//     return
//   }
//   return date.toISOString()
// }

// export const isValidDateString = (value: string | undefined | null): boolean => {
//   if (value === null || value === undefined || value === '') {
//     return false
//   }

//   if (value.length < 8 || value.length > 10) {
//     return false
//   }

//   const parts = value.split('.')
//   if (parts.length !== 3) {
//     return false
//   }

//   const year = parts[2]
//   if (year.length !== 4 || parseInt(year, 10) < 1900) {
//     return false
//   }

//   const month = parseInt(parts[1], 10)
//   if (month <= 0 || month > 12) {
//     return false
//   }

//   const lastDayOfMonth = new Date(parseInt(year, 10), month, 0).getDate()
//   const day = parseInt(parts[0], 10)
//   if (day <= 0 || day > lastDayOfMonth) {
//     return false
//   }

//   return true
// }

// export const convertToJsDateString = (value: string | null | undefined): string => {
//   if (!isValidDateString(value)) {
//     return ''
//   }

//   const parts = (value as string).split('.')
//   if (parts.length !== 3) {
//     return ''
//   }

//   const year = parseInt(parts[2], 10)
//   const month = parseInt(parts[1], 10) - 1
//   const day = parseInt(parts[0], 10)
//   return `${year}.${month}.${day}`
// }
