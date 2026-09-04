import { Component, Element, Event, EventEmitter, h, Listen, Method, Prop, State, Watch } from '@stencil/core'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface, defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import {
  inheritAttributes,
  Logger,
  type LogInstance,
  OneOf,
  Type,
  stopEventBubbling,
  watchInvalidTextSlot,
  isEnterKey,
  isSpaceKey,
  isEscapeKey,
  isArrowDownKey,
  isArrowUpKey,
  isHomeKey,
  isEndKey,
  isTabKey,
} from '@utils'
import { Field, FieldInterface } from '../input/field.util'
import { INPUT_COLORS, InputColor } from '../input/input.interfaces'
import { PhoneChangeDetail, PhoneCountryChangeDetail, PhoneInputDetail } from './input-phone.interfaces'
import { i18nDsInputPhone } from './input-phone.i18n'
import { CountryOption, filterCountries, getCountryName, matchesCountryQuery, parseCountriesProp } from './country-data'
import { PhoneFormatter, caretFromDigitCount, countDigitsBefore, detectCountryFromInput } from './formatting'
import { getFlagUrl } from './flag'

/**
 * Input phone renders an international phone number field with a country picker
 * (flag + calling code) and a national-number input that live-formats as the user types.
 *
 * @slot invalid-text - Overrides the `invalidText` prop with custom markup, shown instead of the description when `invalid` is `true`.
 * @part inner - The inner wrapper element containing label, control, and description.
 * @part label - The label element.
 * @part control - The control container wrapping the country trigger and number field.
 * @part description - The description / validation message element.
 * @part input - The native HTML input element for the national number.
 * @part country-trigger - The country picker trigger button.
 */
@Component({
  tag: 'ds-input-phone',
  styleUrl: 'input-phone.host.scss',
  shadow: true,
  formAssociated: true,
})
export class InputPhone implements DsComponentInterface, FieldInterface {
  private inheritedAttributes: { [k: string]: any } = {}
  private formatter = new PhoneFormatter()
  private inputEl: HTMLInputElement | undefined
  private triggerEl: HTMLButtonElement | undefined
  private filterEl: HTMLInputElement | undefined
  private pendingCaret: number | null = null
  private skipCountryWatch = false
  private skipValueWatch = false
  private shouldFocusFilter = false
  private initialValue: string | null = null
  private initialResolvedCountry: string | undefined = undefined
  private disconnectInvalidTextSlotWatcher?: () => void

  inputId = `ds-input-phone-${InputPhoneIds++}`

  log!: LogInstance
  @Logger('input-phone')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @AttachInternals() internals!: ElementInternals

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() hasInvalidTextSlotContent = false
  @State() pickerOpen = false
  @State() filterQuery = ''
  @State() activeCode: string | undefined = undefined
  @State() displayValue = ''
  @State() resolvedCountry: string | undefined = undefined
  @State() nationalNumber = ''

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * The canonical phone number value in E.164 format (e.g. `+41791234567`).
   */
  @Prop({ mutable: true, reflect: true })
  @Type('string')
  value: string | null = null

