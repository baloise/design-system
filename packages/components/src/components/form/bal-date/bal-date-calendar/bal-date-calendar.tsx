import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  State,
  Watch,
  Method,
  Event,
  EventEmitter,
} from '@stencil/core'
import { DayCell, WeekdayCell, generateCalendarGrid, generateWeekDays, getFirstWeekdayOfMonth } from '../utils/calendar'
import { BalDate } from '../../../../utils/date'
import { LogInstance, Loggable, Logger } from '../../../../utils/log'
import { BalConfigObserver, BalConfigState, BalLanguage, ListenToConfig, defaultConfig } from '../../../../utils/config'
import { i18nDate } from '../bal-date.i18n'
import { waitAfterFramePaint } from '../../../../utils/helpers'
import { BEM } from '../../../../utils/bem'

@Component({
  tag: 'bal-date-calendar',
  styleUrl: 'bal-date-calendar.sass',
  shadow: true,
})
export class DateCalendar implements ComponentInterface, Loggable, BalConfigObserver {
  private yearListEl: HTMLUListElement | undefined
  private gridEl: HTMLDivElement | undefined

  @Element() el!: HTMLElement

  @State() selectedDate = ''
  @State() weekdays: WeekdayCell[] = []
  @State() calendarGrid: DayCell[] = []
  @State() firstDayOfWeek = 0
  @State() month = 0
  @State() year = 0
  @State() language: BalLanguage = defaultConfig.language
  @State() isCalendarVisible = true
  @State() isYearListVisible = false
  @State() isMonthListVisible = false

  log!: LogInstance

  @Logger('bal-date-calendar')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of selected date, which accepts ISO 8601 date strings (YYYY-MM-DD).
   */
  @Prop() value?: string
  @Watch('value')
  valueChanged(newValue?: string, oldValue?: string) {
    if (newValue !== oldValue) {
      const date = BalDate.fromISO(newValue)
      if (!date.isValid) {
        this.generateGridByDefaultDate()
        this.selectedDate = ''
      } else {
        this.generateGridByDate(date)
        this.selectedDate = date.toISODate()
      }
    }
  }

  /**
   * The date to defines where the calendar starts. The prop accepts ISO 8601 date strings (YYYY-MM-DD). Default is today.
   */
  @Prop() defaultDate?: string

  /**
   * Callback to determine which date in the datepicker should be selectable.
   */
  @Prop() allowedDates: BalProps.BalDateCalendarAllowedDatesCallback | undefined = undefined

  /**
   * The minimum datetime allowed. Value must be a date string
   * following the
   * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
   * such as `1996-12-19`. The format does not have to be specific to an exact
   * datetime. For example, the minimum could just be the year, such as `1994`.
   * Defaults to the beginning of the year, 100 years ago from today.
   */
  @Prop({ mutable: true }) min?: string

  /**
   * The maximum datetime allowed. Value must be a date string
   * following the
   * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
   * `1996-12-19`. The format does not have to be specific to an exact
   * datetime. For example, the maximum could just be the year, such as `1994`.
   * Defaults to the end of this year.
   */
  @Prop({ mutable: true }) max?: string

  /**
   * Earliest year available for selection
   */
  @Prop({ attribute: 'min-year' }) minYearProp?: number

  /**
   * Latest year available for selection
   */
  @Prop({ attribute: 'max-year' }) maxYearProp?: number

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalDateCalendarChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.generateGridByDefaultDate()
    this.valueChanged(this.value, undefined)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */
  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.weekdays = generateWeekDays(state.language)
    this.language = state.language
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get minYear(): number {
    if (this.minYearProp === undefined) {
      const today = new Date()
      const year = today.getFullYear()
      const defaultMinYear = year - 100

      if (this.min) {
        const date = BalDate.fromISO(this.min)
        return date.year || defaultMinYear
      } else {
        return defaultMinYear
      }
    }
    return this.minYearProp
  }

  private get maxYear(): number {
    if (this.maxYearProp === undefined) {
      const today = new Date()
      const year = today.getFullYear()
      const defaultMaxYear = year + 50

      if (this.max) {
        const date = BalDate.fromISO(this.max)
        return date.year || defaultMaxYear
      } else {
        return defaultMaxYear
      }
    }
    return this.maxYearProp
  }

