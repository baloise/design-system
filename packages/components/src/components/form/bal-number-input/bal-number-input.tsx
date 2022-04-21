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
import {
  FormInput,
  getInputTarget,
  getNativeInputValue,
  getUpcomingValue,
  inputHandleBlur,
  inputHandleChange,
  inputHandleClick,
  inputHandleFocus,
  inputHandleHostClick,
  inputListenOnClick,
  inputSetBlur,
  inputSetFocus,
  stopEventBubbling,
} from '../../../helpers/form-input.helpers'
import { debounceEvent, findItemLabel, inheritAttributes } from '../../../helpers/helpers'
import { getDecimalSeparator } from '../../../utils/number.util'
import { formatInputValue } from './bal-input.utils'

@Component({
  tag: 'bal-number-input',
})
export class NumberInput implements ComponentInterface, BalConfigObserver, FormInput<number | undefined> {
  private inputId = `bal-number-input-${numberInputIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  nativeInput?: HTMLInputElement
  inputValue = this.value

  @Element() el!: HTMLElement

  @State() hasFocus = false
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region

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
  @Prop() suffix?: string

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder?: string

  /**
   * If `true`, the user must fill in a value before submitting a form.
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
   * If `true` the input value has 0 as default value
   */
  @Prop() exactNumber = false

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
  @Prop({ mutable: true }) value?: number = undefined

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<number | undefined>

  /**
   * Emitted when the value has changed.
   */
  @Event() balChange!: EventEmitter<number | undefined>

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

  /**
   * Emitted when the input has clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(event: UIEvent) {
    inputListenOnClick(this, event)
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
    const input = getInputTarget(ev)

    if (input) {
      const parsedValue = parseFloat(parseFloat(input.value).toFixed(this.decimal))
      if (!isNaN(parsedValue)) {
        this.inputValue = parsedValue
      } else {
        if (!this.decimal || input.value !== getDecimalSeparator()) {
          this.inputValue = undefined
          input.value = ''
        }
      }
    }

    this.balInput.emit(this.inputValue)
  }

  private onBlur = (event: FocusEvent) => {
    inputHandleBlur(this, event)

    const input = getInputTarget(event)
    if (input && input.value === getDecimalSeparator()) {
      this.inputValue = undefined
      input.value = ''
    }

    if (this.exactNumber && input && (input.value === undefined || input.value === '' || input.value === null)) {
      this.inputValue = 0
      input.value = '0'
    }

    inputHandleChange(this)
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (!isNil(event) && !isCtrlOrCommandKey(event)) {
      if (!this.getAllowedKeys().includes(event.key)) {
        return stopEventBubbling(event)
      }

      const value = getNativeInputValue(this)

      if (event.key === getDecimalSeparator()) {
        if (!this.decimal || value.includes(getDecimalSeparator())) {
          return stopEventBubbling(event)
        }
      }

      if ([...NUMBER_KEYS, getDecimalSeparator()].indexOf(event.key) >= 0) {
        const newValue = getUpcomingValue(this, event)
        const decimalValue = newValue.includes(getDecimalSeparator()) ? newValue?.split(getDecimalSeparator())[1] : ''
        if (decimalValue && decimalValue.length > this.decimal) {
          return stopEventBubbling(event)
        }
      }
    }
  }

  private onFocus = (event: FocusEvent) => inputHandleFocus(this, event)

  private onClick = (event: MouseEvent) => inputHandleClick(this, event)

  private handleClick = (event: MouseEvent) => inputHandleHostClick(this, event)

  render() {
    const value = this.hasFocus ? this.getRawValue() : this.getFormattedValue()
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'is-disabled': this.disabled || this.readonly,
        }}
      >
        <input
          class={{
            'input': true,
            'is-disabled': this.disabled || this.readonly,
            'is-danger': this.invalid,
          }}
          ref={input => (this.nativeInput = input)}
          id={this.inputId}
          aria-labelledby={label ? labelId : null}
          name={this.name}
          disabled={this.disabled}
          placeholder={this.placeholder || ''}
          readonly={this.readonly}
          required={this.required}
          pattern={'[0-9]*'}
          value={value}
          onInput={e => this.onInput(e)}
          onFocus={e => this.onFocus(e)}
          onBlur={e => this.onBlur(e)}
          onClick={this.onClick}
          onKeyDown={e => this.onKeydown(e)}
          onKeyPress={e => this.balKeyPress.emit(e)}
          {...this.inheritedAttributes}
        />
      </Host>
    )
  }
}

let numberInputIds = 0
