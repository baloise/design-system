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
