import {
  Component,
  Host,
  h,
  Element,
  State,
  Prop,
  Event,
  EventEmitter,
  Method,
  Watch,
  ComponentInterface,
  Listen,
} from '@stencil/core'
import {
  addDays,
  subDays,
  isBefore,
  isAfter,
  getDate,
  getYear,
  getMonth,
  addYears,
  subYears,
  startOfWeek,
  isSameDay,
  isWithinInterval,
  isSameWeek,
  isSameMonth,
} from 'date-fns'
import { debounceEvent, findItemLabel } from '../../../helpers/helpers'
import { BalCalendarCell, BalDateCallback, BalPointerDate } from './bal-datepicker.type'
import { isEnterKey } from '@baloise/web-app-utils'
import isNil from 'lodash.isnil'
import { ACTION_KEYS, isCtrlOrCommandKey, NUMBER_KEYS } from '../../../constants/keys.constant'
import { i18nDate } from './bal-datepicker.i18n'
import { parse, format, isValidIsoString, now, isoString } from '../../../utils/date.util'
import { BalLanguage, BalConfigState } from '../../../config/config.types'
import { detachComponentToConfig, defaultConfig, BalConfigObserver, attachComponentToConfig } from '../../../config'

@Component({
  tag: 'bal-datepicker',
})
export class Datepicker implements ComponentInterface, BalConfigObserver {
  private inputElement!: HTMLInputElement
  private popoverElement!: HTMLBalPopoverElement
  private inputId = `bal-dp-${datepickerIds++}`

  @Element() el!: HTMLElement

