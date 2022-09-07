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
import { debounceEvent, findItemLabel, inheritAttributes } from '../../../helpers/helpers'
import { BalCalendarCell, BalPointerDate } from './bal-datepicker.type'
import {
  isSpaceKey,
  parse,
  format,
  isValidIsoString,
  now,
  formatDateString,
  isEnterKey,
  dateSeparator,
} from '@baloise/web-app-utils'
import isNil from 'lodash.isnil'
import { ACTION_KEYS, isCtrlOrCommandKey, NUMBER_KEYS } from '../../../constants/keys.constant'
import { i18nDate } from './bal-datepicker.i18n'
import { BalLanguage, BalConfigState, BalRegion } from '../../../config/config.types'
import {
  detachComponentToConfig,
  defaultConfig,
  BalConfigObserver,
  attachComponentToConfig,
  useBalConfig,
  defaultLocale,
} from '../../../config'
import {
  FormInput,
  getInputTarget,
  inputHandleFocus,
  inputHandleHostClick,
  inputListenOnClick,
  inputSetBlur,
  inputSetFocus,
  stopEventBubbling,
} from '../../../helpers/form-input.helpers'
import { Props, Events } from '../../../types'
import { preventDefault } from '../bal-select/utils/utils'
import { BEM } from '../../../utils/bem'
import { isPlatform } from '../../../utils/platform'

