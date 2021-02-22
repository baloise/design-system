import { Component, Host, h, Element, State, Prop, Event, EventEmitter, Method, Watch, ComponentInterface, Listen } from '@stencil/core'
import { debounceEvent, findItemLabel } from '../../helpers/helpers'
import { BalCalendarCell, BalDateCallback, BalPointerDate } from './bal-datepicker.type'
import { day, format, month, now, year, isValidDate, decreaseYear, getFirstDayOfTheWeek, isSameDay, isInRange, isSameWeek, isSameMonth, parseDate } from '../../utils/balDateUtil'
import { isEnterKey } from '../../utils/balKeyUtil'
import { ACTION_KEYS, NUMBER_KEYS } from '../../constants/keys.constant'
import { convertInputValueToDateString, formatInputValue, isValidDateString } from './bal-datepicker.utils'
import { i18nDate } from './bal-datepicker.i18n'

@Component({
  tag: 'bal-datepicker',
  styleUrl: 'bal-datepicker.scss',
  scoped: true,
  shadow: false,
})
export class Datepicker implements ComponentInterface {
  private inputElement!: HTMLInputElement
  private dropdownElement!: HTMLBalDropdownElement
  private inputId = `bal-dp-${datepickerIds++}`

  @Element() el!: HTMLElement

  @State() isDropdownOpen: boolean = false
  @State() selectedDate?: string | null = ''
  @State() pointerDate: BalPointerDate = {
    year: year(now()),
    month: month(now()),
    day: day(now()),
  }

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
  @Prop({ mutable: true }) value?: string | null

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged() {
    this.updatePointerDates()
    this.selectedDate = this.value
    this.balChange.emit(this.value)
  }

  /**
   * Callback to determine which date in the datepicker should be selectable.
   */
  @Prop() filter: BalDateCallback = _ => true

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
    this.updatePointerDates()
  }

  connectedCallback() {
    this.debounceChanged()
  }

  /**
   * Opens the dropdown
   */
  @Method()
  async open(): Promise<void> {
    if (this.disabled) {
      return
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
    this.inputElement.value = format(date)
    this.updateValue(date.toLocaleString())
    this.updatePointerDates()

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

  private updatePointerDates() {
    let date = parseDate(this.selectedDate)
    if (date === undefined) {
      date = now()
    }
    this.pointerDate = {
      year: year(date),
      month: month(date),
      day: day(date),
    }
  }

  private updateValue(value: string | undefined) {
    if (!isValidDate(value)) {
      this.selectedDate = undefined
      this.value = undefined
      this.inputElement.value = ''
      return
    }

    this.value = convertInputValueToDateString(this.value)
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
    translations.push(translations.shift() || '')
    return translations
  }

  get firstDateOfBox(): Date {
    const date = new Date(this.pointerDate.year, this.pointerDate.month, 1)
    return getFirstDayOfTheWeek(date)
  }

  get calendarGrid(): BalCalendarCell[][] {
    let weekDatePointer = this.firstDateOfBox
    let dayDatePointer = this.firstDateOfBox
    let calendar: any[] = []
    do {
      let row: any[] = []
      do {
        row = [
          ...row,
          {
            date: new Date(dayDatePointer),
            dateString: format(dayDatePointer),
            label: day(dayDatePointer).toString(),
            isToday: isSameDay(dayDatePointer, now()),
            isSelected: parseDate(this.selectedDate) && isSameDay(dayDatePointer, parseDate(this.selectedDate) as Date),
            isDisabled: !this.filter(dayDatePointer),
            isOutdated: this.pointerDate.month !== dayDatePointer.getMonth() || !isInRange(dayDatePointer, parseDate(this.min), parseDate(this.max)),
          } as BalCalendarCell,
        ]
        dayDatePointer.setDate(dayDatePointer.getDate() + 1)
      } while (isSameWeek(dayDatePointer, weekDatePointer))
      calendar = [...calendar, row]
      weekDatePointer.setDate(weekDatePointer.getDate() + 7)
    } while (isSameMonth(new Date(this.pointerDate.year, this.pointerDate.month, this.pointerDate.day), dayDatePointer))
    return calendar
  }

  private onIconClick = (event: MouseEvent) => {
    if (!this.disabled) {
      this.dropdownElement.toggle()
    }
    event.stopPropagation()
  }

  private onInputClick = (event: MouseEvent) => {
    if (!this.triggerIcon && !this.disabled) {
      this.dropdownElement.toggle()
    }
    event.stopPropagation()
  }

  private onDropdownChange = (event: CustomEvent<boolean>) => {
    this.isDropdownOpen = event.detail
    event.stopPropagation()
  }

  private onInput = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    this.balInput.emit(inputValue)
    event.stopPropagation()

    if (isValidDateString(inputValue)) {
      this.selectedDate = formatInputValue(inputValue)
      this.updatePointerDates()
    }
  }

  private onInputChange = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    const formattedValue = formatInputValue(inputValue)
    this.inputElement.value = formattedValue
    const date = convertInputValueToDateString(formattedValue)
    this.updateValue(date)
    this.updatePointerDates()
  }

  private onClickDateCell = (cell: BalCalendarCell): void => {
    if (!cell.isDisabled) {
      this.select(cell.date)
    }
  }

  private onInputKeyDown = (event: KeyboardEvent) => {
    const allowedKeys = [...NUMBER_KEYS, '.', ...ACTION_KEYS]
    if (allowedKeys.indexOf(event.key) < 0) {
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
    this.pointerDate = {
      ...this.pointerDate,
      year: parseInt(inputValue, 10),
    }
  }

  private onKeyPress = (event: KeyboardEvent) => {
    if (isEnterKey(event)) {
      if (!this.isDropdownOpen) {
        this.open()
      }
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
        <bal-dropdown expanded={this.expanded} fixedContentWidth={true} onBalCollapse={this.onDropdownChange} ref={el => (this.dropdownElement = el as HTMLBalDropdownElement)}>
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
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
          onFocus={this.onInputFocus}
        />
        <bal-icon class="datepicker-trigger-icon clickable" is-right color="info" inverted={this.inverted} name="date" onClick={this.onIconClick} />
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
                  ].join(' ')}
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
                      <option value={index} selected={this.pointerDate.month === index}>
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
    if (this.pointerDate.year === this.minYear && this.pointerDate.month === 0) {
      return
    }
    if (this.pointerDate.month === 0) {
      this.pointerDate = { ...this.pointerDate, year: this.pointerDate.year - 1, month: 11 }
    } else {
      this.pointerDate = { ...this.pointerDate, month: this.pointerDate.month - 1 }
    }
  }

  private nextMonth() {
    if (this.pointerDate.year === this.maxYear && this.pointerDate.month === 11) {
      return
    }
    if (this.pointerDate.month === 11) {
      this.pointerDate = { ...this.pointerDate, year: this.pointerDate.year + 1, month: 0 }
    } else {
      this.pointerDate = { ...this.pointerDate, month: this.pointerDate.month + 1 }
    }
  }
}

let datepickerIds = 0
