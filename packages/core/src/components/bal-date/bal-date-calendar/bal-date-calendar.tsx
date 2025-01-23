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
import {
  DayCell,
  ListItem,
  WeekdayCell,
  generateCalendarGrid,
  generateMonths,
  generateWeekDays,
  generateYears,
  getFirstWeekdayOfMonth,
} from '../utils/calendar'
import { BalDate } from '../../../utils/date'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { BalConfigObserver, BalConfigState, BalLanguage, ListenToConfig, defaultConfig } from '../../../utils/config'
import { waitAfterFramePaint } from '../../../utils/helpers'
import { BEM } from '../../../utils/bem'
import { CalendarList } from './components/bal-date-calendar__list'
import { CalendarGrid } from './components/bal-date-calendar__gird'
import { BalSwipeInfo, BalSwipeObserver, ListenToSwipe } from '../../../utils/swipe'
import { CalendarNav } from './components/bal-date-calendar__nav'

@Component({
  tag: 'bal-date-calendar',
  styleUrl: 'bal-date-calendar.sass',
  shadow: true,
})
export class DateCalendar implements ComponentInterface, Loggable, BalConfigObserver, BalSwipeObserver {
  private yearListEl: HTMLUListElement | undefined
  private gridEl: HTMLDivElement | undefined
  private oldMin? = ''
  private oldMax? = ''

  @Element() el!: HTMLElement

  @State() selectedDate = ''
  @State() monthFullNames: string[] = []
  @State() weekdays: WeekdayCell[] = []
  @State() months: ListItem[] = []
  @State() years: ListItem[] = []
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
      this.updateSelections()
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

  @Watch('min')
  @Watch('max')
  rangePropChanged() {
    this.updateSelections()
    this.generateGrid()
  }

  /**
   * Earliest year available for selection
   */
  @Prop({ attribute: 'min-year' }) minYearProp?: number

  /**
   * Latest year available for selection
   */
  @Prop({ attribute: 'max-year' }) maxYearProp?: number

  @Watch('minYearProp')
  @Watch('maxYearProp')
  yearRangePropChanged() {
    this.updateSelections()
  }

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
    this.language = state.language
    this.monthFullNames = BalDate.infoMonths({ format: 'long', locale: this.language })
    this.weekdays = generateWeekDays(this.language)

    this.updateSelections()
  }

  @ListenToSwipe({ mobileOnly: true })
  swipeListener({ left, right }: BalSwipeInfo) {
    if (left) {
      this.onClickNextMonth()
    } else if (right) {
      this.onClickPreviousMonth()
    }
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

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateSelections() {
    this.years = generateYears(this.year, this.minYear, this.maxYear)
    this.months = generateMonths(this.language, this.year, this.selectedDate, this.min, this.max)
  }

  private generateGrid() {
    const date = BalDate.fromISO(this.value)
    if (date.isValid) {
      this.generateGridByDate(date)
    } else {
      this.generateGridByDefaultDate()
    }
  }

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
    if (this.month !== month || this.year !== year || this.oldMin !== this.min || this.oldMax !== this.max) {
      this.calendarGrid = generateCalendarGrid(year, month, this.min, this.max, this.allowedDates)
      this.firstDayOfWeek = getFirstWeekdayOfMonth(year, month)
    }
    this.month = month
    this.year = year
    this.oldMin = this.min
    this.oldMax = this.max
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onSelectDay = (isoDate: string | undefined): void => {
    this.valueChanged(isoDate, this.selectedDate)
    this.balChange.emit(this.selectedDate)
  }

  private onClickNextMonth = (): void => {
    let nextYear = this.year
    let nextMonth = this.month + 1
    if (nextMonth > 12) {
      nextMonth = 1
      nextYear = nextYear + 1
    }
    this.generateGridByMonthAndYear(nextMonth, nextYear)
  }

  private onClickPreviousMonth = (): void => {
    let nextYear = this.year
    let nextMonth = this.month - 1
    if (nextMonth < 1) {
      nextMonth = 12
      nextYear = nextYear - 1
    }
    this.generateGridByMonthAndYear(nextMonth, nextYear)
  }

  private onClickSelectMonthAndYear = async () => {
    this.updateSelections()

    if (this.isCalendarVisible === true) {
      this.isCalendarVisible = false
      this.isYearListVisible = true
      this.isMonthListVisible = false

      await waitAfterFramePaint()

      if (this.yearListEl) {
        const selectedYearEl = this.yearListEl.querySelector<HTMLElement>(`#year-${this.year}`)
        if (selectedYearEl) {
          const rowHeight = 26 + 8 + 4
          this.yearListEl.scrollTop = selectedYearEl.offsetTop - rowHeight * 2
        } else {
          this.yearListEl.scrollTop = 0
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
    this.months = generateMonths(this.language, newYear, this.selectedDate, this.min, this.max)
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
    const girdHeight = this.gridEl?.clientHeight || 0

    const block = BEM.block('date-calendar')
    const blockBody = block.element('body')
    const blockFoot = block.element('foot')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <CalendarNav
          language={this.language}
          monthFullNames={this.monthFullNames}
          month={this.month}
          year={this.year}
          isCalendarVisible={this.isCalendarVisible}
          isListVisible={this.isMonthListVisible || this.isYearListVisible}
          onClickSelectMonthAndYear={this.onClickSelectMonthAndYear}
          onClickPreviousMonth={this.onClickPreviousMonth}
          onClickNextMonth={this.onClickNextMonth}
        ></CalendarNav>
        <div
          class={{
            ...blockBody.class(),
          }}
        >
          <CalendarGrid
            isVisible={this.isCalendarVisible}
            grid={this.calendarGrid}
            weekdays={this.weekdays}
            firstDayOfWeek={this.firstDayOfWeek}
            selectedDate={this.selectedDate}
            ref={el => (this.gridEl = el)}
            onSelectDay={isoDate => this.onSelectDay(isoDate)}
          ></CalendarGrid>
          <CalendarList
            name="year"
            isVisible={this.isYearListVisible}
            girdHeight={girdHeight}
            list={this.years}
            ref={el => (this.yearListEl = el)}
            onSelect={item => this.onClickYear(item.value)}
          ></CalendarList>
          <CalendarList
            name="month"
            isVisible={this.isMonthListVisible}
            girdHeight={girdHeight}
            list={this.months}
            onSelect={item => this.onClickMonth(item.value)}
          ></CalendarList>
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
