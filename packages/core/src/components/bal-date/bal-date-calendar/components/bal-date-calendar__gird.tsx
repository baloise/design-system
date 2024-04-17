import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../../utils/bem'
import { DayCell, WeekdayCell } from '../../utils/calendar'

export interface CalendarGridProps {
  isVisible: boolean
  grid: DayCell[]
  weekdays: WeekdayCell[]
  selectedDate: string
  firstDayOfWeek: number
  ref: (el?: HTMLDivElement) => void
  onSelectDay: (isoDate: string | undefined) => void
}

export const CalendarGrid: FunctionalComponent<CalendarGridProps> = ({
  isVisible,
  ref,
  grid,
  weekdays,
  selectedDate,
  firstDayOfWeek,
  onSelectDay,
}) => {
  const block = BEM.block('date-calendar')
  const blockBody = block.element('body')
  const blockBodyGrid = blockBody.element('grid')

  return (
    <div
      role="grid"
      class={{
        ...blockBodyGrid.class(),
        ...blockBodyGrid.modifier('visible').class(isVisible),
      }}
      aria-hidden={isVisible ? 'false' : 'true'}
      ref={el => ref(el)}
    >
      <div role="row" class={{ ...blockBodyGrid.element('head').class() }}>
        {weekdays.map(weekday => (
          <span key={weekday.textContent} role="columnheader" aria-label={weekday.ariaLabel} title={weekday.ariaLabel}>
            {weekday.textContent}
          </span>
        ))}
      </div>
      <div
        role="row"
        class={{ ...blockBodyGrid.element('body').class() }}
        style={{ '--bal-date-first-week-day': `${firstDayOfWeek}` }}
      >
        {grid.map(cell => (
          <bal-date-calendar-cell
            key={cell.isoDate}
            {...cell}
            selected={cell.isoDate === selectedDate}
            onBalSelectDay={({ detail }: BalEvents.BalDateCellSelect) => onSelectDay(detail)}
          ></bal-date-calendar-cell>
        ))}
      </div>
    </div>
  )
}
