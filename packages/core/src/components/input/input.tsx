import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core'
import isNil from 'lodash/isNil'
import { DsComponentInterface } from '@global'
import {
  inheritAttributes,
  FormControlInterface,
  FormControl,
  stopEventBubbling,
  debounceEvent,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { ACTION_KEYS, isCtrlOrCommandKey } from '@global'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { InputMaskUtil } from './input.mask'
import { getMask } from './masks'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { Field, FieldInterface } from './field.util'
import {
  INPUT_COLORS,
  INPUT_AUTOCORRECTS,
  INPUT_INPUT_MODES,
  INPUT_INPUT_TYPES,
  INPUT_MASKS,
  INPUT_AUTOCOMPLETES,
  InputColor,
  InputInputType,
  InputAutocomplete,
  InputAutocorrect,
  InputInputMode,
  InputMask,
  InputBlurDetail,
  InputKeyPressDetail,
  InputFocusDetail,
  InputClickDetail,
  InputInputDetail,
  InputChangeDetail,
} from './input.interfaces'

@Component({
  tag: 'ds-input',
  styleUrl: 'input.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Input implements DsComponentInterface, FieldInterface, FormControlInterface<string | null> {
  private inheritedAttributes: { [k: string]: any } = {}
  private control = new FormControl(this)
  private maskUtil = new InputMaskUtil(this)
  inputId = `ds-input-${InputIds++}`

  log!: LogInstance
  @Logger('input')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  @AttachInternals() internals!: ElementInternals

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the input.
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrType('string')
  value: string | null = null

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly name: string = this.inputId

  /**
   * The label of the input, which is displayed above the input field.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * The description of the input, which is displayed below the input field.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly description: string = ''

  /**
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...INPUT_COLORS)
  readonly color: InputColor = 'primary'

  /**
   * Shows a loading indicator at the end of the input and replaces the end slot content.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly loading: boolean = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly invalid: boolean = false

  /**
   * The text to display when the input is in an invalid state.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly invalidText: string = ''

  /**
   * Defines the type of the input (text, number, email ...).
   */
  @Prop()
  @ValidateEmptyOrOneOf(...INPUT_INPUT_TYPES)
  readonly type: InputInputType = 'text'

  /**
   * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly accept: string = ''

  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
   * Available options: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly autocapitalize = 'off'

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...INPUT_AUTOCOMPLETES)
  readonly autocomplete: InputAutocomplete = 'off'

  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...INPUT_AUTOCORRECTS)
  readonly autocorrect: InputAutocorrect = 'off'

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly autofocus: boolean = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `dsChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly placeholder: string = ''

  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly max: string = ''

  /**
   * Defines the max length of the value.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly maxLength?: number

  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly min: string = ''

  /**
   * Defines the min length of the value.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly minLength?: number

  /**
   * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly multiple?: boolean

  /**
   * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, `"date"`, or `"password"`, otherwise it is ignored. When the type attribute is `"date"`, `pattern` will only be used in browsers that do not support the `"date"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for more information.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly pattern: string = ''

  /**
   * A regular expression that the key of the key press event is checked against and if not matching the expression the event will be prevented.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly allowedKeyPress: string = ''

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly required: boolean = true

  /**
   * If `true`, the element will have its spelling and grammar checked.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly spellcheck: boolean = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly readonly: boolean = false

  /**
   * Adds a suffix the the input-value after blur.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly suffix: string = ''

  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
   * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...INPUT_INPUT_MODES)
  readonly inputmode?: InputInputMode

  /**
   * Mask of the input field. It defines what the user can enter and how the format looks like. Currently, only for Switzerland formatted with addition of Belgian enterprisenumber and IBAN.
   * Formatting for 'contract-number': '99/1.234.567-1'
   * Formatting for 'basic-contract-number': '99/1.234.567'
   * Formatting for 'claim-number': ('73/001217/16.9')
   * Formatting for 'offer-number': ('98/7.654.321')
   * Formatting for 'be-enterprise-number': ('1234.567.890')
   * Formatting for 'be-iban': ('BE68 5390 0754 7034')
   */
  @Prop()
  @ValidateEmptyOrOneOf(...INPUT_MASKS)
  readonly mask?: InputMask = undefined
  @Watch('mask')
  protected maskChanged() {
    this.maskUtil.setFormatter(getMask(this.mask))
  }

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) readonly autoInvalidOff: boolean = false

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<InputBlurDetail>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() dsKeyPress!: EventEmitter<InputKeyPressDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() dsFocus!: EventEmitter<InputFocusDetail>

  /**
   * Emitted when the input has clicked
   */
  @Event() dsClick!: EventEmitter<InputClickDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsInput!: EventEmitter<InputInputDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() dsChange!: EventEmitter<InputChangeDetail>

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
    this.control.listenOnReset(ev)
  }

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
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
    this.debounceChanged()
    this.maskChanged()
    this.control.connectedCallback()
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title', 'data-hj-allow'])
  }

  componentDidLoad() {
    this.control.componentDidLoad()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets focus on the native `input` in `ds-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    return this.control.setFocus()
  }

  /**
   * Sets blur on the native `input` in `ds-input`. Use this method instead of the global
   * `input.blur()`.
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
    return Promise.resolve(this.control.nativeEl as HTMLInputElement)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private getRawValue(): string {
    const value = (this.value || '').toString()
    return value
  }

  private getFormattedValue(): string {
    const value = this.getRawValue()
    const suffix = this.suffix !== undefined && value !== undefined && value !== '' ? ' ' + this.suffix : ''
    return `${value}${suffix}`
  }

  private handleKeydown = (ev: KeyboardEvent) => {
    if (this.mask !== undefined) {
      return this.maskUtil.onKeydown(ev)
    }

    if (this.allowedKeyPress && !isNil(ev) && !isCtrlOrCommandKey(ev)) {
      const regex = new RegExp('^' + this.allowedKeyPress + '$')
      if (!regex.test(ev.key) && ![...ACTION_KEYS].includes(ev.key)) {
        return stopEventBubbling(ev)
      }
    }
  }

  private handleClick = (ev: MouseEvent) => {
    this.control.onClick(ev)
  }

  private handleFocus = (ev: FocusEvent) => {
    this.control.onFocus(ev)
  }

  private handleBlur = (ev: FocusEvent) => {
    this.control.onBlur(ev)
  }

  private handleInput = (ev: InputEvent) => {
    this.maskUtil.onInput(ev)
    this.control.onInput(ev)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    let value: string | null
    if (this.mask) {
      value = this.maskUtil.format(this.getRawValue()) ?? this.getRawValue()
    } else {
      value = this.focused ? this.getRawValue() : this.getFormattedValue()
    }

    let inputProps = {}
    if (this.pattern) {
      inputProps = { pattern: this.pattern }
    }

    return (
      <Field
        disabled={this.disabled}
        color={this.color}
        invalid={this.invalid}
        loading={this.loading}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
      >
        <input
          id="input"
          part="input"
          name={this.name}
          ref={inputEl => (this.control.nativeEl = inputEl)}
          aria-describedby="description"
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          disabled={this.disabled}
          accept={this.accept}
          inputMode={this.inputmode}
          autoCapitalize={this.autocapitalize}
          autocomplete={this.autocomplete}
          autocorrect={this.autocorrect}
          autofocus={this.autofocus}
          min={this.min}
          max={this.max}
          minLength={this.minLength}
          maxLength={this.maxLength}
          multiple={this.multiple}
          placeholder={this.placeholder || ''}
          readonly={this.readonly}
          required={this.required}
          spellcheck={this.spellcheck}
          type={this.type}
          value={value}
          onClick={ev => this.handleClick(ev)}
          onFocus={ev => this.handleFocus(ev)}
          onBlur={ev => this.handleBlur(ev)}
          onInput={ev => this.handleInput(ev)}
          onKeyDown={ev => this.handleKeydown(ev)}
          onKeyPress={ev => this.dsKeyPress.emit(ev)}
          {...inputProps}
          {...this.inheritedAttributes}
        />
      </Field>
    )
  }
}

let InputIds = 0
