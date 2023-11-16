import {
  Component,
  Host,
  h,
  ComponentInterface,
  Prop,
  EventEmitter,
  Event,
  Element,
  Method,
  State,
  Watch,
  Listen,
} from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { inheritAttributes } from '../../../utils/attributes'
import { BalConfigObserver, BalConfigState } from '../../../interfaces'
import { ListenToConfig } from '../../../utils/config'
import { hasParent } from '../../../utils/helpers'
import { DateMask, MaskComponentAdapter } from '../../../utils/mask'
import { inputSetBlur, inputSetFocus } from '../../../utils/form-input'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../../utils/form'

@Component({
  tag: 'bal-input-date',
  styleUrl: 'bal-input-date.sass',
})
export class InputDate implements ComponentInterface, Loggable, BalConfigObserver, BalAriaFormLinking {
  private inputId = `bal-i-date-${inputDateIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  private maskAdapter = new MaskComponentAdapter(new DateMask())

  nativeInput!: HTMLInputElement
  log!: LogInstance

  @Element() el!: HTMLElement

  @State() focused = false
  @State() isGrouped = false
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  @Logger('bal-input-date')
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
   * If `true` the attribute required is added to the native input.
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
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string

  /**
   * If `true` the input gets a clickable cursor style
   */
  @Prop() clickable = false

  /**
   * The minimum datetime allowed. Value must be a date string
   * following the
   * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
   * such as `1996-12-19`. The format does not have to be specific to an exact
   * datetime. For example, the minimum could just be the year, such as `1994`.
   * Defaults to the beginning of the year, 100 years ago from today.
   */
  @Prop({ mutable: true }) min?: string

  /**
   * The maximum datetime allowed. Value must be a date string
   * following the
   * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
   * `1996-12-19`. The format does not have to be specific to an exact
   * datetime. For example, the maximum could just be the year, such as `1994`.
   * Defaults to the end of this year.
   */
  @Prop({ mutable: true }) max?: string

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: BalProps.BalInputAutocomplete = 'off'

  /**
   * @internal
   * If `true` the input will get some right padding.
   */
  @Prop() hasIconRight = false

  /**
   * The value of the form field, which accepts ISO 8601 date strings (YYYY-MM-DD).
   */
  @Prop({ mutable: true }) value: string | undefined = undefined

  inputValue: string | undefined = this.value
  initialValue: string = this.value || ''

  @Watch('value')
  valueChanged(newValue: string | undefined, oldValue: string | undefined) {
    this.maskAdapter.bindValueChanged(newValue, oldValue)
  }

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<BalEvents.BalInputDateKeyPressDetail>

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalInputDateChangeDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalInputDateInputDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalInputDateBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalInputDateFocusDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.maskAdapter.bindComponent(this)
    this.isGrouped = hasParent('bal-input-group', this.el)
  }

  componentDidLoad(): void {
    this.maskAdapter.bindComponentDidLoad()
  }

  componentWillRender() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(config: BalConfigState) {
    this.maskAdapter.bindConfigChanged(config)
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    this.maskAdapter.bindFormReset(event)
  }

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(event: MouseEvent) {
    this.maskAdapter.bindGlobalClick(event)
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

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

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('input-date')
    const native = block.element('native')

    return (
      <Host
        onClick={(event: MouseEvent) => this.maskAdapter.bindHostClick(event)}
        class={{
          ...block.class(),
        }}
      >
        <input
          type="date"
          class={{ ...native.class() }}
          name={this.name}
          min={this.min}
          max={this.max}
          value={this.value}
          tabindex={-1}
          aria-hidden="true"
        ></input>
        <input
          class={{
            'input': true,
            'is-disabled': this.disabled || this.readonly,
            'is-danger': this.invalid,
            'is-clickable': this.clickable && !(this.disabled || this.readonly),
            'bal-focusable': !this.disabled,
            'has-icon-right': this.hasIconRight,
          }}
          data-testid="bal-date-input"
          ref={el => (this.nativeInput = el as HTMLInputElement)}
          id={this.ariaForm.controlId || this.inputId}
          aria-labelledby={this.ariaForm.labelId}
          aria-describedby={this.ariaForm.messageId}
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : null}
          required={this.required}
          disabled={this.disabled}
          readonly={this.readonly}
          autoComplete={this.autocomplete}
          {...this.maskAdapter.attributes}
          {...this.inheritedAttributes}
          placeholder={this.placeholder}
          value={this.inputValue}
          onKeyDown={event => this.maskAdapter.bindKeyDown(event)}
          onClick={event => this.maskAdapter.bindClick(event)}
          onFocus={event => this.maskAdapter.bindFocus(event)}
          onBlur={event => this.maskAdapter.bindBlur(event)}
          onPaste={event => this.maskAdapter.bindPaste(event)}
        />
      </Host>
    )
  }
}

let inputDateIds = 0