  @State() language: BalLanguage = defaultConfig.language
  @State() isPopoverOpen = false
  @State() selectedDate?: string | null = ''
  @State() pointerDate: BalPointerDate = {
    year: getYear(now()),
    month: getMonth(now()),
    day: getDate(now()),
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * @deprecated Define the locale of month and day names.
   */
  @Prop() locale: 'en' | 'de' | 'fr' | 'it' | '' = ''

  @Watch('locale')
  watchLocaleHandler() {
    if (this.locale !== '') {
      this.language = this.locale
    }
  }

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex = 0

  /**
   * Set this to `true` when the component is placed on a dark background.
   */
  @Prop() inverted = false

  /**
   * If `true` the attribute required is added to the native input.
   */
  @Prop() required = false

  /**
   * If `true` the use can only select a date.
   */
  @Prop() readonly = false

  /**
   * If `true` the component is diabled.
   */
  @Prop() disabled = false

  /**
   * The text to display when the select is empty.
   */
  @Prop() placeholder: string | undefined

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
   * Closes the datepicker popover after selection
   */
  @Prop() closeOnSelect = true

  /**
   * If `true` the datepicker only open on click of the icon
   */
  @Prop() triggerIcon = false

  /**
   * Earliest year available for selection
   */
  @Prop({ attribute: 'min-year' }) minYearProp: number | undefined = undefined

  /**
   * Latest year available for selection
   */
  @Prop({ attribute: 'max-year' }) maxYearProp: number | undefined = undefined

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * The date to defines where the datepicker popup starts. The prop accepts ISO 8601 date strings (YYYY-MM-DD).
   */
  @Prop() defaultDate?: string | null

  /**
   * The value of the form field, which accepts ISO 8601 date strings (YYYY-MM-DD).
   */
  @Prop({ mutable: true }) value?: string | null

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged() {
    this.selectedDate = this.value
    this.updatePointerDates()
    this.balChange.emit(this.value)
  }

  /**
   * Callback to determine which date in the datepicker should be selectable.
   */
  @Prop({ attribute: 'allowed-dates' }) allowedDates: BalDateCallback | undefined = undefined

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<string | undefined | null>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<string>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  componentWillLoad() {
    this.selectedDate = this.value
    this.updatePointerDates()
    this.updateValue(this.value)
  }

  connectedCallback() {
    this.debounceChanged()
    attachComponentToConfig(this)
  }

  configChanged(config: BalConfigState): void {
    this.language = config.language
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  /**
   * Opens the popover
   */
  @Method()
  async open(): Promise<void> {
    if (this.disabled) {
      return
    }
    if (this.popoverElement) {
      this.popoverElement.present()
    }
  }

  /**
   * Closes the popover
   */
  @Method()
  async close(): Promise<void> {
    if (this.disabled) {
      return undefined
    }
    if (this.popoverElement) {
      this.popoverElement.dismiss()
    }
  }

  /**
   * Selects an option
   */
  @Method()
  async select(datestring: string) {
    this.inputElement.value = format(parse(datestring))
    this.updateValue(datestring)
    this.updatePointerDates()

    if (this.closeOnSelect) {
      await this.popoverElement?.toggle()
    }
  }

  /**
   * Sets the focus on the input element
   */
  @Method()
  async setFocus() {
    if (this.inputElement) {
      this.inputElement.focus()
    }
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.inputElement)
  }

  private updatePointerDates() {
    let date = now()
    if (this.selectedDate) {
      date = parse(this.selectedDate) as Date
    } else {
      if (this.defaultDate) {
        date = parse(this.defaultDate) as Date
      }
    }

    this.pointerDate = {
      year: getYear(date),
      month: getMonth(date),
      day: getDate(date),
    }
  }

  private updateValue(datestring: string | undefined | null) {
    if (!isValidIsoString(datestring)) {
      this.selectedDate = undefined
      this.value = undefined
      if (this.inputElement) {
        this.inputElement.value = ''
      }
      return
    }

    this.value = datestring
  }

  get minYear() {
    if (this.min) {
      return parseInt(this.min.substring(0, 4), 10)
    }
    return this.minYearProp ? this.minYearProp : getYear(subYears(now(), 100))
  }

  get maxYear() {
    if (this.max) {
      return parseInt(this.max.substring(0, 4), 10)
    }
    return this.maxYearProp ? this.maxYearProp : getYear(addYears(now(), 100))
  }

  get years(): number[] {
    let years = Array.from({ length: this.maxYear - this.minYear + 1 }, (_, index: number) => this.minYear + index)

    if (this.min && this.pointerDate.month === getMonth(parse(this.min) as Date)) {
      const minYear = getYear(parse(this.min) as Date)
      years = years.filter(y => y >= minYear)
    }

    if (this.max && this.pointerDate.month === getMonth(parse(this.max) as Date)) {
      const maxYear = getYear(parse(this.max) as Date)
      years = years.filter(y => y <= maxYear)
    }

    return years
  }

  get months(): { name: string; index: number }[] {
    const monthNames = i18nDate[this.language].months
    let months = monthNames.map((name, index) => ({ name, index }))

    if (this.min && this.pointerDate.year === getYear(parse(this.min) as Date)) {
      const minMonth = parseInt(this.min.substring(5, 7), 10) - 1
      months = months.filter(month => month.index >= minMonth)
    }

    if (this.max && this.pointerDate.year === getYear(parse(this.max) as Date)) {
      const maxMonth = parseInt(this.max.substring(5, 7), 10) - 1
      months = months.filter(month => month.index <= maxMonth)
    }

    return months
  }

  get weekDays(): string[] {
    const translations = [...i18nDate[this.language].weekdaysMin]
    translations.push(translations.shift() || '')
    return translations
  }

  get firstDateOfBox(): Date {
    const date = new Date(this.pointerDate.year, this.pointerDate.month, 1)
    return startOfWeek(date)
  }

  get calendarGrid(): BalCalendarCell[][] {
    const weekDatePointer = this.firstDateOfBox
    const dayDatePointer = this.firstDateOfBox
    let calendar: any[] = [] // eslint-disable-line
    do {
      let row: any[] = [] // eslint-disable-line
      do {
        row = [
          ...row,
          {
            date: new Date(dayDatePointer),
            display: format(dayDatePointer),
            dateString: isoString(dayDatePointer),
            label: getDate(dayDatePointer).toString(),
            isToday: isSameDay(dayDatePointer, now()),
            isSelected:
              parse(this.selectedDate as string) &&
              isSameDay(dayDatePointer, parse(this.selectedDate as string) as Date),
            isDisabled: !this.getAllowedDates(dayDatePointer) || !this.isDateInRange(dayDatePointer),
            isOutdated: this.pointerDate.month !== dayDatePointer.getMonth() || !this.isDateInRange(dayDatePointer),
          } as BalCalendarCell,
        ]
        dayDatePointer.setDate(dayDatePointer.getDate() + 1)
      } while (isSameWeek(dayDatePointer, weekDatePointer))
      calendar = [...calendar, row]
      weekDatePointer.setDate(weekDatePointer.getDate() + 7)
    } while (isSameMonth(new Date(this.pointerDate.year, this.pointerDate.month, this.pointerDate.day), dayDatePointer))
    return calendar
  }

  private getAllowedDates(dayDatePointer: Date): boolean {
    if (isNil(this.allowedDates)) {
      return true
    }

    return (this.allowedDates as BalDateCallback)(isoString(dayDatePointer))
  }

  private onIconClick = (event: MouseEvent) => {
    if (!this.disabled) {
      this.popoverElement.toggle()
    }
    event.stopPropagation()
  }

  private onInputClick = (event: MouseEvent) => {
    if (!this.triggerIcon && !this.disabled) {
      this.popoverElement.toggle()
    }
    event.stopPropagation()
  }

  private onPopoverChange = (event: CustomEvent<boolean>) => {
    this.isPopoverOpen = event.detail
    event.stopPropagation()
  }

  private onInput = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    this.balInput.emit(inputValue)
    event.stopPropagation()

    if (inputValue && inputValue.length >= 6) {
      const date = parse(inputValue)
      const datestring = isoString(date as Date)
      if (isValidIsoString(datestring)) {
        this.selectedDate = datestring
        this.updatePointerDates()
      }
    }
  }

