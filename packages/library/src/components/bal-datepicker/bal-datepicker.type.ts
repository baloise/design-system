export interface I18nDate {
  months: string[]
  monthsShort: string[]
  weekdays: string[]
  weekdaysShort: string[]
  weekdaysMin: string[]
}
export interface I18n<I18nDate> {
  en: I18nDate
  de: I18nDate
  fr: I18nDate
  it: I18nDate
}

export interface BalCalendarCell {
  date: Date
  label: string
  dateString: string
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
  isOutdated: boolean
}

export interface BalPointerDate {
  year: number
  month: number
  day: number
}

export type BalDateCallback = (datestring: string) => boolean
