import { formatISO, format as dateFnsFormat, isMatch, isValid } from 'date-fns'
import { getConfig } from '../config'

export const now = () => new Date()

export const format = (date: Date) => {
  const config = getConfig()
  if (!isValid(date)) {
    return ''
  }
  return dateFnsFormat(date, config.dateFormat)
}

export const isoString = (date: Date) => formatISO(date, { representation: 'date' })

export const isValidIsoString = (datestring: string | undefined | null) =>
  !!datestring ? isMatch(datestring, 'yyyy-MM-dd') : false
