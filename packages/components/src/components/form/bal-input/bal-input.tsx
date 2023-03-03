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
import { debounceEvent, findItemLabel } from '../../../utils/helpers'
import { inheritAttributes } from '../../../utils/attributes'
import {
  FormInput,
  getInputTarget,
  inputHandleBlur,
  inputHandleChange,
  inputHandleClick,
  inputHandleFocus,
  inputHandleHostClick,
  inputHandleReset,
  inputListenOnClick,
  inputSetBlur,
  inputSetFocus,
  stopEventBubbling,
} from '../../../utils/form-input'
import { Props, Events } from '../../../types'
import {
  formatBeEnterpriseNumber,
  formatBeIBAN,
  formatClaim,
  formatOffer,
  formatPolicy,
  MAX_LENGTH_BE_ENTERPRISE_NUMBER,
  MAX_LENGTH_BE_IBAN,
  MAX_LENGTH_CLAIM_NUMBER,
  MAX_LENGTH_CONTRACT_NUMBER,
  MAX_LENGTH_OFFER_NUMBER,
} from './bal-input-util'
import isNil from 'lodash.isnil'
import { ACTION_KEYS, isCtrlOrCommandKey, NUMBER_KEYS } from '../../../utils/constants/keys.constant'
import { BEM } from '../../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'bal-input',
  styleUrls: {
    css: 'bal-input.sass',
  },
})
export class Input implements ComponentInterface, FormInput<string | undefined>, Loggable {
  private inputId = `bal-input-${InputIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  log!: LogInstance
  @Logger('bal-input')
  createLogger(log: LogInstance) {
    this.log = log
  }

  nativeInput?: HTMLInputElement
  inputValue = this.value
  initialValue = this.value || ''

  @Element() el!: HTMLElement

  @State() hasFocus = false

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * Defines the text align of the input value.
   */
  @Prop() textAlign: 'center' | 'left' | 'right' = 'left'

  /**
   * Defines the type of the input (text, number, email ...).
   */
  @Prop() type: Props.BalInputInputType = 'text'

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
  @Prop() autocomplete: Props.BalInputAutocomplete = 'off'

  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  @Prop() autocorrect: Props.BalInputAutocorrect = 'off'

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
   * @deprecated  If `true` this component can be placed on dark background
   */
  @Prop() inverted = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true` the input gets a clickable cursor style
   */
  @Prop() clickable = false

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
  @Prop() inputmode?: Props.BalInputInputMode

  /**
   * The value of the input.
   */
  @Prop({ mutable: true, reflect: true }) value?: string = undefined

  /**
   * Mask of the input field. It defines what the user can enter and how the format looks like. Currently, only for Switzerland formatted with addition of Belgian enterprisenumber and IBAN.
   * Formatting for 'contract-number': '99/1.234.567-1'
   * Formatting for 'claim-number': ('73/001217/16.9')
   * Formatting for 'offer-number': ('98/7.654.321')
   * Formatting for 'be-enterprise-number': ('1234.567.890')
   * Formatting for 'be-iban': ('BE68 5390 0754 7034')
   */
  @Prop() mask?: Props.BalInputMask = undefined

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<Events.BalInputInputDetail>

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
  @Event() balChange!: EventEmitter<Events.BalInputChangeDetail>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(event: UIEvent) {
    inputListenOnClick(this, event)
  }

