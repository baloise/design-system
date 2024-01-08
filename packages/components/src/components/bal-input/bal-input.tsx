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
import { debounceEvent } from '../../utils/helpers'
import { inheritAttributes } from '../../utils/attributes'
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
} from '../../utils/form-input'
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
import { ACTION_KEYS, isCtrlOrCommandKey, NUMBER_KEYS } from '../../utils/constants/keys.constant'
import { BEM } from '../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'

@Component({
  tag: 'bal-input',
  styleUrl: 'bal-input.sass',
})
export class Input implements ComponentInterface, FormInput<string | undefined>, Loggable, BalAriaFormLinking {
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

  @State() focused = false
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

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
  @Prop() type: BalProps.BalInputInputType = 'text'

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
  @Prop() autocomplete: BalProps.BalInputAutocomplete = 'off'

  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  @Prop() autocorrect: BalProps.BalInputAutocorrect = 'off'

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
  @Prop() inputmode?: BalProps.BalInputInputMode

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
  @Prop() mask?: BalProps.BalInputMask = undefined

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalInputInputDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalInputBlurDetail>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<BalEvents.BalInputKeyPressDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalInputFocusDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalInputChangeDetail>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    inputListenOnClick(this, ev)
  }

  private resetHandlerTimer?: NodeJS.Timer

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
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

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
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

      if (input.value) {
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
      } else {
        this.inputValue = input.value
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

  private onFocus = (ev: FocusEvent) => inputHandleFocus(this, ev)

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

  private onKeydown = (ev: KeyboardEvent) => {
    if (this.mask !== undefined && !isNil(ev) && !isCtrlOrCommandKey(ev)) {
      let inputLength = 0
      if (this.inputValue) {
        inputLength = this.inputValue.length
      }

      if (
        !(
          this.getMaskAllowedKeys().includes(ev.key) ||
          (this.mask === 'claim-number' &&
            (ev.key === 'X' || ev.key === 'x') &&
            inputLength >= MAX_LENGTH_CLAIM_NUMBER - 1)
        )
      ) {
        // do not trigger next event -> on input
        return stopEventBubbling(ev)
      }
    }

    if (this.allowedKeyPress && !this.mask && !isNil(ev) && !isCtrlOrCommandKey(ev)) {
      const regex = new RegExp('^' + this.allowedKeyPress + '$')
      if (!regex.test(ev.key) && ![...ACTION_KEYS].includes(ev.key)) {
        return stopEventBubbling(ev)
      }
    }
  }

  private onClick = (ev: MouseEvent) => inputHandleClick(this, ev)

  private handleClick = (ev: MouseEvent) => inputHandleHostClick(this, ev)

  render() {
    let value = this.focused ? this.getRawValue() : this.getFormattedValue()
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

    let inputProps = {}
    if (this.pattern) {
      inputProps = { pattern: this.pattern }
    }

    const block = BEM.block('input')

    const id = this.ariaForm.controlId || this.inputId

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
            'is-disabled': this.disabled || this.readonly,
            'is-danger': this.invalid,
            'is-clickable': this.clickable,
            'bal-focusable': !this.disabled,
            'has-icon-right': this.hasIconRight,
            'has-text-centered': this.textAlign === 'center',
            'has-text-right': this.textAlign === 'right',
          }}
          data-testid="bal-input"
          ref={inputEl => (this.nativeInput = inputEl)}
          id={id}
          aria-labelledby={this.ariaForm.labelId}
          aria-describedby={this.ariaForm.messageId}
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : null}
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
