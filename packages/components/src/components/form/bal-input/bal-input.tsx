import {
  Component,
  h,
  Host,
  Prop,
  Element,
  EventEmitter,
  Event,
  Method,
  Watch,
  ComponentInterface,
  Listen,
  State,
} from '@stencil/core'
import isNil from 'lodash.isnil'
import { NUMBER_KEYS, ACTION_KEYS, isCtrlOrCommandKey } from '../../../constants/keys.constant'
import { debounceEvent, findItemLabel } from '../../../helpers/helpers'
import { AutocompleteTypes, InputTypes } from '../../../types/interfaces'
import { getDecimalSeparator } from '../../../utils/number.util'
import { filterInputValue, formatInputValue } from './bal-input.utils'
import {
  defaultConfig,
  BalLanguage,
  BalConfigObserver,
  BalConfigState,
  attachComponentToConfig,
  detachComponentToConfig,
} from '../../../config'

@Component({
  tag: 'bal-input',
})
export class Input implements ComponentInterface, BalConfigObserver {
  private inputId = `bal-input-${InputIds++}`
  private nativeInput?: HTMLInputElement
  private didInit = false
  private hasFocus = false

  @Element() el!: HTMLElement

  @State() language: BalLanguage = defaultConfig.language

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * Defines the type of the input (text, number, email ...).
   */
  @Prop() type: InputTypes = 'text'

  /**
   * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
   */
  @Prop() accept?: string

  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
   * Available options: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`.
   */
  @Prop() autocapitalize = 'off'

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: AutocompleteTypes = 'off'

  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  @Prop() autocorrect: 'on' | 'off' = 'off'

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop() autofocus = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder?: string | null

  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  @Prop() max?: string

  /**
   * Defines the max length of the value.
   */
  @Prop() maxLength: number | undefined = undefined

  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  @Prop() min?: string

  /**
   * Defines the min length of the value.
   */
  @Prop() minLength: number | undefined = undefined

  /**
   * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.
   */
  @Prop() multiple?: boolean

  /**
   * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, `"date"`, or `"password"`, otherwise it is ignored. When the type attribute is `"date"`, `pattern` will only be used in browsers that do not support the `"date"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for more information.
   */
  @Prop() pattern?: string | undefined

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex = 0

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true`, the element will have its spelling and grammar checked.
   */
  @Prop() spellcheck = false

  /**
   * If `true` this component can be placed on dark background
   */
  @Prop() inverted = false

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly = false

  /**
   * If `true` the input is disabled
   */
  @Prop() disabled = false

  /**
   * If `true` the input gets a clickable cursor style
   */
  @Prop() clickable = false

  /**
   * If `true` on mobile device the number keypad is active
   */
  @Prop() numberInput = false

  /**
   * Defines the allowed decimal points for the `number-input`.
   */
  @Prop() decimal?: number

  /**
   * Adds a suffix the the input-value after blur.
   */
  @Prop() suffix?: string

  /**
   * @internal
   * If `true` the input will get some right padding.
   */
  @Prop() hasIconRight = false

  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
   * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
   */
  @Prop() inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | number = ''

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected async valueChanged(newValue: string | number | undefined, oldValue: string | number | undefined) {
    if (this.didInit && !this.hasFocus && newValue !== oldValue) {
      this.balChange.emit(this.getRawValue())
    }
  }

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<string | number | null>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<KeyboardEvent>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input value has changed.
   */
  @Event() balChange!: EventEmitter<string | number | null>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  connectedCallback() {
    this.debounceChanged()
    attachComponentToConfig(this)
  }

  componentDidLoad() {
    this.didInit = true
    if (!isNil(this.value) && this.value !== '') {
      this.valueChanged(this.value, undefined)
    }
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  configChanged(state: BalConfigState): void {
    this.language = state.language

    if (!this.hasFocus && this.nativeInput) {
      this.nativeInput.value = this.getFormattedValue()
    }
  }

  /**
   * Sets focus on the native `input` in `bal-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus()
    }
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement | undefined> {
    return Promise.resolve(this.nativeInput)
  }

  private get allowedKeys() {
    return [...NUMBER_KEYS, ...ACTION_KEYS, getDecimalSeparator()]
  }

  private getRawValue(): string {
    const value = typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString()
    return value
  }

  private getFormattedValue(): string {
    const value = this.getRawValue()
    const suffix = this.suffix !== undefined && value !== undefined && value !== '' ? ' ' + this.suffix : ''
    if (this.numberInput) {
      return `${formatInputValue(value, this.decimal)}${suffix}`
    }
    return `${value}${suffix}`
  }

  private onInput = (ev: InputEvent) => {
    const input = ev.target as HTMLInputElement | null

    if (input) {
      const value = this.numberInput ? filterInputValue(input.value, this.value, this.decimal) : input.value
      input.value = this.value = value || ''
    }

    this.balInput.emit(this.value)
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.numberInput) {
      if (!isCtrlOrCommandKey(event) && this.allowedKeys.indexOf(event.key) < 0) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  }

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true
    this.balFocus.emit(ev)

    const input = ev.target as HTMLInputElement | null
    if (input) {
      input.value = this.getRawValue()
    }
  }

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false
    this.balBlur.emit(ev)
    this.balChange.emit(this.getRawValue())

    const input = ev.target as HTMLInputElement | null
    if (input) {
      input.value = this.getFormattedValue()
    }
  }

  private onClick = (ev: MouseEvent) => {
    if (!this.disabled) {
      this.balClick.emit(ev)
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
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }
    let inputProps = {}
    if (this.pattern) {
      inputProps = { pattern: this.pattern }
    }
    if (this.numberInput) {
      inputProps = { pattern: '[0-9]*' }
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
            'is-inverted': this.inverted,
            'clickable': this.clickable,
            'has-icon-right': this.hasIconRight,
          }}
          ref={inputEl => (this.nativeInput = inputEl)}
          id={this.inputId}
          aria-labelledby={labelId}
          disabled={this.disabled}
          accept={this.accept}
          inputMode={this.inputmode}
          autoCapitalize={this.autocapitalize}
          autoComplete={this.autocomplete}
          autoCorrect={this.autocorrect}
          autofocus={this.autofocus}
          min={this.min}
          max={this.max}
          minLength={this.minLength}
          maxLength={this.maxLength}
          multiple={this.multiple}
          name={this.name}
          placeholder={this.placeholder || ''}
          readOnly={this.readonly}
          required={this.required}
          spellcheck={this.spellcheck}
          type={this.type}
          tabindex={this.balTabindex}
          value={value}
          {...inputProps}
          onInput={ev => this.onInput(ev as InputEvent)}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onClick={this.onClick}
          onKeyPress={e => this.balKeyPress.emit(e)}
        />
      </Host>
    )
  }
}

let InputIds = 0
