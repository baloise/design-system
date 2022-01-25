import { formatISO, format as dateFnsFormat, isMatch, isValid, parseISO } from 'date-fns'
import padStart from 'lodash.padstart'
import { getConfig } from '../config'

export const now = () => new Date()

export const format = (date?: Date) => {
  const config = getConfig()
  if (!isValid(date)) {
    return ''
  }
  return dateFnsFormat(date as Date, config.dateFormat)
}

export const isoString = (date: Date) => formatISO(date, { representation: 'date' })

export const isValidIsoString = (datestring: string | undefined | null) =>
  !!datestring ? isMatch(datestring, 'yyyy-MM-dd') : false

function pad(value: number) {
  return padStart(`${value}`, 2, '0')
}

export const parse = (datestring: string): Date | undefined => {
  const date = parseISO(datestring)
  if (isValid(date)) {
    return date
  }

  const [year, month, day] = datestring.split('-').map(d => parseInt(d, 10))
  if (year > 0 && month > 0 && day > 0) {
    return parseISO(`${year < 1000 ? year + 2000 : year}-${pad(month)}-${pad(day)}`)
  }

  return
}
