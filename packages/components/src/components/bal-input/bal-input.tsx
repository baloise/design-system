import { Component, h, Host, Prop, Element, EventEmitter, Event, Method, Watch, ComponentInterface, Listen } from '@stencil/core'
import { isNil } from 'lodash'
import { NUMBER_KEYS, ACTION_KEYS, isCtrlOrCommandKey } from '../../constants/keys.constant'
import { debounceEvent, findItemLabel } from '../../helpers/helpers'
import { AutocompleteTypes, InputTypes } from '../../types/interfaces'

@Component({
  tag: 'bal-input',
  styleUrl: 'bal-input.scss',
  shadow: false,
  scoped: true,
})
export class Input implements ComponentInterface {
  private allowedKeys = [...NUMBER_KEYS, ...ACTION_KEYS]
  private allowedActionKeys = [...ACTION_KEYS]
  private inputId = `bal-input-${InputIds++}`
  private nativeInput?: HTMLInputElement
  private didInit = false
  private hasFocus = false
  private isCopyPaste = false
  private keysPressed: string[] = []

  @Element() el!: HTMLElement

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * Defines the type of the input (text, number, email ...).
   */
  @Prop() type: InputTypes = 'text'

  /**
   * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
   */
  @Prop() accept?: string

  /**
   * Adds a suffix the the inputvalue after blur.
   */
  @Prop() suffix?: string

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
  @Prop() balTabindex: number = 0

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
   * The autocomplete attribute specifies whether or not an input field should have autocomplete enabled.
   */
  @Prop() autoComplete: boolean = false

  /**
   * If `true` only valid numbers can be entered and on mobile device the number keypad is active
   */
  @Prop() numberInput = false

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
   * Number of decimal places.
   */
  @Prop() decimal?: number = undefined

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected async valueChanged(newValue: string | number | undefined, oldValue: string | number | undefined) {
    if (this.didInit && !this.hasFocus && newValue !== oldValue) {
      this.balChange.emit(this.getValueForEmitting())
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
  }

  componentDidLoad() {
    this.didInit = true
    if (!isNil(this.value) && this.value !== '') {
      this.valueChanged(this.value, undefined)
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
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!)
  }

  private getRawValue(): string {
    const value = typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString()
    return value
  }

  private getFormattedValue(): string {
    let value = this.getRawValue()

    const suffix = this.suffix !== undefined && value !== undefined && value !== '' ? ' ' + this.suffix : ''
    return `${value}${suffix}`
  }

  private getValueForEmitting(): any {
    const value = this.numberInput ? this.formatNumber(this.getRawValue()) : this.getRawValue()

    if (isNaN(value)) {
      return undefined
    }

    if (this.decimal && this.countDecimals(value) > this.decimal) {
      return value.toFixed(this.decimal)
    }

    return value
  }

  private addSuffixToNumber(value: any): string {
    const suffix = this.suffix !== undefined && value !== undefined && value !== '' ? ' ' + this.suffix : ''
    return `${value}${suffix}`
  }

  private isNumeric(value: any): boolean {
    return !isNaN(value - parseFloat(value));
  }

  private isStartingWithDot(value: string): boolean {
    return value.charAt(0) == '.';
  }
  
  private insertDecimal(value: any, decimalPlaces: number): any {

    if (value.length == 1 && value.charAt(0) == '.') {
      return (Math.round(0 * 100) / 100).toFixed(decimalPlaces)
    }

    return (Math.round(value * 100) / 100).toFixed(decimalPlaces)
  }

  private numberWithCommas(value: string): string {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "'")
  }

  private formatNumber(value: any): any {
    if (this.isStartingWithDot(value) && value.length == 1) {
      return '0'
    }

    return parseFloat(value)
  }

  private isElementExistsInArray(array: Array<string>, element: string): boolean {
    return array.indexOf(element) === -1
  }

  private checkIfCopyPaste(event: KeyboardEvent): void {
    if (isCtrlOrCommandKey(event) && this.isElementExistsInArray(this.keysPressed, 'ctrl')) {
      this.keysPressed.push('ctrl')
    }

    if (event.key == 'v' && this.isElementExistsInArray(this.keysPressed, 'v')) {
      this.keysPressed.push('v')
    }

    this.isCopyPaste = this.keysPressed.length === 2 ? true : false
  }

  private countDecimals(value: any): any {
    if (Math.floor(value) === value) return 0;
    var str = value.toString();

    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}
 
  private onInput = (ev: InputEvent) => {
    const input = ev.target as HTMLInputElement | null
    if (input) {
      if (!this.isCopyPaste) {
        this.value = input.value || ''
      } else {
        this.value = !this.isNumeric(input.value) ? '0' : input.value || ''
        this.keysPressed = []
        this.isCopyPaste = false
      }
    }
    this.balInput.emit(this.getValueForEmitting())
  }

  private onKeyDown = (event: KeyboardEvent) => {
    this.checkIfCopyPaste(event)

    if (this.numberInput) {
      const nextValue = this.value + '' + event.key
      const isKeyAllowed = this.allowedKeys.indexOf(event.key) < 0
      const isStartingWithDot = this.isStartingWithDot(nextValue)
      const isNumeric = this.isNumeric(nextValue)
      if (!isNumeric && isKeyAllowed && !isStartingWithDot && !isCtrlOrCommandKey(event)) {
        event.preventDefault()
        event.stopPropagation()
      }
      if (this.decimal) {
        const isKeyAllowed = this.allowedActionKeys.indexOf(event.key) < 0
        if (this.countDecimals(nextValue) > this.decimal && !isCtrlOrCommandKey(event) && isKeyAllowed) {
          event.preventDefault()
          event.stopPropagation()
        }
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

  private getValidatedNumber(inputValue: string): string {
    let value = ''

    if (this.numberInput && inputValue.length > 0) {
      if (this.decimal) {
        value = this.insertDecimal(inputValue, this.decimal)
      } else {
        if (inputValue.charAt(inputValue.length - 1) == '.') {
          value = inputValue.slice(0, -1)
        }
        if (this.isStartingWithDot(inputValue)) {
          value = inputValue.length > 1 ? parseFloat(inputValue).toString() : '0'
        }
      }
      value = value === '' ? inputValue : value
      value = this.numberWithCommas(value)

      return this.suffix ? this.addSuffixToNumber(value) : value
    } else {
      return this.suffix ? this.getFormattedValue() : value
    }
  }

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false
    this.balBlur.emit(ev)
    this.balChange.emit(this.getValueForEmitting())

    const input = ev.target as HTMLInputElement | null
    
    if (input) {
      input.value = this.numberInput ? this.getValidatedNumber(input.value) : this.getFormattedValue()
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
    if (this.numberInput) {
      inputProps = { pattern: '[0-9]*' }
    }
    if (this.pattern) {
      inputProps = { pattern: this.pattern }
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