  private resetHandlerTimer?: NodeJS.Timer

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    const formElement = event.target as HTMLElement
    if (formElement?.contains(this.el)) {
      inputHandleReset(this, this.initialValue, this.resetHandlerTimer)
    }
  }

  connectedCallback() {
    this.debounceChanged()
    this.initialValue = this.value || ''
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  componentDidLoad() {
    this.inputValue = this.value
  }

  /**
   * Sets focus on the native `input` in `bal-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    inputSetFocus(this)
  }

  /**
   * Sets blur on the native `input` in `bal-input`. Use this method instead of the global
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

  private getRawValue(): string {
    const value = (this.value || '').toString()
    return value
  }

  private getFormattedValue(): string {
    const value = this.getRawValue()
    const suffix = this.suffix !== undefined && value !== undefined && value !== '' ? ' ' + this.suffix : ''
    return `${value}${suffix}`
  }

  private getInputValue = () => {
    const input = this.nativeInput

    let inputValue = ''
    if (input) {
      if (this.allowedKeyPress && input && !this.mask) {
        const regex = new RegExp('^' + this.allowedKeyPress + '$')
        const value = input.value
          .split('')
          .filter(val => regex.test(val))
          .join('')
        input.value = value
        return value
      }

      if (this.mask) {
        switch (this.mask) {
          case 'contract-number': {
            inputValue = input.value.replace(/\D/g, '')
            if (inputValue.length > MAX_LENGTH_CONTRACT_NUMBER) {
              inputValue = inputValue.substring(0, MAX_LENGTH_CONTRACT_NUMBER)
            }
            return inputValue
          }
          case 'offer-number': {
            inputValue = input.value.replace(/\D/g, '')
            if (inputValue.length > MAX_LENGTH_OFFER_NUMBER) {
              inputValue = inputValue.substring(0, MAX_LENGTH_OFFER_NUMBER)
            }
            return inputValue
          }
          case 'claim-number': {
            inputValue = input.value.replace(/[^\dXx]/g, '')
            const inputParts = [
              inputValue.substring(0, MAX_LENGTH_CLAIM_NUMBER - 1),
              inputValue.substring(MAX_LENGTH_CLAIM_NUMBER - 1, MAX_LENGTH_CLAIM_NUMBER),
              inputValue.substring(MAX_LENGTH_CLAIM_NUMBER),
            ].filter(val => val.length > 0)
            switch (inputParts.length) {
              case 1:
                inputValue = `${inputParts[0].replace(/\D/g, '')}`
                break
              case 2:
                inputValue = `${inputParts[0].replace(/\D/g, '')}${inputParts[1]}`
                break
              default:
                inputValue = `${inputParts[0].replace(/\D/g, '')}${inputParts[1]}${inputParts[2]?.replace(/\D/g, '')}`
            }
            if (inputValue.length > MAX_LENGTH_CLAIM_NUMBER) {
              inputValue = inputValue.substring(0, MAX_LENGTH_CLAIM_NUMBER)
            }
            return inputValue
          }
          case 'be-enterprise-number': {
            inputValue = input.value.replace(/\D/g, '')
            if (inputValue.length > MAX_LENGTH_BE_ENTERPRISE_NUMBER) {
              inputValue = inputValue.substring(0, MAX_LENGTH_BE_ENTERPRISE_NUMBER)
            }
            return inputValue
          }
          case 'be-iban': {
            inputValue = input.value.replace(/\D/g, '')
            if (inputValue.length > MAX_LENGTH_BE_IBAN) {
              inputValue = inputValue.substring(0, MAX_LENGTH_BE_IBAN)
            }
            return inputValue
          }
          default:
            return input.value
        }
      }
    }

    return ''
  }

  private onInput = (ev: InputEvent) => {
    const input = getInputTarget(ev)
    const cursorPositionStart = (ev as any).target?.selectionStart
    const cursorPositionEnd = (ev as any).target?.selectionEnd

    this.inputValue = this.getInputValue()

    if (input) {
      if (input.value) {
        switch (this.mask) {
          case 'contract-number': {
            input.value = formatPolicy(this.inputValue)
            if (cursorPositionStart < this.inputValue.length) {
              input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
            }
            break
          }
          case 'offer-number': {
            input.value = formatOffer(this.inputValue)
            if (cursorPositionStart < this.inputValue.length) {
              input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
            }
            break
          }
          case 'claim-number': {
            input.value = formatClaim(this.inputValue)

            if (cursorPositionStart < this.inputValue.length) {
              input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
            }
            break
          }
          case 'be-enterprise-number': {
            input.value = formatBeEnterpriseNumber(this.inputValue)
            if (cursorPositionStart < this.inputValue.length) {
              input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
            }
            break
          }
          case 'be-iban': {
            input.value = formatBeIBAN(this.inputValue)
            if (cursorPositionStart < this.inputValue.length) {
              input.setSelectionRange(cursorPositionStart, cursorPositionEnd)
            }
            break
          }
          default:
            this.inputValue = input.value
        }
      } else {
        this.inputValue = input.value
      }
    }

    this.balInput.emit(this.inputValue)
  }

  private onFocus = (event: FocusEvent) => inputHandleFocus(this, event)

  private onBlur = (ev: FocusEvent) => {
    inputHandleBlur(this, ev)

    const input = ev.target as HTMLInputElement | null
    if (input) {
      if (this.mask === undefined) {
        input.value = this.getFormattedValue()
      }
      inputHandleChange(this)
    }
  }

  private getMaskAllowedKeys() {
    return [...NUMBER_KEYS, ...ACTION_KEYS]
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (this.mask !== undefined && !isNil(event) && !isCtrlOrCommandKey(event)) {
      let inputLength = 0
      if (this.inputValue) {
        inputLength = this.inputValue.length
      }

      if (
        !(
          this.getMaskAllowedKeys().includes(event.key) ||
          (this.mask === 'claim-number' &&
            (event.key === 'X' || event.key === 'x') &&
            inputLength >= MAX_LENGTH_CLAIM_NUMBER - 1)
        )
      ) {
        // do not trigger next event -> on input
        return stopEventBubbling(event)
      }
    }

    if (this.allowedKeyPress && !this.mask && !isNil(event) && !isCtrlOrCommandKey(event)) {
      const regex = new RegExp('^' + this.allowedKeyPress + '$')
      if (!regex.test(event.key) && ![...ACTION_KEYS].includes(event.key)) {
        return stopEventBubbling(event)
      }
    }
  }

  private onClick = (event: MouseEvent) => inputHandleClick(this, event)

  private handleClick = (event: MouseEvent) => inputHandleHostClick(this, event)

  render() {
    let value = this.hasFocus ? this.getRawValue() : this.getFormattedValue()
    if (this.mask !== undefined) {
      switch (this.mask) {
        case 'contract-number':
          value = formatPolicy(value)
          break
        case 'claim-number':
          value = formatClaim(value)
          break
        case 'offer-number':
          value = formatOffer(value)
          break
        case 'be-enterprise-number':
          value = formatBeEnterpriseNumber(value)
          break
        case 'be-iban':
          value = formatBeIBAN(value)
          break
      }
    }
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

    const block = BEM.block('input')

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          ...block.class(),
        }}
      >
        <input
          class={{
            'input': true,
            'data-test-input': true,
            'is-disabled': this.disabled || this.readonly,
            'is-danger': this.invalid,
            'is-inverted': this.inverted,
            'clickable': this.clickable,
            'bal-focusable': !this.disabled,
            'has-icon-right': this.hasIconRight,
            'has-text-centered': this.textAlign === 'center',
            'has-text-right': this.textAlign === 'right',
          }}
          ref={inputEl => (this.nativeInput = inputEl)}
          id={this.inputId}
          aria-labelledby={labelId}
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
          name={this.name}
          placeholder={this.placeholder || ''}
          readonly={this.readonly}
          required={this.required}
          spellcheck={this.spellcheck}
          type={this.type}
          value={value}
          onFocus={this.onFocus}
          onInput={ev => this.onInput(ev as InputEvent)}
          onKeyDown={e => this.onKeydown(e)}
          onBlur={this.onBlur}
          onClick={this.onClick}
          onKeyPress={e => this.balKeyPress.emit(e)}
          {...inputProps}
          {...this.inheritedAttributes}
        />
      </Host>
    )
  }
}

let InputIds = 0