  private onInputChange = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    const date = parse(inputValue)
    const datestring = isoString(date as Date)
    const formattedValue = format(date)

    this.inputElement.value = formattedValue
    this.updateValue(datestring)
    this.updatePointerDates()
  }

  private onClickDateCell = (cell: BalCalendarCell): void => {
    if (!cell.isDisabled) {
      this.select(cell.dateString)
    }
  }

  private onInputKeyUp = (event: KeyboardEvent) => {
    if (isEnterKey(event) && !this.triggerIcon) {
      const date = parse(this.inputElement.value)
      const datestring = isoString(date as Date)

      if (this.isPopoverOpen) {
        if (this.value === datestring) {
          this.close()
        }
      } else {
        if (this.value !== datestring) {
          this.open()
        }
      }
    }
  }

  private onInputKeyDown = (event: KeyboardEvent) => {
    const allowedKeys = [...NUMBER_KEYS, '.', ...ACTION_KEYS]
    if (!isCtrlOrCommandKey(event) && allowedKeys.indexOf(event.key) < 0) {
      event.preventDefault()
      event.stopPropagation()
    }
    if (event.key === 'Tab') {
      this.close()
    }
  }

  private onInputFocus = (event: FocusEvent) => {
    this.balFocus.emit(event)
  }

  private onInputBlur = (event: FocusEvent) => {
    this.balBlur.emit(event)
  }

  private onMonthSelect = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    this.pointerDate = {
      ...this.pointerDate,
      month: parseInt(inputValue, 10),
    }
  }

  private onYearSelect = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    const yearValue = parseInt(inputValue, 10)
    this.pointerDate = {
      ...this.pointerDate,
      year: yearValue,
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  render() {
    return (
      <Host
        role="datepicker"
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'is-disabled': this.disabled,
        }}
      >
        <bal-popover onBalChange={this.onPopoverChange} ref={el => (this.popoverElement = el as HTMLBalPopoverElement)}>
          {this.renderInput()}
          <bal-popover-content>
            <div class="datepicker-popup">
              {this.renderHeader()}
              {this.renderBody()}
              <div class="datepicker-footer">
                <slot></slot>
              </div>
            </div>
          </bal-popover-content>
        </bal-popover>
      </Host>
    )
  }

  renderInput() {
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    return (
      <div bal-popover-trigger class="control has-icons-right">
        <input
          class={{
            'input': true,
            'data-test-input': true,
            'clickable': !this.disabled && !this.triggerIcon,
            'is-inverted': this.inverted,
            'is-disabled': this.disabled,
            'is-danger': this.invalid,
          }}
          ref={el => (this.inputElement = el as HTMLInputElement)}
          id={this.inputId}
          aria-labelledby={labelId}
          type="text"
          maxlength="10"
          autoComplete="off"
          name={this.name}
          value={format(parse(this.value || ''))}
          required={this.required}
          disabled={this.disabled}
          readonly={this.readonly}
          placeholder={this.placeholder}
          tabindex={this.balTabindex}
          onKeyDown={e => this.onInputKeyDown(e)}
          onKeyUp={e => this.onInputKeyUp(e)}
          onInput={this.onInput}
          onClick={this.onInputClick}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
          onFocus={this.onInputFocus}
        />
        <bal-icon
          class="datepicker-trigger-icon clickable"
          is-right
          color={this.invalid ? 'danger' : 'info'}
          inverted={this.inverted}
          name="date"
          onClick={this.onIconClick}
        />
      </div>
    )
  }

  renderBody() {
    return (
      <section class="datepicker-table">
        {this.renderWeekDayHeader()}
        <div class="datepicker-body">
          {this.calendarGrid.map(row => (
            <div class="datepicker-row">
              {row.map(cell => (
                <div
                  data-date={cell.dateString}
                  onClick={() => this.onClickDateCell(cell)}
                  class={{
                    'datepicker-cell': true,
                    'is-today': cell.isToday,
                    'is-selected': cell.isSelected,
                    'is-outdated': cell.isOutdated,
                    'is-disabled': cell.isDisabled,
                    'is-selectable': !cell.isDisabled,
                  }}
                >
                  {cell.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    )
  }

  renderWeekDayHeader() {
    return (
      <header class="datepicker-header">
        {this.weekDays.map(weekday => (
          <div class="datepicker-cell">{weekday}</div>
        ))}
      </header>
    )
  }

  renderHeader() {
    return (
      <header class="datepicker-header">
        <div class="pagination field is-centered">
          <a
            role="button"
            onClick={() => this.previousMonth()}
            class={{
              'pagination-previous': true,
              'is-disabled': this.isPreviousMonthDisabled,
            }}
          >
            <bal-icon name="nav-go-left" size="small" />
          </a>
          <a
            role="button"
            onClick={() => this.nextMonth()}
            class={{
              'pagination-next': true,
              'is-disabled': this.isNextMonthDisabled,
            }}
          >
            <bal-icon name="nav-go-right" size="small" />
          </a>
          <div class="pagination-list">
            <div class="field has-addons">
              <div class="control month-select">
                <span class="select">
                  <select onInput={this.onMonthSelect}>
                    {this.months.map(month => (
                      <option value={month.index} selected={this.pointerDate.month === month.index}>
                        {month.name}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div class="control year-select">
                <span class="select">
                  <select onInput={this.onYearSelect}>
                    {this.years.map(year => (
                      <option value={year} selected={this.pointerDate.year === year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  private previousMonth() {
    if (!this.isPreviousMonthDisabled) {
      if (this.pointerDate.year === this.minYear && this.pointerDate.month === 0) {
        return
      }

      this.pointerDate = this.calcPreviousMonth()
    }
  }

  private nextMonth() {
    if (!this.isNextMonthDisabled) {
      if (this.pointerDate.year === this.maxYear && this.pointerDate.month === 11) {
        return
      }
      this.pointerDate = this.calcNextMonth()
    }
  }

  private calcPreviousMonth(): BalPointerDate {
    if (this.pointerDate.month === 0) {
      return { ...this.pointerDate, year: this.pointerDate.year - 1, month: 11 }
    } else {
      return { ...this.pointerDate, month: this.pointerDate.month - 1 }
    }
  }

  private calcNextMonth(): BalPointerDate {
    if (this.pointerDate.month === 11) {
      return { ...this.pointerDate, year: this.pointerDate.year + 1, month: 0 }
    } else {
      return { ...this.pointerDate, month: this.pointerDate.month + 1 }
    }
  }

  private lastDayOfMonth(year: number, month: number): number {
    const d = new Date(year, month + 1, 0)
    return getDate(d)
  }

  private get isPreviousMonthDisabled() {
    if (this.min) {
      const minDate = parse(this.min) as Date
      const lastDayOfMonth = this.lastDayOfMonth(this.calcPreviousMonth().year, this.calcPreviousMonth().month)
      const beforeDate = new Date(this.calcPreviousMonth().year, this.calcPreviousMonth().month, lastDayOfMonth)
      return isBefore(beforeDate, subDays(minDate, 1))
    }
    return false
  }

  private get isNextMonthDisabled() {
    if (this.max) {
      const maxDate = parse(this.max) as Date
      const beforeDate = new Date(this.calcNextMonth().year, this.calcNextMonth().month, 1)
      return isAfter(beforeDate, addDays(maxDate, 1))
    }
    return false
  }

  private isDateInRange(cellDate: Date): boolean {
    if (this.min && this.max) {
      return isWithinInterval(cellDate, {
        start: parse(this.min) as Date,
        end: parse(this.max) as Date,
      })
    }
    if (this.min) {
      return isAfter(cellDate, parse(this.min) as Date)
    }
    if (this.max) {
      return isBefore(cellDate, addDays(parse(this.max) as Date, 1))
    }
    return true
  }
}

let datepickerIds = 0
