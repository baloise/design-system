import { FunctionalComponent, h } from '@stencil/core'
import padStart from 'lodash.padstart'

export interface DayCellProps {
  day: number
  month: number
  year: number
  today: string
  selectedDate: string
  onSelect: (ev: MouseEvent, date: string) => void
}

export const DayCell: FunctionalComponent<DayCellProps> = ({ day, month, year, today, selectedDate, onSelect }) => {
  const isoDate = `${year}-${padStart(`${month}`, 2, '0')}-${padStart(`${day}`, 2, '0')}`

  return (
    <button
      class={{
        'day-cell': true,
        'day-cell--today': isoDate === today,
        'day-cell--selected': selectedDate === isoDate,
      }}
      tabIndex={-1}
      type="button"
      role="gridcell"
      onClick={ev => onSelect(ev, isoDate)}
    >
      <time aria-label={isoDate} title={isoDate} dateTime={isoDate}>
        {day}
      </time>
    </button>
  )
}