  @Watch('value')
  protected valueChanged(newVal: string | null) {
    if (this.skipValueWatch) {
      return
    }
    this.applyExternalValue(newVal)
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly name: string = this.inputId

  /**
   * Allow-list of ISO 3166-1 alpha-2 country codes. Accepts a comma-separated
   * string or a string array. `undefined` / empty shows every country.
   */
  @Prop()
  readonly countries: string | string[] | undefined = undefined

  @Watch('countries')
  protected countriesChanged() {
    this.syncCountryFromProps({ emit: false })
  }

  /**
   * Uncontrolled seed for the starting country. Read once during first load.
   */
  @Prop()
  @Type('string')
  readonly initialCountry?: string

  /**
   * Live / controlled selected country (ISO 3166-1 alpha-2).
   */
  @Prop({ mutable: true })
  @Type('string')
  country?: string

  @Watch('country')
  protected countryChanged() {
    if (this.skipCountryWatch) {
      return
    }
    this.syncCountryFromProps({ emit: false })
  }

  /**
   * The label of the input, which is displayed above the input field.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * The description of the input, which is displayed below the input field.
   */
  @Prop()
  @Type('string')
  readonly description: string = ''

  /**
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop()
  @OneOf(INPUT_COLORS)
  readonly color: InputColor = 'primary'

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop()
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * The text to display when the input is in an invalid state.
   */
  @Prop()
  @Type('string')
  readonly invalidText: string = ''

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  @Type('boolean')
  readonly required: boolean = true

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form.
   */
  @Prop()
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the element can not be mutated, meaning the user can not edit the control.
   * The country picker is disabled; the number field stays focusable and selectable.
   */
  @Prop()
  @Type('boolean')
  readonly readonly: boolean = false

  /**
   * Instructional text that shows before the number field has a value.
   */
  @Prop()
  @Type('string')
  readonly placeholder: string = ''

  /**
   * Emitted on every keystroke or paste in the number field, after live formatting is applied.
   */
  @Event() dsInput!: EventEmitter<PhoneInputDetail>

  /**
   * Emitted when the number field blurs, after the blur-time reformat.
   */
  @Event() dsChange!: EventEmitter<PhoneChangeDetail>

  /**
   * Emitted when the selected country changes through the picker.
   */
  @Event() dsCountryChange!: EventEmitter<PhoneCountryChangeDetail>

  /**
   * Emitted when the number field receives focus.
   */
  @Event() dsFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when the number field loses focus.
   */
  @Event() dsBlur!: EventEmitter<FocusEvent>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback() {
    this.disconnectInvalidTextSlotWatcher = watchInvalidTextSlot(this.el, hasContent => {
      this.hasInvalidTextSlotContent = hasContent
    })
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title', 'data-hj-allow'])
    this.initializeFromProps()
    this.initialValue = this.value
    this.initialResolvedCountry = this.resolvedCountry
  }

  componentDidLoad() {
    this.syncFormValue()
  }

  componentDidRender() {
    if (this.pendingCaret !== null && this.inputEl) {
      try {
        this.inputEl.setSelectionRange(this.pendingCaret, this.pendingCaret)
      } catch {
        // Some environments reject setSelectionRange on unfocused inputs.
      }
      this.pendingCaret = null
    }

    if (this.shouldFocusFilter && this.filterEl) {
      this.filterEl.focus()
      this.shouldFocusFilter = false
    }
  }

  disconnectedCallback() {
    this.disconnectInvalidTextSlotWatcher?.()
  }

  /**
   * PUBLIC LISTENERS
   * ─────────────────────────────────────────────────────
   */

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: MouseEvent) {
    if ((this.disabled || this.readonly) && ev.target === this.el) {
      stopEventBubbling(ev)
    }

    if (this.pickerOpen && ev.target !== this.el && !this.el.contains(ev.target as Node)) {
      this.closePicker()
    }
  }

  @Listen('reset', { target: 'document' })
  listenToReset(ev: UIEvent) {
    const form = ev.target as HTMLElement
    if (form?.contains(this.el)) {
      this.setInternalCountry(this.initialResolvedCountry, { emit: false, reformat: false })
      this.applyExternalValue(this.initialValue)
    }
  }

  /**
   * PUBLIC METHODS
   * ─────────────────────────────────────────────────────
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * Sets focus on the national-number field.
   */
  @Method()
  async setFocus() {
    this.inputEl?.focus()
  }

