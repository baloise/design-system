import { Component, h, ComponentInterface, Host, Element, Prop, State, Watch, Method } from '@stencil/core'
import { WeekdayCell, generateCalendarGrid, generateWeekDays, getFirstWeekdayOfMonth } from '../utils/calendar'
import { BalDate } from '../../../../utils/date'
import { LogInstance, Loggable, Logger } from '../../../../utils/log'
import { BalConfigObserver, BalConfigState, ListenToConfig } from '../../../../utils/config'
import padStart from 'lodash.padstart'

@Component({
  tag: 'bal-date-calendar',
  styleUrl: 'bal-date-calendar.sass',
  shadow: true,
})
export class DateCalendar implements ComponentInterface, Loggable, BalConfigObserver {
  @Element() el!: HTMLElement

  @State() weekdays: WeekdayCell[] = []
  @State() calendarGrid: number[][] = []
  @State() firstDayOfWeek = 0
  @State() month = 0
  @State() year = 0
  // @State() language: BalLanguage = defaultConfig.language
  // @State() region: BalRegion = defaultConfig.region

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
   * TODO:
   */
  @Prop() value?: string
  @Watch('value')
  valueChanged(newValue?: string, oldValue?: string) {
    if (newValue !== oldValue) {
      const { year, month } = BalDate.fromISO(newValue)
      if (year !== undefined && month !== undefined) {
        this.calendarGrid = generateCalendarGrid(year, month)
        this.firstDayOfWeek = getFirstWeekdayOfMonth(year, month)
        this.month = month
        this.year = year
        return
      }
    }

    const today = new Date()
    this.month = today.getMonth() + 1
    this.year = today.getFullYear()
    this.calendarGrid = generateCalendarGrid(this.year, this.month)
    this.firstDayOfWeek = getFirstWeekdayOfMonth(this.year, this.month)
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
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
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private isoDateOfDay(day: number): string {
    return `${this.year}-${padStart(`${this.month}`, 2, '0')}-${padStart(`${day}`, 2, '0')}`
  }

  private isoDateOfToday(): string {
    const today = new Date()
    return `${today.getFullYear()}-${padStart(`${today.getMonth() + 1}`, 2, '0')}-${padStart(
      `${today.getDate()}`,
      2,
      '0',
    )}`
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host>
        <div id="nav">Nav Header</div>
        <div id="grid" role="grid">
          <div id="day-of-week" role="row">
            {this.weekdays.map(weekday => (
              <span role="columnheader" aria-label={weekday.ariaLabel} title={weekday.ariaLabel}>
                {weekday.textContent}
              </span>
            ))}
          </div>
          <div id="date-grid" role="row" style={{ '--bal-date-first-week-day': `${this.firstDayOfWeek}` }}>
            {this.calendarGrid.map(row =>
              row
                .filter(day => day)
                .map(day => (
                  <button
                    class={{
                      'day-cell': true,
                      'day-cell--today': this.isoDateOfDay(day) === this.isoDateOfToday(),
                      'day-cell--selected': this.value === this.isoDateOfDay(day),
                    }}
                    tabIndex={-1}
                    type="button"
                    role="gridcell"
                  >
                    <time
                      aria-label={this.isoDateOfDay(day)}
                      title={this.isoDateOfDay(day)}
                      dateTime={this.isoDateOfDay(day)}
                    >
                      {day}
                    </time>
                  </button>
                )),
            )}
          </div>
        </div>
        <div id="footer">
          <slot></slot>
        </div>
      </Host>
    )
  }
}
