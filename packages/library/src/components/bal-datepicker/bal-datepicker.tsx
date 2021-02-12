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
} from '@stencil/core'
import { debounceEvent, findItemLabel } from '../../utils/helpers'
import { actionKeys, isEnterKey, numberKeys } from '../../utils/key.util'
import { i18nDate } from './bal-datepicker.i18n'
import { BalCalendarCell, BalDateCallback } from './bal-datepicker.type'
import {
  decreaseYear,
  isSameDay,
  isSameMonth,
  isSameWeek,
  now,
  year,
  getFirstDayOfTheWeek,
  day,
  format,
  month,
  getLastDayOfMonth,
  isInRange,
  isValidDate,
} from './bal-datepicker.util'

@Component({
  tag: 'bal-datepicker',
  styleUrl: 'bal-datepicker.scss',
  scoped: true,
  shadow: false,
})
export class Datepicker implements ComponentInterface {
  private inputElement!: HTMLInputElement
  private dropdownElement!: HTMLBalDropdownElement
  private didInit = false
  private hasFocus = false
  private inputId = `bal-dp-${datepickerIds++}`

  @Element() el!: HTMLElement

  @State() isDropdownOpen: boolean = false
  @State() pointerMonth: number = 10
  @State() pointerYear: number = 2020
  @State() pointerDay: number = 1

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component uses the whole width.
   */
  @Prop() locale: 'en' | 'de' | 'fr' | 'it' = 'en'

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex: number = 0

  /**
   * If `true` the component uses the whole width.
   */
  @Prop() expanded = false

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
  @Prop() placeholder?: string | null

  /**
   * Latest date available for selection
   */
  @Prop() maxDate: Date

  /**
   * Earliest date available for selection
   */
  @Prop() minDate: Date

  /**
   * Closes the datepicker dropdown after selection
   */
  @Prop() closeOnSelect: boolean = true

  /**
   * If `true` the datepicker only open on click of the icon
   */
  @Prop() triggerIcon: boolean = false

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
   * Selected date. Could also be passed as a string, which gets transformed to js date object.
   */
  @Prop({ mutable: true }) value: Date | null

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged(newValue: Date | null, oldValue: Date | null) {
    if (this.didInit && !this.hasFocus && newValue !== oldValue) {
      this.balChange.emit(this.value)
    }
  }

  /**
   * Callback to determine which date in the datepicker should be selectable.
   */
  @Prop() filter: BalDateCallback = _ => true

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<Date>

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

  connectedCallback() {
    this.debounceChanged()
  }

  componentDidLoad() {
    this.didInit = true
  }

  /**
   * Opens the dropdown
   */
  @Method()
  async open(): Promise<void> {
    if (this.disabled) {
      return undefined
    }
    if (this.dropdownElement) {
      this.dropdownElement.open()
    }
  }

  /**
   * Closes the dropdown
   */
  @Method()
  async close(): Promise<void> {
    if (this.disabled) {
      return undefined
    }
    if (this.dropdownElement) {
      this.dropdownElement.close()
    }
  }