  /**
   * Removes focus from the national-number field.
   * @internal
   */
  @Method()
  async setBlur() {
    this.inputEl?.blur()
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  async getInputElement(): Promise<HTMLInputElement | undefined> {
    return this.inputEl
  }

  /**
   * EVENT HANDLERS
   * ─────────────────────────────────────────────────────
   */

  private handleTriggerClick = (ev: MouseEvent) => {
    ev.preventDefault()
    if (this.disabled || this.readonly) {
      return
    }
    this.pickerOpen ? this.closePicker() : this.openPicker()
  }

  private handleTriggerKeyDown = (ev: KeyboardEvent) => {
    if (this.disabled || this.readonly) {
      return
    }
    if (isEnterKey(ev) || isSpaceKey(ev) || isArrowDownKey(ev)) {
      ev.preventDefault()
      this.openPicker()
    } else if (isEscapeKey(ev) && this.pickerOpen) {
      ev.preventDefault()
      this.closePicker(true)
    }
  }

  private handleFilterInput = (ev: InputEvent) => {
    const input = ev.target as HTMLInputElement
    this.filterQuery = input.value
    const visible = this.getVisibleCountries()
    if (!visible.some(country => country.code === this.activeCode)) {
      this.activeCode = visible[0]?.code
    }
  }

  private handleFilterKeyDown = (ev: KeyboardEvent) => {
    const visible = this.getVisibleCountries()

    if (isTabKey(ev)) {
      this.closePicker()
      return
    }

    if (isEscapeKey(ev)) {
      ev.preventDefault()
      this.closePicker(true)
      return
    }

    if (isEnterKey(ev)) {
      ev.preventDefault()
      if (this.activeCode) {
        this.selectCountry(this.activeCode, { emit: true })
      }
      this.closePicker(true)
      return
    }

    if (isArrowDownKey(ev)) {
      ev.preventDefault()
      this.moveActive(visible, 1)
      return
    }

    if (isArrowUpKey(ev)) {
      ev.preventDefault()
      this.moveActive(visible, -1)
      return
    }

    if (isHomeKey(ev)) {
      ev.preventDefault()
      this.activeCode = visible[0]?.code
      return
    }

    if (isEndKey(ev)) {
      ev.preventDefault()
      this.activeCode = visible[visible.length - 1]?.code
    }
  }

  private handleOptionMouseDown = (ev: MouseEvent) => {
    ev.preventDefault()
  }

  private handleOptionClick = (code: string) => {
    this.selectCountry(code, { emit: true })
    this.closePicker(true)
  }

  private handleOptionMouseEnter = (code: string) => {
    this.activeCode = code
  }

  private handleInput = (ev: InputEvent) => {
    const input = ev.target as HTMLInputElement
    const raw = input.value
    const isPaste = ev.inputType === 'insertFromPaste'

    if (isPaste) {
      const detected = detectCountryFromInput(raw)
      if (detected && detected !== this.resolvedCountry) {
        const available = this.getAvailableCountries()
        if (available.some(country => country.code === detected)) {
          this.setInternalCountry(detected, { emit: false, reformat: false })
        } else if (available[0]) {
          this.warnCountryMismatch(detected, available)
          this.setInternalCountry(available[0].code, { emit: false, reformat: false })
        }
      }
    }

    const caret = input.selectionStart ?? raw.length
    const digitsBefore = countDigitsBefore(raw, caret)
    this.displayValue = this.formatter.formatLive(raw)
    this.pendingCaret = caretFromDigitCount(this.displayValue, digitsBefore)
    this.nationalNumber = this.formatter.getNationalNumber()
    this.setInternalValue(this.formatter.getE164())
    this.dsInput.emit(this.eventDetail())
  }

  private handleFocus = (ev: FocusEvent) => {
    this.focused = true
    if (this.pickerOpen) {
      this.closePicker()
    }
    if (!this.disabled) {
      this.dsFocus.emit(ev)
    }
  }

  private handleBlur = (ev: FocusEvent) => {
    this.focused = false
    this.applyFormattedValue(this.displayValue, true)
    if (!this.disabled) {
      this.dsChange.emit(this.eventDetail())
      this.dsBlur.emit(ev)
    }
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  private initializeFromProps() {
    const available = this.getAvailableCountries()
    let next = this.normalizeCode(this.country)

    if (next && !this.isCountryAvailable(next, available)) {
      this.warnCountryMismatch(next, available)
      next = available[0]?.code
      this.setInternalCountry(next, { emit: false, reformat: false })
    }

    if (!next && this.initialCountry) {
      const seed = this.normalizeCode(this.initialCountry)
      if (seed && this.isCountryAvailable(seed, available)) {
        next = seed
      } else if (seed) {
        this.warnCountryMismatch(seed, available)
        next = available[0]?.code
      }
    }

    if (!next && this.value) {
      const detected = detectCountryFromInput(this.value)
      if (detected && this.isCountryAvailable(detected, available)) {
        next = detected
      }
    }

    this.resolvedCountry = next
    this.skipCountryWatch = true
    this.country = next
    this.skipCountryWatch = false
    this.formatter.setCountry(next)
    if (this.value) {
      this.applyFormattedValue(this.value, true)
    }
  }

  private syncCountryFromProps(options: { emit: boolean }) {
    const available = this.getAvailableCountries()
    let next = this.normalizeCode(this.country)

    if (next && !this.isCountryAvailable(next, available)) {
      this.warnCountryMismatch(next, available)
      next = available[0]?.code
      this.setInternalCountry(next, { emit: false, reformat: true })
      return
    }

    if (next !== this.resolvedCountry) {
      this.applyCountry(next, { emit: options.emit, reformat: true })
    }
  }

  private applyExternalValue(newVal: string | null) {
    if (!newVal) {
      this.displayValue = ''
      this.nationalNumber = ''
      this.formatter.formatLive('')
      this.syncFormValue()
      return
    }

    const detected = detectCountryFromInput(newVal)
    const available = this.getAvailableCountries()
    if (detected && this.isCountryAvailable(detected, available) && detected !== this.resolvedCountry) {
      this.applyCountry(detected, { emit: false, reformat: false })
    }

    this.applyFormattedValue(newVal, true)
  }

  private selectCountry(code: string, options: { emit: boolean }) {
    const available = this.getAvailableCountries()
    if (!this.isCountryAvailable(code, available)) {
      this.warnCountryMismatch(code, available)
      code = available[0]?.code ?? code
    }
    this.setInternalCountry(code, { emit: options.emit, reformat: true })
  }

  private setInternalCountry(code: string | undefined, options: { emit: boolean; reformat: boolean }) {
    const previous = this.resolvedCountry
    this.skipCountryWatch = true
    this.country = code
    this.skipCountryWatch = false
    this.applyCountry(code, { emit: options.emit && previous !== code, reformat: options.reformat })
  }

  private applyCountry(code: string | undefined, options: { emit: boolean; reformat: boolean }) {
    const digits = this.nationalNumber
    this.resolvedCountry = code
    this.formatter.setCountry(code)
    if (options.reformat) {
      this.applyFormattedValue(digits, true)
    }
    if (options.emit && code) {
      this.dsCountryChange.emit({ country: code })
    }
  }

  private applyFormattedValue(raw: string, stable: boolean) {
    this.displayValue = this.formatter.formatLive(raw)
    if (stable) {
      this.displayValue = this.formatter.formatStable() || this.displayValue
    }
    this.nationalNumber = this.formatter.getNationalNumber()
    this.setInternalValue(this.formatter.getE164())
  }

  private setInternalValue(next: string | null) {
    this.skipValueWatch = true
    this.value = next
    this.skipValueWatch = false
    this.syncFormValue()
  }

  private syncFormValue() {
    this.internals.setFormValue(this.value)
  }

  private eventDetail(): PhoneInputDetail {
    return {
      value: this.value,
      country: this.resolvedCountry ?? '',
      nationalNumber: this.nationalNumber,
    }
  }

  private getAvailableCountries(): CountryOption[] {
    return filterCountries(parseCountriesProp(this.countries))
  }

  private getVisibleCountries(): CountryOption[] {
    const available = this.getAvailableCountries()
    const filtered = available.filter(country =>
      matchesCountryQuery(country, getCountryName(country.code, this.language), this.filterQuery),
    )
    const allowList = parseCountriesProp(this.countries)
    if (allowList) {
      return filtered
    }
    return filtered
      .slice()
      .sort((a, b) =>
        getCountryName(a.code, this.language).localeCompare(getCountryName(b.code, this.language), this.language),
      )
  }

  private isCountryAvailable(code: string, available: CountryOption[]): boolean {
    return available.some(country => country.code === code)
  }

  private normalizeCode(code: string | undefined): string | undefined {
    const trimmed = code?.trim().toUpperCase()
    return trimmed ? trimmed : undefined
  }

  private warnCountryMismatch(code: string, available: CountryOption[]) {
    const fallback = available[0]?.code
    console.warn(`[ds-input-phone] \`country\` "${code}" is not in \`countries\`. Falling back to "${fallback ?? ''}".`)
  }

  private openPicker() {
    if (this.disabled || this.readonly || this.pickerOpen) {
      return
    }
    this.filterQuery = ''
    this.activeCode = this.resolvedCountry ?? this.getVisibleCountries()[0]?.code
    this.shouldFocusFilter = true
    this.pickerOpen = true
  }

  private closePicker(restoreTriggerFocus = false) {
    if (!this.pickerOpen) {
      return
    }
    this.pickerOpen = false
    this.filterQuery = ''
    if (restoreTriggerFocus) {
      this.triggerEl?.focus()
    }
  }

  private moveActive(visible: CountryOption[], delta: number) {
    if (visible.length === 0) {
      return
    }
    const currentIndex = visible.findIndex(country => country.code === this.activeCode)
    const start = currentIndex === -1 ? (delta > 0 ? -1 : visible.length) : currentIndex
    const nextIndex = Math.max(0, Math.min(visible.length - 1, start + delta))
    this.activeCode = visible[nextIndex].code
    this.scrollActiveIntoView()
  }

  private scrollActiveIntoView() {
    const active = this.el.shadowRoot?.getElementById(this.optionId(this.activeCode ?? ''))
    active?.scrollIntoView({ block: 'nearest' })
  }

  private optionId(code: string) {
    return `country-option-${code}`
  }

  private triggerAccessibleName(selected: CountryOption | undefined, countryName: string): string {
    const i18n = i18nDsInputPhone[this.language]
    if (!selected) {
      return i18n.selectCountry
    }
    return `${i18n.country} ${countryName} +${selected.callingCode}`
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const isInvalid = this.invalid || this.hasInvalidTextSlotContent
    const i18n = i18nDsInputPhone[this.language]
    const available = this.getAvailableCountries()
    const visible = this.getVisibleCountries()
    const selected = available.find(country => country.code === this.resolvedCountry)
    const selectedName = selected ? getCountryName(selected.code, this.language) : ''
    const pickerDisabled = this.disabled || this.readonly

    return (
      <Field
        disabled={this.disabled}
        color={this.color}
        invalid={isInvalid}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
        inputId="input"
        cssClasses={{ 'is-open': this.pickerOpen }}
      >
        <button
          id="country-trigger"
          part="country-trigger"
          type="button"
          ref={el => (this.triggerEl = el as HTMLButtonElement)}
          disabled={pickerDisabled}
          aria-haspopup="listbox"
          aria-expanded={this.pickerOpen ? 'true' : 'false'}
          aria-controls="country-list"
          aria-labelledby={this.label ? 'label country-trigger-label' : 'country-trigger-label'}
          onClick={this.handleTriggerClick}
          onKeyDown={this.handleTriggerKeyDown}
        >
          {selected ? (
            <img class="flag" src={getFlagUrl(selected.code)} alt="" aria-hidden="true" draggable={false} />
          ) : (
            <span class="flag is-empty" aria-hidden="true"></span>
          )}
          <span class="calling-code">{selected ? `+${selected.callingCode}` : ''}</span>
          <span id="country-trigger-label" class="sr-only">
            {this.triggerAccessibleName(selected, selectedName)}
          </span>
          <span class="chevron" aria-hidden="true"></span>
        </button>
        <input
          id="input"
          part="input"
          name={this.name}
          ref={el => (this.inputEl = el as HTMLInputElement)}
          type="text"
          inputMode="tel"
          autocomplete="tel-national"
          aria-describedby="description"
          aria-invalid={isInvalid ? 'true' : 'false'}
          disabled={this.disabled}
          readonly={this.readonly}
          required={this.required}
          placeholder={this.placeholder || ''}
          value={this.displayValue}
          onInput={ev => this.handleInput(ev as InputEvent)}
          onFocus={ev => this.handleFocus(ev)}
          onBlur={ev => this.handleBlur(ev)}
          {...this.inheritedAttributes}
        />
        {this.pickerOpen && (
          <div id="popup">
            <div class="filter">
              <label class="sr-only" htmlFor="country-filter">
                {i18n.filterCountries}
              </label>
              <input
                id="country-filter"
                ref={el => (this.filterEl = el as HTMLInputElement)}
                type="text"
                autocomplete="off"
                aria-controls="country-list"
                placeholder={i18n.filterCountries}
                value={this.filterQuery}
                onInput={ev => this.handleFilterInput(ev as InputEvent)}
                onKeyDown={this.handleFilterKeyDown}
              />
            </div>
            <span id="country-list-label" class="sr-only">
              {i18n.selectCountry}
            </span>
            <div
              id="country-list"
              role="listbox"
              aria-labelledby="country-list-label"
              aria-activedescendant={this.activeCode ? this.optionId(this.activeCode) : undefined}
            >
              {visible.length === 0 && <div class="no-results">{i18n.noResults}</div>}
              {visible.map(country => {
                const name = getCountryName(country.code, this.language)
                const selectedOption = country.code === this.resolvedCountry
                const active = country.code === this.activeCode
                return (
                  <div
                    id={this.optionId(country.code)}
                    role="option"
                    aria-selected={selectedOption ? 'true' : 'false'}
                    class={{
                      'option': true,
                      'is-selected': selectedOption,
                      'is-active': active,
                    }}
                    onMouseDown={this.handleOptionMouseDown}
                    onClick={() => this.handleOptionClick(country.code)}
                    onMouseEnter={() => this.handleOptionMouseEnter(country.code)}
                  >
                    <img
                      class="flag"
                      src={getFlagUrl(country.code)}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      loading="lazy"
                    />
                    <span class="option-name">{name}</span>
                    <span class="option-code">+{country.callingCode}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Field>
    )
  }
}

let InputPhoneIds = 0
