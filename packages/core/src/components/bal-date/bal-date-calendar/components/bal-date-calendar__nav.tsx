import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../../utils/bem'
import { i18nBalDate } from '../../bal-date.i18n'
import { I18n } from '../../../../interfaces'

export interface CalendarNavProps {
  language: keyof I18n<any>
  monthFullNames: string[]
  month: number
  year: number
  isCalendarVisible: boolean
  isListVisible: boolean
  onClickSelectMonthAndYear: (ev: MouseEvent) => void
  onClickPreviousMonth: (ev: MouseEvent) => void
  onClickNextMonth: (ev: MouseEvent) => void
}

export const CalendarNav: FunctionalComponent<CalendarNavProps> = ({
  language,
  onClickSelectMonthAndYear,
  monthFullNames,
  month,
  year,
  isCalendarVisible,
  isListVisible,
  onClickPreviousMonth,
  onClickNextMonth,
}) => {
  const block = BEM.block('date-calendar')
  const blockNav = block.element('nav')
  const nextMonthLabel = i18nBalDate[language].nextMonth
  const previousMonthLabel = i18nBalDate[language].previousMonth
  const selectMonthLabel = i18nBalDate[language].selectMonth

  return (
    <div
      class={{
        ...blockNav.class(),
      }}
    >
      <div class={{ ...blockNav.modifier('start').class() }}>
        <button
          title={selectMonthLabel}
          aria-label={selectMonthLabel}
          tabIndex={-1}
          data-test="change-year-month"
          onClick={onClickSelectMonthAndYear}
        >
          <span>
            {monthFullNames[month - 1]} {year}
          </span>
          <bal-icon name="caret-up" color="primary" size="small" turn={isCalendarVisible}></bal-icon>
        </button>
      </div>
      <div
        class={{ ...blockNav.modifier('end').class() }}
        style={{
          display: isListVisible ? 'none' : 'flex',
        }}
      >
        <button
          title={previousMonthLabel}
          aria-label={previousMonthLabel}
          onClick={onClickPreviousMonth}
          tabIndex={-1}
          data-test="previous-month"
        >
          <bal-icon name="caret-left" color="primary" size="small"></bal-icon>
        </button>
        <button
          title={nextMonthLabel}
          aria-label={nextMonthLabel}
          onClick={onClickNextMonth}
          tabIndex={-1}
          data-test="next-month"
        >
          <bal-icon name="caret-right" color="primary" size="small"></bal-icon>
        </button>
      </div>
    </div>
  )
}
