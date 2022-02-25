import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  Watch,
  State,
  Event,
  EventEmitter,
  Method,
  Listen,
} from '@stencil/core'
import isNil from 'lodash.isnil'
import {
  attachComponentToConfig,
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  defaultConfig,
  detachComponentToConfig,
} from '../../../config'
import { NUMBER_KEYS, ACTION_KEYS, isCtrlOrCommandKey } from '../../../constants/keys.constant'
import { debounceEvent, findItemLabel, inheritAttributes } from '../../../helpers/helpers'
import { getDecimalSeparator } from '../../../utils/number.util'
import { formatInputValue } from './bal-input.utils'

@Component({
  tag: 'bal-number-input',
})
export class NumberInput implements ComponentInterface, BalConfigObserver {
  private nativeInput?: HTMLInputElement
  private inputId = `bal-number-input-${numberInputIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private didInit = false
  private cachedValue = this.value

  @State() hasFocus = false
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region

  @Element() el!: HTMLElement

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * Defines the allowed decimal points for the `number-input`.
   */
  @Prop() decimal = 0

  /**
   * Adds a suffix the the input-value after blur.
   */
  @Prop() suffix = ''

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder?: string | null

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly = false

  /**
   * If `true` the input is disabled
   */
  @Prop() disabled = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: number | null = undefined

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged(newValue: number | null | undefined, oldValue: number | null | undefined) {
    if (this.didInit && newValue !== oldValue && !this.hasFocus) {
      this.balChange.emit(this.value)
    }
  }

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<number | null | undefined>

  /**
   * Emitted when the value has changed.
   */
  @Event() balChange!: EventEmitter<number | null | undefined>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<KeyboardEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  componentDidLoad() {
    this.didInit = true
    if (!isNil(this.value)) {
      this.valueChanged(this.value, undefined)
    }
  }

  connectedCallback() {
    this.debounceChanged()
    attachComponentToConfig(this)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  configChanged(state: BalConfigState): void {
    this.language = state.language
    this.region = state.region

    if (!this.hasFocus && this.nativeInput) {
      this.nativeInput.value = this.getFormattedValue()
    }
  }

  /**
   * Sets focus on the native `input` in `ion-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus()
    }
  }

  /**
   * Sets blur on the native `input` in `ion-input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    if (this.nativeInput) {
      this.nativeInput.blur()
    }
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!)
  }

  private getAllowedKeys() {
    return [...NUMBER_KEYS, ...ACTION_KEYS, getDecimalSeparator()]
  }

  private getRawValue(): string {
    return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString()
  }

  private getFormattedValue(): string {
    const value = this.getRawValue()
    const suffix = this.suffix !== undefined && value !== undefined && value !== '' ? ' ' + this.suffix : ''
    return `${formatInputValue(value, this.decimal)}${suffix}`
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null
    if (input) {
      const parsedValue = parseFloat(parseFloat(input.value).toFixed(this.decimal))
      if (!isNaN(parsedValue)) {
        this.value = parsedValue
      } else {
        this.value = null
        input.value = ''
      }
    }
    this.balInput.emit(this.value)
  }

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false
    this.balBlur.emit(ev)
    if (this.cachedValue !== this.value) {
      this.balChange.emit(this.value)
    }
  }

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true
    this.cachedValue = this.value
    this.balFocus.emit(ev)
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (!isNil(event) && !isCtrlOrCommandKey(event)) {
      if (!this.getAllowedKeys().includes(event.key)) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      const value = this.nativeInput?.value || ''

      if (event.key === getDecimalSeparator()) {
        if (!this.decimal || value.includes(getDecimalSeparator())) {
          event.preventDefault()
          event.stopPropagation()
          return
        }
      }

      if ([...NUMBER_KEYS, getDecimalSeparator()].indexOf(event.key) >= 0) {
        const idx = (event as any).target?.selectionStart
        const newValue = value.slice(0, idx) + event.key + value.slice(idx + Math.abs(0))
        const decimalValue = newValue.includes(getDecimalSeparator()) ? newValue?.split(getDecimalSeparator())[1] : ''
        if (decimalValue && decimalValue.length > this.decimal) {
          event.preventDefault()
          event.stopPropagation()
          return
        }
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
    const value = this.hasFocus ? this.getRawValue() : this.getFormattedValue()
    console.log('render', this.value, value)
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
    }

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'is-disabled': this.disabled,
        }}
      >
        <input
          class={{
            'input': true,
            'is-disabled': this.disabled,
            'is-danger': this.invalid,
          }}
          ref={input => (this.nativeInput = input)}
          id={this.inputId}
          aria-labelledby={label ? labelId : null}
          name={this.name}
          disabled={this.disabled}
          placeholder={this.placeholder || ''}
          readOnly={this.readonly}
          required={this.required}
          pattern={'[0-9]*'}
          value={value}
          onInput={e => this.onInput(e)}
          onBlur={e => this.onBlur(e)}
          onFocus={e => this.onFocus(e)}
          onKeyDown={e => this.onKeydown(e)}
          onKeyPress={e => this.balKeyPress.emit(e)}
          {...this.inheritedAttributes}
        />
      </Host>
    )
  }
}

let numberInputIds = 0