  private get yearList(): number[] {
    const list: number[] = []
    for (let year = this.minYear; year <= this.maxYear; year++) {
      list.push(year)
    }
    return list
  }

  private get monthList(): { value: number; label: string }[] {
    const months = [...i18nDate[this.language].months]
    return months.map((label, index) => ({ label, value: index + 1 }))
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private generateGridByDate(date: BalDate) {
    if (date.year !== undefined && date.month !== undefined) {
      this.generateGridByMonthAndYear(date.month, date.year)
    }
  }

  private generateGridByDefaultDate() {
    const date = BalDate.fromISO(this.defaultDate)

    if (date.isValid) {
      this.generateGridByDate(date)
    } else {
      const today = new Date()
      this.month = today.getMonth() + 1
      this.year = today.getFullYear()
      this.calendarGrid = generateCalendarGrid(this.year, this.month, this.min, this.max, this.allowedDates)
      this.firstDayOfWeek = getFirstWeekdayOfMonth(this.year, this.month)
    }
  }

  private generateGridByMonthAndYear(month: number, year: number) {
    // Only generate when mont and year has changed
    if (this.month !== month || this.year !== year) {
      this.calendarGrid = generateCalendarGrid(year, month, this.min, this.max, this.allowedDates)
      this.firstDayOfWeek = getFirstWeekdayOfMonth(year, month)
    }
    this.month = month
    this.year = year
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onClick = ({ detail }: BalEvents.BalDateCellSelect): void => {
    this.valueChanged(detail, this.selectedDate)
    this.balChange.emit(this.selectedDate)
  }

  private onClickNextMonth = (_ev: MouseEvent): void => {
    let nextYear = this.year
    let nextMonth = this.month + 1
    if (nextMonth > 12) {
      nextMonth = 1
      nextYear = nextYear + 1
    }
    this.generateGridByMonthAndYear(nextMonth, nextYear)
  }

  private onClickPreviousMonth = (_ev: MouseEvent): void => {
    let nextYear = this.year
    let nextMonth = this.month - 1
    if (nextMonth < 1) {
      nextMonth = 12
      nextYear = nextYear - 1
    }
    this.generateGridByMonthAndYear(nextMonth, nextYear)
  }

  private onClickSelectMonthAndYear = async (_ev: MouseEvent) => {
    if (this.isCalendarVisible === true) {
      this.isCalendarVisible = false
      this.isYearListVisible = true
      this.isMonthListVisible = false

      await waitAfterFramePaint()

      if (this.yearListEl) {
        const selectedYearEl = this.yearListEl.querySelector<HTMLElement>('#year-2023')
        if (selectedYearEl) {
          const rowHeight = 26 + 8 + 4
          this.yearListEl.scrollTop = selectedYearEl.offsetTop - rowHeight * 2
        }
      }
    } else {
      this.isCalendarVisible = true
      this.isYearListVisible = false
      this.isMonthListVisible = false
    }
  }

  private onClickYear = (newYear: number): void => {
    this.isYearListVisible = false
    this.isMonthListVisible = true
    this.generateGridByMonthAndYear(this.month, newYear)
  }

  private onClickMonth = (newMonth: number): void => {
    this.isYearListVisible = false
    this.isMonthListVisible = false
    this.isCalendarVisible = true
    this.generateGridByMonthAndYear(newMonth, this.year)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const today = new Date()
    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth() + 1
    const monthFullNames = [...i18nDate[this.language].months]
    const nextMonthLabel = i18nDate[this.language].nextMonth
    const previousMonthLabel = i18nDate[this.language].previousMonth
    const selectMonthLabel = i18nDate[this.language].selectMonth

    const girdHeight = this.gridEl?.clientHeight || 0

    const block = BEM.block('date-calendar')
    const blockNav = block.element('nav')
    const blockBody = block.element('body')
    const blockBodyGrid = blockBody.element('grid')
    const blockBodyList = blockBody.element('list')
    const blockFoot = block.element('foot')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <div
          class={{
            ...blockNav.class(),
          }}
        >
          <div class={{ ...blockNav.modifier('start').class() }}>
            <button
              title={selectMonthLabel}
              aria-label={selectMonthLabel}
              onClick={this.onClickSelectMonthAndYear}
              data-test="change-year-month"
              tabIndex={-1}
            >
              <span>
                {monthFullNames[this.month - 1]} {this.year}
              </span>
              <bal-icon name="caret-up" color="primary" size="small" turn={this.isCalendarVisible}></bal-icon>
            </button>
          </div>
          <div
            class={{ ...blockNav.modifier('end').class() }}
            style={{
              display: this.isMonthListVisible || this.isYearListVisible ? 'none' : 'flex',
            }}
          >
            <button
              title={previousMonthLabel}
              aria-label={previousMonthLabel}
              onClick={this.onClickPreviousMonth}
              tabIndex={-1}
              data-test="previous-month"
            >
              <bal-icon name="caret-left" color="primary" size="small"></bal-icon>
            </button>
            <button
              title={nextMonthLabel}
              aria-label={nextMonthLabel}
              onClick={this.onClickNextMonth}
              tabIndex={-1}
              data-test="next-month"
            >
              <bal-icon name="caret-right" color="primary" size="small"></bal-icon>
            </button>
          </div>
        </div>
        <div
          class={{
            ...blockBody.class(),
          }}
        >
          <div
            role="grid"
            class={{
              ...blockBodyGrid.class(),
              ...blockBodyGrid.modifier('visible').class(this.isCalendarVisible),
            }}
            aria-hidden={this.isCalendarVisible ? 'false' : 'true'}
            ref={el => (this.gridEl = el)}
          >
            <div role="row" class={{ ...blockBodyGrid.element('head').class() }}>
              {this.weekdays.map(weekday => (
                <span role="columnheader" aria-label={weekday.ariaLabel} title={weekday.ariaLabel}>
                  {weekday.textContent}
                </span>
              ))}
            </div>
            <div
              role="row"
              class={{ ...blockBodyGrid.element('body').class() }}
              style={{ '--bal-date-first-week-day': `${this.firstDayOfWeek}` }}
            >
              {this.calendarGrid.map(cell => (
                <bal-date-calendar-cell
                  {...cell}
                  selected={cell.isoDate === this.selectedDate}
                  onBalSelectDay={this.onClick}
                ></bal-date-calendar-cell>
              ))}
            </div>
          </div>
          <ul
            class={{
              ...blockBodyList.class(),
              ...blockBodyList.modifier('year').class(),
              ...blockBodyList.modifier('visible').class(this.isYearListVisible),
            }}
            aria-hidden={this.isYearListVisible ? 'false' : 'grue'}
            style={{
              height: `${girdHeight - 2 - 8 - 8}px`,
            }}
            ref={el => (this.yearListEl = el)}
          >
            {this.yearList.map(year => (
              <li id={`year-${year}`}>
                <button
                  class={{
                    ...blockBodyList.element('item').class(),
                    ...blockBodyList
                      .element('item')
                      .modifier('today')
                      .class(year === todayYear),
                    ...blockBodyList
                      .element('item')
                      .modifier('selected')
                      .class(year === this.year),
                  }}
                  tabIndex={-1}
                  onClick={() => this.onClickYear(year)}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
          <ul
            class={{
              ...blockBodyList.class(),
              ...blockBodyList.modifier('month').class(),
              ...blockBodyList.modifier('visible').class(this.isMonthListVisible),
            }}
            aria-hidden={this.isMonthListVisible ? 'false' : 'grue'}
            style={{
              height: `${girdHeight - 2 - 8 - 8}px`,
            }}
          >
            {this.monthList.map(month => (
              <li id={`month-${month.value}`}>
                <button
                  class={{
                    ...blockBodyList.element('item').class(),
                    ...blockBodyList
                      .element('item')
                      .modifier('today')
                      .class(month.value === todayMonth),
                    ...blockBodyList
                      .element('item')
                      .modifier('selected')
                      .class(month.value === this.month),
                  }}
                  tabIndex={-1}
                  onClick={() => this.onClickMonth(month.value)}
                >
                  {month.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          class={{
            ...blockFoot.class(),
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
