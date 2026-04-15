import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import isNil from 'lodash/isNil'
import { ariaBooleanToString } from '../../utils/aria'
import { inheritAttributes } from '../../utils/attributes'
import { ACTION_KEYS, isCtrlOrCommandKey, NUMBER_KEYS } from '../../utils/constants/keys.constant'
import { FormControlInterface, FormControl, stopEventBubbling } from '../../utils/form-control'
import { debounceEvent } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { InputMaskUtil } from './input.mask'
import { getMask } from './masks'


@Component({
  tag: 'ds-input',
  styleUrl: 'input.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Input implements ComponentInterface, FormControlInterface<string | null>, Loggable {
  private inputId = `ds-input-${InputIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private control = new FormControl(this)
  private maskUtil = new InputMaskUtil(this)

  log!: LogInstance
  @Logger('input')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() focused = false
  @AttachInternals() internals!: ElementInternals

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the input.
   */
  @Prop({ mutable: true, reflect: true }) value: string | null = null

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * The label of the input, which is displayed above the input field.
   */
  @Prop() label?: string

  /**
   * The description of the input, which is displayed below the input field.
   */
  @Prop() description?: string

  /**
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop() color: 'primary' | 'danger' | 'success' | 'warning' = 'primary'

  /**
   * Shows a loading indicator at the end of the input and replaces the input-end slot content.
   */
  @Prop() loading = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * The text to display when the input is in an invalid state.
   */
  @Prop() invalidText?: string

  /**
   * Defines the type of the input (text, number, email ...).
   */
  @Prop() type: DS.InputInputType = 'text'

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
  @Prop() autocomplete: DS.InputAutocomplete = 'off'

  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  @Prop() autocorrect: DS.InputAutocorrect = 'off'

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop() autofocus = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `dsChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder?: string

  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  @Prop() max?: string

  /**
   * Defines the max length of the value.
   */
  @Prop() maxLength?: number

  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  @Prop() min?: string

  /**
   * Defines the min length of the value.
   */
  @Prop() minLength?: number

  /**
   * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.
   */
  @Prop() multiple?: boolean

  /**
   * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, `"date"`, or `"password"`, otherwise it is ignored. When the type attribute is `"date"`, `pattern` will only be used in browsers that do not support the `"date"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for more information.
   */
  @Prop() pattern?: string

  /**
   * A regular expression that the key of the key press event is checked against and if not matching the expression the event will be prevented.
   */
  @Prop() allowedKeyPress?: string

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true`, the element will have its spelling and grammar checked.
   */
  @Prop() spellcheck = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * Adds a suffix the the input-value after blur.
   */
  @Prop() suffix?: string

  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
   * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
   */
  @Prop() inputmode?: DS.InputInputMode

  /**
   * Mask of the input field. It defines what the user can enter and how the format looks like. Currently, only for Switzerland formatted with addition of Belgian enterprisenumber and IBAN.
   * Formatting for 'contract-number': '99/1.234.567-1'
   * Formatting for 'basic-contract-number': '99/1.234.567'
   * Formatting for 'claim-number': ('73/001217/16.9')
   * Formatting for 'offer-number': ('98/7.654.321')
   * Formatting for 'be-enterprise-number': ('1234.567.890')
   * Formatting for 'be-iban': ('BE68 5390 0754 7034')
   */
  @Prop() mask?: DS.InputMask = undefined
  @Watch('mask')
  protected maskChanged() {
    this.maskUtil.setFormatter(getMask(this.mask))
  }

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<DS.InputBlurDetail>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() dsKeyPress!: EventEmitter<DS.InputKeyPressDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() dsFocus!: EventEmitter<DS.InputFocusDetail>

  /**
   * Emitted when the input has clicked
   */
  @Event() dsClick!: EventEmitter<DS.InputClickDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsInput!: EventEmitter<DS.InputInputDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() dsChange!: EventEmitter<DS.InputChangeDetail>

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    this.control.listenOnClick(ev)
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenOnReset(ev: UIEvent) {
    this.control.listenOnReset(ev)
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
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

  // private getInputValue = () => {
  //   const input = this.nativeInput

  //   let inputValue = ''
  //   if (input) {
  //     if (this.allowedKeyPress && input && !this.mask) {
  //       const regex = new RegExp('^' + this.allowedKeyPress + '$')
  //       const value = input.value
  //         .split('')
  //         .filter(val => regex.test(val))
  //         .join('')
  //       input.value = value
  //       return value
  //     }

  //     if (input.value) {
  //       if (this.mask) {
  //         switch (this.mask) {
  //           case 'vehicle-registration-number': {
  //             inputValue = input.value.replace(/\D/g, '')
  //             if (inputValue.length > MAX_LENGTH_VEHICLE_REGISTRATION_NUMBER) {
  //               inputValue = inputValue.substring(0, MAX_LENGTH_VEHICLE_REGISTRATION_NUMBER)
  //             }

  //             return inputValue
  //           }
  //           case 'contract-number': {
  //             inputValue = input.value.replace(/\D/g, '')
  //             // Removing the leading zero if presented
  //             if (inputValue.charAt(0) === '0') {
  //               inputValue = inputValue.substring(1)
  //             }
  //             if (inputValue.length > MAX_LENGTH_CONTRACT_NUMBER) {
  //               inputValue = inputValue.substring(0, MAX_LENGTH_CONTRACT_NUMBER)
  //             }
  //             return inputValue
  //           }
  //           case 'basic-contract-number': {
  //             inputValue = input.value.replace(/\D/g, '')
  //             // Removing the leading zero if presented
  //             if (inputValue.charAt(0) === '0') {
  //               inputValue = inputValue.substring(1)
  //             }
  //             if (inputValue.length > MAX_LENGTH_BASIC_CONTRACT_NUMBER) {
  //               inputValue = inputValue.substring(0, MAX_LENGTH_BASIC_CONTRACT_NUMBER)
  //             }
  //             return inputValue
  //           }
  //           case 'offer-number': {
  //             inputValue = input.value.replace(/\D/g, '')
  //             if (inputValue.length > MAX_LENGTH_OFFER_NUMBER) {
  //               inputValue = inputValue.substring(0, MAX_LENGTH_OFFER_NUMBER)
  //             }
  //             return inputValue
  //           }
  //           case 'claim-number': {
  //             inputValue = input.value.replace(/[^\dXx]/g, '')
  //             const inputParts = [
  //               inputValue.substring(0, MAX_LENGTH_CLAIM_NUMBER - 1),
  //               inputValue.substring(MAX_LENGTH_CLAIM_NUMBER - 1, MAX_LENGTH_CLAIM_NUMBER),
  //               inputValue.substring(MAX_LENGTH_CLAIM_NUMBER),
  //             ].filter(val => val.length > 0)
  //             switch (inputParts.length) {
  //               case 1:
  //                 inputValue = `${inputParts[0].replace(/\D/g, '')}`
  //                 break
  //               case 2:
  //                 inputValue = `${inputParts[0].replace(/\D/g, '')}${inputParts[1]}`
  //                 break
  //               default:
  //                 inputValue = `${inputParts[0].replace(/\D/g, '')}${inputParts[1]}${inputParts[2]?.replace(/\D/g, '')}`
  //             }
  //             if (inputValue.length > MAX_LENGTH_CLAIM_NUMBER) {
  //               inputValue = inputValue.substring(0, MAX_LENGTH_CLAIM_NUMBER)
  //             }
  //             return inputValue
  //           }
  //           case 'be-enterprise-number': {
  //             inputValue = input.value.replace(/\D/g, '')
  //             if (inputValue.length > MAX_LENGTH_BE_ENTERPRISE_NUMBER) {
  //               inputValue = inputValue.substring(0, MAX_LENGTH_BE_ENTERPRISE_NUMBER)
  //             }
  //             return inputValue
  //           }
  //           case 'be-iban': {
  //             inputValue = input.value.replace(/\D/g, '')
  //             if (inputValue.length > MAX_LENGTH_BE_IBAN) {
  //               inputValue = inputValue.substring(0, MAX_LENGTH_BE_IBAN)
  //             }
  //             return inputValue
  //           }
  //           default:
  //             return input.value
  //         }
  //       }
  //     } else {
  //       this.inputValue = input.value
  //     }
  //   }

  //   return ''
  // }

  // private onInput = (ev: InputEvent) => {
  // this.control.onInput(ev)

  // const input = getInputTarget(ev)
  // const cursorPositionStart = (ev as any).target?.selectionStart
  // const cursorPositionEnd = (ev as any).target?.selectionEnd

  // this.inputValue = this.getInputValue()

  // if (input) {
  //   if (input.value) {
  //     switch (this.mask) {
  //       case 'vehicle-registration-number': {
  //         input.value = formatVehicleRegistrationNumber(this.inputValue)
  //         if (cursorPositionStart < this.inputValue.length) {
  //           input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
  //         }
  //         break
  //       }
  //       case 'contract-number':
  //       case 'basic-contract-number': {
  //         input.value = formatPolicy(this.inputValue)
  //         if (cursorPositionStart < this.inputValue.length) {
  //           input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
  //         }
  //         break
  //       }
  //       case 'offer-number': {
  //         input.value = formatOffer(this.inputValue)
  //         if (cursorPositionStart < this.inputValue.length) {
  //           input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
  //         }
  //         break
  //       }
  //       case 'claim-number': {
  //         input.value = formatClaim(this.inputValue)

  //         if (cursorPositionStart < this.inputValue.length) {
  //           input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
  //         }
  //         break
  //       }
  //       case 'be-enterprise-number': {
  //         input.value = formatBeEnterpriseNumber(this.inputValue)
  //         if (cursorPositionStart < this.inputValue.length) {
  //           input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
  //         }
  //         break
  //       }
  //       case 'be-iban': {
  //         input.value = formatBeIBAN(this.inputValue)
  //         if (cursorPositionStart < this.inputValue.length) {
  //           input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
  //         }
  //         break
  //       }
  //       default:
  //         this.inputValue = input.value
  //     }
  //   } else {
  //     this.inputValue = input.value
  //   }
  // }

  // this.dsInput.emit(this.inputValue)
  // }

  // private onFocus = (ev: FocusEvent) => inputHandleFocus(this, ev)

  // private onBlur = (ev: FocusEvent) => {
  //   // inputHandleBlur(this, ev)
  //   // inputHandleChange(this)
  //   // const input = ev.target as HTMLInputElement | null
  //   // if (input) {
  //   //   if (this.mask === undefined) {
  //   //     input.value = this.getFormattedValue()
  //   //   }
  //   //   inputHandleChange(this)
  //   // }
  // }

  private getMaskAllowedKeys() {
    return [...NUMBER_KEYS, ...ACTION_KEYS]
  }

  private onKeydown = (ev: KeyboardEvent) => {
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
    let value: string
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
      <Host
        aria-disabled={ariaBooleanToString(this.disabled)}
        class={{
          'is-disabled': this.disabled,
          'is-danger': this.color === 'danger' || this.invalid,
          'is-success': this.color === 'success' && !this.invalid,
          'is-warning': this.color === 'warning' && !this.invalid,
        }}
      >
        {/* ---------------------------------------- */}
        {/* Label.                                   */}
        {/* ---------------------------------------- */}
        <label htmlFor="input" part="label" id="label">
          <slot name="label">{this.label}</slot>
        </label>
        {/* ---------------------------------------- */}
        {/* Input Group                              */}
        {/* ---------------------------------------- */}
        <div id="container">
          <slot name="input-start"></slot>
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
            onKeyDown={ev => this.onKeydown(ev)}
            onKeyPress={ev => this.dsKeyPress.emit(ev)}
            {...inputProps}
            {...this.inheritedAttributes}
          />
          <slot name="input-end"></slot>
          {/* ---------------------------------------- */}
          {/* Loading Indicator                        */}
          {/* ---------------------------------------- */}
          {this.loading && <ds-spinner small variation="circle" color={this.disabled ? 'white' : 'blue'}></ds-spinner>}
          {!this.loading && <slot name="icon-end"></slot>}
        </div>
        {/* ---------------------------------------- */}
        {/* Description                              */}
        {/* ---------------------------------------- */}
        <span id="description" part="description">
          {this.invalid && this.invalidText && <ds-icon name="alert"></ds-icon>}
          <slot name="description">{this.invalid && this.invalidText ? this.invalidText : this.description}</slot>
        </span>
      </Host>
    )
  }
}

let InputIds = 0