  /**
   * Selects an option
   */
  @Method()
  async select(date: Date) {
    this.value = new Date(date)
    this.updateFromValue()
    this.balChange.emit(this.value)
    if (this.closeOnSelect) {
      await this.dropdownElement?.toggle()
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

  componentWillLoad() {
    if (this.value) {
      this.value = this.parseValue(this.value)
      setTimeout(() => this.updateFromValue(), 0)
    }
  }

  parseValue(value: Date | string | undefined): Date {
    if (value === undefined) {
      return undefined
    } else {
      if (typeof value === 'object') {
        return value
      } else {
        return new Date(value)
      }
    }
  }

  get pointerDate(): Date {
    return new Date(this.pointerYear, this.pointerMonth, this.pointerDay)
  }

  get minYear() {
    return this.minYearProp ? this.minYearProp : decreaseYear(now(), 100)
  }

  get maxYear() {
    return this.maxYearProp ? this.maxYearProp : year(now())
  }

  get years(): number[] {
    return Array.from({ length: this.maxYear - this.minYear + 1 }, (_, index: number) => this.minYear + index)
  }

  get weekDays(): string[] {
    const translations = [...i18nDate[this.locale].weekdaysMin]
    translations.push(translations.shift())
    return translations
  }

  get firstDateOfBox(): Date {
    const date = new Date(this.pointerYear, this.pointerMonth, 1)
    return getFirstDayOfTheWeek(date)
  }

  get calendarGrid(): BalCalendarCell[][] {
    let weekDatePointer = this.firstDateOfBox
    let dayDatePointer = this.firstDateOfBox
    let calendar = []
    do {
      let row = []
      do {
        row = [
          ...row,
          {
            date: new Date(dayDatePointer),
            dateString: format(dayDatePointer),
            label: day(dayDatePointer).toString(),
            isToday: isSameDay(dayDatePointer, now()),
            isSelected: this.value && isSameDay(dayDatePointer, this.value),
            isDisabled: !this.filter(dayDatePointer),
            isOutdated:
              this.pointerMonth !== dayDatePointer.getMonth() || !isInRange(dayDatePointer, this.minDate, this.maxDate),
          } as BalCalendarCell,
        ]
        dayDatePointer.setDate(dayDatePointer.getDate() + 1)
      } while (isSameWeek(dayDatePointer, weekDatePointer))
      calendar = [...calendar, row]
      weekDatePointer.setDate(weekDatePointer.getDate() + 7)
    } while (isSameMonth(this.pointerDate, dayDatePointer))
    return calendar
  }

  private onIconClick = (event: MouseEvent) => {
    this.dropdownElement.toggle()
    event.stopPropagation()
  }

  private onInputClick = (event: MouseEvent) => {
    if (!this.triggerIcon) {
      this.dropdownElement.toggle()
    }
    event.stopPropagation()
  }

  private onDropdownChange = (event: CustomEvent<boolean>) => {
    this.isDropdownOpen = event.detail
    event.stopPropagation()
  }

  private onInput = (event: InputEvent) => {
    const inputValue = (event.target as HTMLInputElement).value
    this.parseAndSetDate(inputValue)

    this.balInput.emit(inputValue)
    event.stopPropagation()
  }

  private onClickDateCell = (cell: BalCalendarCell): void => {
    if (!cell.isDisabled) {
      this.select(cell.date)
    }
  }

  private onInputKeyDown = (event: KeyboardEvent) => {
    const allowedKeys = [...numberKeys, '.', ...actionKeys]
    if (allowedKeys.indexOf(event.key) < 0) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private onInputFocus = (event: FocusEvent) => {
    this.hasFocus = true
    this.balFocus.emit(event)
  }

  private onInputBlur = (event: FocusEvent) => {
    this.hasFocus = false
    this.balBlur.emit(event)
    this.parseAndSetDate(this.inputElement.value, true)
    this.balChange.emit(this.value)
  }

  private onMonthSelect = (event: InputEvent) => {
    const inputValue = (event.target as HTMLInputElement).value
    this.pointerMonth = parseInt(inputValue, 10)
  }

  private onYearSelect = (event: InputEvent) => {
    const inputValue = (event.target as HTMLInputElement).value
    this.pointerYear = parseInt(inputValue, 10)
  }

  private onKeyPress = (event: KeyboardEvent) => {
    if (isEnterKey(event)) {
      if (!this.isDropdownOpen) {
        this.open()
      }
    }
  }

  render() {
    return (
      <Host role="datepicker" aria-disabled={this.disabled ? 'true' : null}>
        <bal-dropdown
          expanded={this.expanded}
          fixedContentWidth={true}
          onBalCollapse={this.onDropdownChange}
          ref={el => (this.dropdownElement = el as HTMLBalDropdownElement)}>
          <bal-dropdown-trigger>{this.renderInput()}</bal-dropdown-trigger>
          <bal-dropdown-menu>
            <div class="datepicker-popup">
              {this.renderHeader()}
              {this.renderBody()}
              <div class="datepicker-footer">
                <slot></slot>
              </div>
            </div>
          </bal-dropdown-menu>
        </bal-dropdown>
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
      <div class="control has-icons-right">
        <input
          class={{
            'input': true,
            'clickable': !this.disabled && !this.triggerIcon,
            'is-inverted': this.inverted,
            'is-disabled': this.disabled,
          }}
          ref={el => (this.inputElement = el as HTMLInputElement)}
          id={this.inputId}
          aria-labelledby={labelId}
          type="text"
          maxlength="10"
          autoComplete="off"
          value={format(this.value)}
          required={this.required}
          disabled={this.disabled}
          readonly={this.readonly}
          placeholder={this.placeholder}
          tabindex={this.balTabindex}
          onKeyPress={this.onKeyPress}
          onKeyDown={e => this.onInputKeyDown(e)}
          onInput={this.onInput}
          onClick={this.onInputClick}
          onBlur={this.onInputBlur}
          onFocus={this.onInputFocus}
        />
        <bal-icon
          class="datepicker-trigger-icon clickable"
          is-right
          color="info"
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
                  class={[
                    'datepicker-cell',
                    cell.isToday ? 'is-today' : '',
                    cell.isSelected ? 'is-selected' : '',
                    cell.isOutdated ? 'is-outdated' : '',
                    cell.isDisabled ? 'is-disabled' : '',
                    !cell.isOutdated && !cell.isDisabled ? 'is-selectable' : '',
                  ].join(' ')}>
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
          <a role="button" onClick={() => this.previousMonth()} class="pagination-previous">
            <bal-icon name="nav-go-left" size="small" />
          </a>
          <a role="button" onClick={() => this.nextMonth()} class="pagination-next">
            <bal-icon name="nav-go-right" size="small" />
          </a>
          <div class="pagination-list">
            <div class="field has-addons">
              <div class="control month-select">
                <span class="select">
                  <select onInput={this.onMonthSelect}>
                    {i18nDate[this.locale].months.map((month, index) => (
                      <option value={index} selected={this.pointerMonth === index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div class="control year-select">
                <span class="select">
                  <select onInput={this.onYearSelect}>
                    {this.years.map(year => (
                      <option value={year} selected={this.pointerYear === year}>
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

  private updateFromValue() {
    if (this.value && isValidDate(this.value)) {
      this.inputElement.value = format(this.value)
      this.pointerYear = year(this.value)
      this.pointerMonth = month(this.value)
      this.pointerDay = day(this.value)
    }
  }

  private parseAndSetDate(inputValue: string, shouldFormat = false) {
    if (inputValue.length >= 8) {
      const parts = inputValue.split('.')
      if (parts.length === 3) {
        const year = parseInt(parts[2], 10)
        const month = parseInt(parts[1], 10) - 1
        if (parts[2].length === 4 && year >= 1900 && month < 12 && month >= 0) {
          const day = parseInt(parts[0], 10)
          const lastDayOfMonth = getLastDayOfMonth(year, month)
          if (0 < day && day <= lastDayOfMonth) {
            const d = new Date(year, month, day)
            this.value = d
            this.pointerMonth = month
            this.pointerYear = year
            if (shouldFormat) {
              this.inputElement.value = format(d)
            }
          }
        }
      }
    }
  }

  private previousMonth() {
    if (this.pointerYear === this.minYear && this.pointerMonth === 0) {
      return
    }
    if (this.pointerMonth === 0) {
      this.pointerYear = this.pointerYear - 1
      this.pointerMonth = 11
    } else {
      this.pointerMonth = this.pointerMonth - 1
    }
  }

  private nextMonth() {
    if (this.pointerYear === this.maxYear && this.pointerMonth === 11) {
      return
    }
    if (this.pointerMonth === 11) {
      this.pointerYear = this.pointerYear + 1
      this.pointerMonth = 0
    } else {
      this.pointerMonth = this.pointerMonth + 1
    }
  }
}

let datepickerIds = 0
