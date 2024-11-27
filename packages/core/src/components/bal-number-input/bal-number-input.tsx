import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import {
  ListenToConfig,
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  defaultConfig,
} from '../../utils/config'
import {
  FormInput,
  getNativeInputValue,
  getUpcomingValue,
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
import { debounceEvent } from '../../utils/helpers'
import { inheritAttributes } from '../../utils/attributes'
import { getDecimalSeparator, getThousandSeparator } from '../../utils/number'
import { BEM } from '../../utils/bem'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import {
  toUserFormattedNumber,
  isNotNumber,
  toNumber,
  toFixedNumber,
  validateKeyDown,
  mapDecimalSeparator,
} from './bal-number-input.utils'
import isNil from 'lodash.isnil'
import isEmpty from 'lodash.isempty'
import isNaN from 'lodash.isnan'
import { ListenTo } from '../../utils/listen'

@Component({
  tag: 'bal-number-input',
  styleUrl: 'bal-number-input.sass',
})
export class NumberInput
  implements ComponentInterface, BalConfigObserver, FormInput<number | undefined>, BalAriaFormLinking, Loggable
{
  private inputId = `bal-number-input-${numberInputIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private selectTimeout?: NodeJS.Timeout

  lastValue = ''
  nativeInput?: HTMLInputElement
  inputValue?: number = this.value
  initialValue?: number = undefined

  @Element() el!: HTMLElement

  @State() focused = false
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
  @State() ariaForm: BalAriaForm = defaultBalAriaForm
  @State() nativeInputValue = ''
  @State() inputPattern = this.createPattern()

  log!: LogInstance

  @Logger('bal-number-input')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

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
   * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, `"date"`, or `"password"`, otherwise it is ignored. When the type attribute is `"date"`, `pattern` will only be used in browsers that do not support the `"date"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for more information.
   */
  @Prop() pattern?: string

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
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  @Prop() max?: string

  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  @Prop() min?: string

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

  @Watch('value')
  protected valueChanged(newValue: number | undefined, oldValue?: number) {
    if (newValue !== oldValue) {
      const isValueNotDefined = (newValue as any) === '' || isNil(newValue) || isNaN(newValue)
      const emptyValue = this.exactNumber ? '0' : ''
      const value = isValueNotDefined ? emptyValue : newValue.toString()

      this.inputValue = toNumber(toFixedNumber(value, this.decimal), this.decimal)
      this.lastValue = toFixedNumber(value, this.decimal)
      if (this.focused) {
        this.nativeInputValue = mapDecimalSeparator(this.lastValue)
      } else {
        this.nativeInputValue = toUserFormattedNumber(this.lastValue, this.decimal, this.suffix)
      }
    }
  }

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalNumberInputInputDetail>

  /**
   * Emitted when the value has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalNumberInputChangeDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalNumberInputBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalNumberInputFocusDetail>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<BalEvents.BalNumberInputKeyPressDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.debounceChanged()
    this.initialValue = this.value || 0
    if (this.value !== undefined) {
      this.valueChanged(this.value, undefined)
    }
  }

  componentDidLoad() {
    this.inputValue = this.value
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenTo('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    inputListenOnClick(this, ev)
  }

  private resetHandlerTimer?: NodeJS.Timeout

  @ListenTo('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      inputHandleReset(this, this.initialValue, this.resetHandlerTimer)
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
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

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private createPattern() {
    if (this.pattern) {
      return this.pattern
    }

    let suffix = this.suffix || ''
    if (suffix !== '') {
      suffix = ` ${suffix}`
    }

    const thousandSeparator = getThousandSeparator()

    let decimalSeparator = getDecimalSeparator()
    if (decimalSeparator === ',') {
      decimalSeparator = '\\,'
    }

    return `-?\\d{1,3}(?:${thousandSeparator}\\d{3})*(?:\\${decimalSeparator}\\d{1,2})?(?:${suffix})?`
  }

  private get lastValueGetter(): string {
    if (this.exactNumber && (isNil(this.lastValue) || isEmpty(this.lastValue))) {
      return '0'
    }
    return this.lastValue
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onClick = (ev: MouseEvent) => inputHandleClick(this, ev)

  private handleClick = (ev: MouseEvent) => inputHandleHostClick(this, ev)

  private onInput = (_ev: Event) => {
    //
    // if the new value is not a number, the last value will be restored
    if (this.nativeInput) {
      if (isNotNumber(this.nativeInput.value)) {
        this.nativeInputValue = this.lastValue || ''
        return
      }
    }

    //
    // if new value is accepted the last value gets updated and input event will be fired
    this.lastValue = this.nativeInput?.value || ''
    this.balInput.emit(toNumber(this.lastValue, this.decimal))
  }

  private onFocus = (ev: FocusEvent) => {
    inputHandleFocus(this, ev)
    //
    // restore the input with the last user value without the formatting
    if (this.nativeInput) {
      this.nativeInputValue = mapDecimalSeparator(this.lastValue || '')
      clearTimeout(this.selectTimeout)
      this.selectTimeout = setTimeout(() => this.nativeInput.select())
    }
  }

  private onBlur = (ev: FocusEvent) => {
    inputHandleBlur(this, ev)

    //
    // on focus out the input value gets a pretty format
    if (this.nativeInput) {
      this.lastValue = toFixedNumber(this.lastValueGetter, this.decimal)
      this.nativeInputValue = toUserFormattedNumber(this.lastValueGetter, this.decimal, this.suffix)
      this.nativeInput.value = this.nativeInputValue
    }

    this.inputValue = toNumber(this.lastValueGetter, this.decimal)

    inputHandleChange(this)
  }

  private onKeydown = (ev: KeyboardEvent) => {
    const oldValue = getNativeInputValue(this)
    const newValue = getUpcomingValue(this, ev)
    const input = ev?.target as HTMLInputElement

    if (
      input &&
      !validateKeyDown({
        key: ev.key,
        ctrlKey: ev.ctrlKey,
        metaKey: ev.metaKey,
        decimal: this.decimal,
        newValue,
        oldValue,
        selectionStart: input.selectionStart,
        selectionEnd: input.selectionEnd,
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
    const block = BEM.block('number-input')

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
          }}
          data-testid="bal-number-input"
          ref={input => (this.nativeInput = input)}
          id={this.ariaForm.controlId || this.inputId}
          aria-labelledby={this.ariaForm.labelId}
          aria-describedby={this.ariaForm.messageId}
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : null}
          name={this.name}
          disabled={this.disabled}
          placeholder={this.placeholder || ''}
          readonly={this.readonly}
          required={this.required}
          pattern={this.inputPattern}
          min={this.min}
          max={this.max}
          value={this.nativeInputValue}
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
