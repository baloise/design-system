import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import isEmpty from 'lodash/isEmpty'
import isNaN from 'lodash/isNaN'
import isNil from 'lodash/isNil'
import { inheritAttributes } from '../../utils/attributes'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '../../utils/config'
import { FormControl, FormControlInterface, stopEventBubbling } from '../../utils/form-control'
import { debounceEvent } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { getDecimalSeparator, getThousandSeparator } from '../../utils/number'
import {
  isNotNumber,
  mapDecimalSeparator,
  toFixedNumber,
  toNumber,
  toUserFormattedNumber,
  validateKeyDown,
} from './number-input.utils'
import { Field, FieldInterface } from '../input/field.util'

@Component({
  tag: 'ds-number-input',
  styleUrl: 'number-input.host.scss',
  shadow: true,
  formAssociated: true,
})
export class NumberInput implements ComponentInterface, FieldInterface, FormControlInterface<number | null>, Loggable {
  private numberInputId = `ds-number-input-${NumberInputIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private selectTimeout?: NodeJS.Timeout
  private control = new FormControl<number | null>(this)

  private lastValue = ''

  log!: LogInstance
  @Logger('number-input')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() nativeInputValue = ''
  @State() inputPattern = ''

  @AttachInternals() internals!: ElementInternals

  // Convenience getter — avoids repeated casting throughout the component
  private get nativeInput(): HTMLInputElement | undefined {
    return this.control.nativeEl as HTMLInputElement | undefined
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The numeric value of the input. `null` means no value.
   */
  @Prop({ mutable: true, reflect: true }) value: number | null = null

  @Watch('value')
  protected valueChanged(newValue: number | null) {
    const isValueNotDefined = newValue === null || isNaN(newValue as number)
    const emptyValue = this.exactNumber ? '0' : ''
    const rawStr = isValueNotDefined ? emptyValue : (newValue as number).toFixed(this.decimal)

    this.lastValue = rawStr
    if (this.focused) {
      this.nativeInputValue = mapDecimalSeparator(rawStr)
    } else {
      this.nativeInputValue = toUserFormattedNumber(rawStr, this.decimal, this.suffix)
    }
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() readonly name: string = this.numberInputId

  /**
   * The label displayed above the field.
   */
  @Prop() readonly label?: string

  /**
   * The description displayed below the field.
   */
  @Prop() readonly description?: string

  /**
   * Defines the color state of the input.
   */
  @Prop() readonly color: DS.InputColor = 'primary'

  /**
   * Text shown in the description area when `invalid` is true.
   */
  @Prop() readonly invalidText?: string

  /**
   * If `true` the component gets an invalid style.
   */
  @Prop() readonly invalid: boolean = false

  /**
   * Number of allowed decimal places. `0` means integers only.
   */
  @Prop() readonly decimal = 0

  /**
   * When `true`, only positive numbers are accepted (blocks the minus sign).
   */
  @Prop() readonly onlyPositive: boolean = false

  /**
   * Text appended to the formatted value after blur (e.g. `"CHF"`).
   */
  @Prop() readonly suffix?: string

  /**
   * Overrides the auto-generated input validation pattern.
   */
  @Prop() readonly pattern?: string

  /**
   * Instructional text shown when the input has no value.
   */
  @Prop() readonly placeholder?: string

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() readonly required: boolean = true

  /**
   * If `true`, the element is not mutable, focusable, or submitted with the form.
   */
  @Prop() readonly disabled: boolean = false

  /**
   * If `true`, the element cannot be edited by the user.
   */
  @Prop() readonly readonly: boolean = false

  /**
   * When `true`, displays `0` instead of an empty field when value is null.
   */
  @Prop() readonly exactNumber: boolean = false

  /**
   * The maximum value.
   */
  @Prop() readonly max?: string

  /**
   * The minimum value.
   */
  @Prop() readonly min?: string

  /**
   * Milliseconds to wait before triggering `dsChange` after each keystroke.
   */
  @Prop() readonly debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * EVENTS
   * ------------------------------------------------------
   */

  /**
   * Emitted on each keystroke with the current numeric value (or null).
   */
  @Event() dsInput!: EventEmitter<DS.NumberInputInputDetail>

  /**
   * Emitted when the value changes on blur.
   */
  @Event() dsChange!: EventEmitter<DS.NumberInputChangeDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() dsBlur!: EventEmitter<DS.NumberInputBlurDetail>

  /**
   * Emitted when the input gains focus.
   */
  @Event() dsFocus!: EventEmitter<DS.NumberInputFocusDetail>

  /**
   * Emitted when the input is clicked.
   */
  @Event() dsClick!: EventEmitter<DS.NumberInputClickDetail>

  /**
   * Emitted on keypress.
   */
  @Event() dsKeyPress!: EventEmitter<DS.NumberInputKeyPressDetail>

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: UIEvent) {
    this.control.listenOnClick(ev)
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      // control.setValue triggers @Watch('value') → valueChanged() → updates formatted display
      // (Do NOT use control.listenOnReset — its timer overwrites the formatted display
      //  with the raw numeric string after the re-render completes)
      this.control.setValue(this.control.initialValue)
    }
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
    this.inputPattern = this.createPattern()

    if (this.nativeInput) {
      if (this.focused) {
        this.nativeInputValue = mapDecimalSeparator(this.lastValue)
      } else {
        this.nativeInputValue = toUserFormattedNumber(this.lastValue, this.decimal, this.suffix)
      }
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.debounceChanged()
    this.control.connectedCallback()
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
    this.inputPattern = this.createPattern()
    this.valueChanged(this.value)
  }

  componentDidLoad() {
    this.control.componentDidLoad()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets focus on the native input element.
   */
  @Method()
  async setFocus() {
    return this.control.setFocus()
  }

  /**
   * Sets blur on the native input element.
   * @internal
   */
  @Method()
  async setBlur() {
    return this.control.setBlur()
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private get lastValueGetter(): string {
    if (this.exactNumber && (isNil(this.lastValue) || isEmpty(this.lastValue))) {
      return '0'
    }
    return this.lastValue
  }

  private createPattern(): string {
    if (this.pattern) return this.pattern

    let suffix = this.suffix || ''
    if (suffix !== '') suffix = ` ${suffix}`

    const thousandSeparator = getThousandSeparator()
    let decimalSeparator = getDecimalSeparator()
    if (decimalSeparator === ',') decimalSeparator = '\\,'

    const negativeSymbol = this.onlyPositive ? '' : '-'

    return `${negativeSymbol}?\\d{1,3}(?:${thousandSeparator}\\d{3})*(?:\\${decimalSeparator}\\d{1,2})?(?:${suffix})?`
  }

  private handleInput = (_ev: Event) => {
    if (this.nativeInput && isNotNumber(this.nativeInput.value)) {
      // Invalid character: restore last valid value via state (triggers Stencil re-render)
      this.nativeInputValue = this.lastValue || ''
      return
    }

    this.lastValue = this.nativeInput?.value || ''
    const numericValue = toNumber(this.lastValue, this.decimal) ?? null
    this.control.inputValue = numericValue
    this.dsInput.emit(numericValue)
  }

  private handleFocus = (ev: FocusEvent) => {
    // Sets focused=true, emits dsFocus
    this.control.onFocus(ev)
    // Show raw value without thousand-separator formatting for easier editing
    this.nativeInputValue = mapDecimalSeparator(this.lastValue || '')
    clearTimeout(this.selectTimeout)
    this.selectTimeout = setTimeout(() => this.nativeInput?.select())
  }

  private handleBlur = (ev: FocusEvent) => {
    // Apply locale-formatted display with suffix
    this.lastValue = toFixedNumber(this.lastValueGetter, this.decimal)
    this.nativeInputValue = toUserFormattedNumber(this.lastValueGetter, this.decimal, this.suffix)
    if (this.nativeInput) {
      this.nativeInput.value = this.nativeInputValue
    }

    // Set the numeric value on the control BEFORE calling onBlur,
    // so control.setValue() (called inside onBlur) uses the right value
    this.control.inputValue = toNumber(this.lastValueGetter, this.decimal) ?? null

    // Emits dsBlur and dsChange (via setValue, only if value changed)
    this.control.onBlur(ev)
  }

  private handleKeydown = (ev: KeyboardEvent) => {
    if (!this.nativeInput) return

    const oldValue = this.nativeInput.value || ''
    const selectionStart = this.nativeInput.selectionStart ?? 0
    const newValue = oldValue.slice(0, selectionStart) + ev.key + oldValue.slice(selectionStart)

    if (
      !validateKeyDown({
        key: ev.key,
        ctrlKey: ev.ctrlKey,
        metaKey: ev.metaKey,
        decimal: this.decimal,
        newValue,
        oldValue,
        selectionStart: this.nativeInput.selectionStart,
        selectionEnd: this.nativeInput.selectionEnd,
        onlyPositive: this.onlyPositive,
      })
    ) {
      return stopEventBubbling(ev)
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Field
        disabled={this.disabled}
        color={this.color}
        invalid={this.invalid}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
      >
        <input
          id="input"
          part="input"
          type="text"
          inputMode="decimal"
          pattern={this.inputPattern}
          ref={el => (this.control.nativeEl = el)}
          aria-describedby="description"
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          name={this.name}
          disabled={this.disabled}
          placeholder={this.placeholder || ''}
          readonly={this.readonly}
          required={this.required}
          min={this.min}
          max={this.max}
          value={this.nativeInputValue}
          onInput={ev => this.handleInput(ev)}
          onFocus={ev => this.handleFocus(ev)}
          onBlur={ev => this.handleBlur(ev)}
          onClick={ev => this.control.onClick(ev)}
          onKeyDown={ev => this.handleKeydown(ev)}
          onKeyPress={ev => this.dsKeyPress.emit(ev)}
          {...this.inheritedAttributes}
        />
      </Field>
    )
  }
}

let NumberInputIds = 0
