import { DateTime } from 'luxon'
import { useBalConfig } from '../../../../../utils/config'
import { dateSeparator } from '@baloise/web-app-utils'

export class BalDate {
  public static fromAnyFormat(value: string) {
    const separator = value.replace(/[0-9]/g, '').charAt(0)
    const config = useBalConfig()
    const locale = config?.locale || 'de-CH'
    return new BalDate(DateTime.fromFormat(value, `d${separator}M${separator}yy`, { locale }))
  }

  public static fromISO(value: string) {
    return new BalDate(DateTime.fromISO(value))
  }

  constructor(private dt: DateTime) {}

  public get isValid() {
    return this.dt.isValid
  }

  public toISO() {
    return this.dt.toISO()
  }

  public toISODate() {
    return this.dt.toISODate()
  }

  public toFormat() {
    const config = useBalConfig()
    const locale = config?.locale || 'de-CH'
    const separator = dateSeparator(locale)
    return this.dt.toFormat(`dd${separator}MM${separator}yyyy`)
  }
}