@Component({
  tag: 'bal-datepicker',
})
export class Datepicker implements ComponentInterface, BalConfigObserver, FormInput<string | undefined> {
  private inputId = `bal-dp-${datepickerIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private popoverElement!: HTMLBalPopoverElement

  nativeInput!: HTMLInputElement
  inputValue = this.value

  @Element() el!: HTMLElement

  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
  @State() isMobile = isPlatform('mobile')
  @State() hasFocus = false
  @State() isPopoverOpen = false
  @State() selectedDate?: string = ''
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
   * Set this to `true` when the component is placed on a dark background.
   */
  @Prop() inverted = false

  /**
   * If `true` the attribute required is added to the native input.
   */
  @Prop() required = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string

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
  @Prop({ attribute: 'min-year' }) minYearProp?: number

  /**
   * Latest year available for selection
   */
  @Prop({ attribute: 'max-year' }) maxYearProp?: number

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
  @Prop() defaultDate?: string

  /**
   * The value of the form field, which accepts ISO 8601 date strings (YYYY-MM-DD).
   */
  @Prop({ mutable: true }) value?: string

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged() {
    this.selectedDate = this.value
    this.updatePointerDates()
  }

  /**
   * Callback to determine which date in the datepicker should be selectable.
   */
  @Prop({ attribute: 'allowed-dates' }) allowedDates: Props.BalDatepickerCallback | undefined = undefined

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<Events.BalDatepickerChangeDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<Events.BalDatepickerInputDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(event: UIEvent) {
    inputListenOnClick(this, event)
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    const formElement = event.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = undefined
    }
  }

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isMobile = isPlatform('mobile')
  }

  connectedCallback() {
    this.debounceChanged()
    attachComponentToConfig(this)
  }

  componentDidLoad() {
    this.inputValue = this.value
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])

    this.selectedDate = this.value
    this.updatePointerDates()
    this.updateValue(this.value, false)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  configChanged(config: BalConfigState): void {
    this.language = config.language
    this.region = config.region
  }

  /**
   * Opens the popover
   */
  @Method()
  async open(): Promise<void> {
    if (!this.disabled && this.popoverElement) {
      this.popoverElement.present()
    }
  }

  /**
   * Closes the popover
   */
  @Method()
  async close(): Promise<void> {
    if (!this.disabled && this.popoverElement) {
      this.popoverElement.dismiss()
    }
  }

  /**
   * Selects an option
   */
  @Method()
  async select(dateString: string) {
    this.nativeInput.value = format(this.getLocale(), parse(dateString))
    this.updateValue(dateString)
    this.updatePointerDates()

    if (this.closeOnSelect) {
      await this.popoverElement?.toggle()
    }
  }

  /**
   * Sets focus on the native `input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    inputSetFocus(this)
  }

  /**
   * Sets blur on the native `input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    inputSetBlur(this)
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput)
  }

  private updatePointerDates() {
    let date = now()
    date.setDate(1)
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

  private updateValue(dateString: string | undefined, isHuman = true) {
    if (!isValidIsoString(dateString)) {
      this.selectedDate = undefined
      this.value = undefined
      if (this.nativeInput) {
        this.nativeInput.value = ''
      }
    }

    if (this.value !== dateString) {
      this.value = dateString
      if (isHuman) {
        this.balChange.emit(this.value)
      }
    }
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
    const monthNames = i18nDate[this.language].monthsShort
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
    return startOfWeek(date, { weekStartsOn: 1 })
  }

  getLocale(): string {
    const config = useBalConfig()
    return (config && config.locale) || defaultLocale
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
            display: format(this.getLocale(), dayDatePointer),
            dateString: formatDateString(dayDatePointer),
            label: getDate(dayDatePointer).toString(),
            isToday: isSameDay(dayDatePointer, now()),
            isSelected:
              parse(this.selectedDate as string) !== undefined &&
              isSameDay(dayDatePointer, parse(this.selectedDate as string) as Date),
            isDisabled: !this.getAllowedDates(dayDatePointer) || !this.isDateInRange(dayDatePointer),
            isOutdated: this.pointerDate.month !== dayDatePointer.getMonth() || !this.isDateInRange(dayDatePointer),
          } as BalCalendarCell,
        ]
        dayDatePointer.setDate(dayDatePointer.getDate() + 1)
      } while (isSameWeek(dayDatePointer, weekDatePointer, { weekStartsOn: 1 }))
      calendar = [...calendar, row]
      weekDatePointer.setDate(weekDatePointer.getDate() + 7)
    } while (isSameMonth(new Date(this.pointerDate.year, this.pointerDate.month, this.pointerDate.day), dayDatePointer))
    return calendar
  }

  private getAllowedDates(dayDatePointer: Date): boolean {
    if (isNil(this.allowedDates)) {
      return true
    }

    return (this.allowedDates as Props.BalDatepickerCallback)(formatDateString(dayDatePointer))
  }

  private onIconClick = (event: MouseEvent) => {
    if (!this.disabled && !this.readonly) {
      this.popoverElement.toggle()
    }
    stopEventBubbling(event)
    this.balClick.emit(event)
  }

  private onInputClick = (event: MouseEvent) => {
    if (!this.triggerIcon && !this.disabled && !this.readonly) {
      this.popoverElement.toggle()
    }
    stopEventBubbling(event)
    if (!this.triggerIcon) {
      this.balClick.emit(event)
    }
  }

  private onPopoverChange = (event: CustomEvent<boolean>) => {
    this.isPopoverOpen = event.detail
    preventDefault(event)

    if (!this.isPopoverOpen) {
      this.balBlur.emit()
    }
  }

  private onInput = (event: Event) => {
    const input = getInputTarget(event)

    if (input) {
      this.inputValue = input.value
      if (this.inputValue && this.inputValue.length >= 6) {
        const date = parse(this.inputValue, this.getLocale())
        const dateString = formatDateString(date as Date)
        if (isValidIsoString(dateString)) {
          this.selectedDate = dateString
          this.updatePointerDates()
        }
      }
    }

    this.balInput.emit(this.inputValue)
  }

  private onInputChange = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    const date = parse(inputValue, this.getLocale())
    const dateString = formatDateString(date as Date)
    const formattedValue = format(this.getLocale(), date)

    this.nativeInput.value = formattedValue
    this.updateValue(dateString)
    this.updatePointerDates()
  }

  private onClickDateCell = (cell: BalCalendarCell): void => {
    if (!cell.isDisabled) {
      this.select(cell.dateString)
    }
  }

  private onInputKeyUp = (event: KeyboardEvent) => {
    if (isSpaceKey(event) && !this.triggerIcon) {
      if (this.isPopoverOpen) {
        this.close()
      } else {
        this.open()
      }
    }

    if (isEnterKey(event) && !this.triggerIcon) {
      const date = parse(this.nativeInput.value, this.getLocale())
      const dateString = formatDateString(date as Date)

      if (this.isPopoverOpen) {
        if (this.value === dateString) {
          this.close()
        }
      }
    }
  }

  private onInputKeyDown = (event: KeyboardEvent) => {
    const separator = dateSeparator(this.getLocale())
    const allowedKeys = [...NUMBER_KEYS, separator, ...ACTION_KEYS]
    if (!isCtrlOrCommandKey(event) && allowedKeys.indexOf(event.key) < 0) {
      event.preventDefault()
      event.stopPropagation()
    }
    if (event.key === 'Tab') {
      this.close()
    }
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

  private onInputFocus = (event: FocusEvent) => inputHandleFocus(this, event)

  private onInputBlur = (event: FocusEvent) => {
    preventDefault(event)
    this.hasFocus = false
  }

  private handleClick = (event: MouseEvent) => inputHandleHostClick(this, event)

  render() {
    const block = BEM.block('datepicker')
    const native = block.element('native')
    const popup = block.element('popup')
    const popupBody = popup.element('body')
    const popupFooter = popup.element('footer')

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          ...block.class(),
          ...block.modifier('disabled').class(this.disabled || this.readonly),
        }}
      >
        <input
          type="date"
          class={{ ...native.class() }}
          name={this.name}
          value={this.value}
          min={this.min}
          max={this.max}
        ></input>
        <bal-popover onBalChange={this.onPopoverChange} ref={el => (this.popoverElement = el as HTMLBalPopoverElement)}>
          {this.renderInput()}
          <bal-popover-content spaceless>
            <div class={{ ...popup.class() }}>
              {this.renderHeader()}
              <div class={{ ...popupBody.class() }}>{this.renderGrid()}</div>
              <div class={{ ...popupFooter.class() }}>
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
      <div bal-popover-trigger class="control">
        <bal-input-group disabled={this.disabled || this.readonly} invalid={this.invalid}>
          <input
            class={{
              'input': true,
              'data-test-input': true,
              'is-clickable': !this.disabled && !this.triggerIcon && !this.readonly,
              'is-inverted': this.inverted,
              'is-disabled': this.disabled || this.readonly,
              'is-danger': this.invalid,
            }}
            ref={el => (this.nativeInput = el as HTMLInputElement)}
            id={this.inputId}
            aria-labelledby={labelId}
            type="text"
            maxlength="10"
            autoComplete="off"
            value={format(this.getLocale(), parse(this.value || ''))}
            required={this.required}
            disabled={this.disabled}
            readonly={this.readonly}
            placeholder={this.placeholder}
            onKeyDown={e => this.onInputKeyDown(e)}
            onKeyUp={e => this.onInputKeyUp(e)}
            onInput={this.onInput}
            onClick={this.onInputClick}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
            onFocus={this.onInputFocus}
            {...this.inheritedAttributes}
          />
          <bal-icon
            class={{
              'datepicker-trigger-icon': true,
              'is-clickable': !this.disabled && !this.readonly,
            }}
            is-right
            color={this.disabled || this.readonly ? 'grey' : this.invalid ? 'danger' : 'primary'}
            inverted={this.inverted}
            name="date"
            onClick={this.onIconClick}
          />
        </bal-input-group>
      </div>
    )
  }

  renderGrid() {
    const block = BEM.block('datepicker-grid')
    const rowEl = block.element('row')
    const cellEl = block.element('cell')

    return (
      <div>
        {this.renderWeekDayHeader()}
        <div class={{ ...block.class() }}>
          {this.calendarGrid.map(row => (
            <div class={{ ...rowEl.class() }}>
              {row.map(cell => (
                <button
                  data-date={cell.dateString}
                  onClick={() => this.onClickDateCell(cell)}
                  disabled={cell.isDisabled}
                  class={{
                    ...cellEl.class(),
                    'button': true,
                    'is-text': !cell.isDisabled && !cell.isSelected,
                    'is-primary': cell.isSelected && cell.isSelected,
                    'is-disabled': cell.isDisabled || cell.isOutdated,
                    ...cellEl.modifier('today').class(cell.isToday),
                    ...cellEl.modifier('selectable').class(!cell.isDisabled && !cell.isOutdated),
                    ...cellEl.modifier('disabled').class(cell.isDisabled || cell.isOutdated),
                    ...cellEl.modifier('selected').class(cell.isSelected),
                  }}
                >
                  <span>{cell.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  renderWeekDayHeader() {
    const block = BEM.block('datepicker-grid')
    const headerEl = block.element('header')
    const cellEl = block.element('cell')

    return (
      <header class={{ ...headerEl.class() }}>
        {this.weekDays.map(weekday => (
          <div class={{ ...cellEl.class(), ...cellEl.modifier('header').class() }}>
            <span>{weekday}</span>
          </div>
        ))}
      </header>
    )
  }

  renderHeader() {
    const block = BEM.block('datepicker-pagination')
    const innerEl = block.element('inner')
    const monthAndYearEl = block.element('month-and-year')
    const selectEl = monthAndYearEl.element('select')

    return (
      <header class={{ ...block.class() }}>
        <div class={{ ...innerEl.class() }}>
          <bal-button
            square
            size={this.isMobile ? 'small' : ''}
            color="info"
            icon="nav-go-left"
            disabled={this.isPreviousMonthDisabled}
            onClick={() => this.previousMonth()}
          ></bal-button>
          <div class={{ ...monthAndYearEl.class() }}>
            <div class={{ ...selectEl.class() }}>
              <div class="select">
                <select onInput={this.onMonthSelect}>
                  {this.months.map(month => (
                    <option value={month.index} selected={this.pointerDate.month === month.index}>
                      {month.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class={{ ...selectEl.class() }}>
              <div class="select">
                <select onInput={this.onYearSelect}>
                  {this.years.map(year => (
                    <option value={year} selected={this.pointerDate.year === year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <bal-button
            square
            size={this.isMobile ? 'small' : ''}
            color="info"
            icon="nav-go-right"
            disabled={this.isNextMonthDisabled}
            onClick={() => this.nextMonth()}
          ></bal-button>
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
    const parsedCellDate = parse(formatDateString(cellDate)) as Date
    if (this.min && this.max) {
      return isWithinInterval(parsedCellDate, {
        start: parse(this.min) as Date,
        end: parse(this.max) as Date,
      })
    }
    if (this.min) {
      return isAfter(parsedCellDate, parse(this.min) as Date)
    }
    if (this.max) {
      return isBefore(parsedCellDate, addDays(parse(this.max) as Date, 1))
    }
    return true
  }
}

let datepickerIds = 0
