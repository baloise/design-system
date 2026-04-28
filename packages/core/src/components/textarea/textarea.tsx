import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import {
  inheritAttributes,
  FormControl,
  FormControlInterface,
  debounceEvent,
  Loggable,
  Logger,
  type LogInstance,
} from '@utils'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { Field, FieldInterface } from '../input/field.util'

@Component({
  tag: 'ds-textarea',
  styleUrl: 'textarea.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Textarea implements ComponentInterface, FieldInterface, FormControlInterface<string | null>, Loggable {
  private textareaId = `ds-textarea-${TextareaIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private control = new FormControl(this)

  log!: LogInstance
  @Logger('textarea')
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
   * The value of the textarea.
   */
  @Prop({ mutable: true, reflect: true }) value: string | null = null

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() readonly name: string = this.textareaId

  /**
   * The label displayed above the textarea field.
   */
  @Prop() readonly label?: string

  /**
   * The description displayed below the textarea field.
   */
  @Prop() readonly description?: string

  /**
   * Defines the color state of the textarea.
   */
  @Prop() readonly color: DS.InputColor = 'primary'

  /**
   * Text shown in the description area when `invalid` is true.
   */
  @Prop() readonly invalidText?: string

  /**
   * If `true` the component gets an invalid style.
   */
  @Prop() readonly invalid: boolean = false

  /**
   * Indicates whether and how the text value should be automatically capitalized.
   */
  @Prop() readonly autocapitalize = 'off'

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() readonly autocomplete: DS.InputAutocomplete = 'off'

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop() readonly autofocus: boolean = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `dsChange` event after each keystroke.
   */
  @Prop() readonly debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * Instructional text that shows before the textarea has a value.
   */
  @Prop() readonly placeholder?: string

  /**
   * Specifies the maximum number of characters that the user can enter.
   */
  @Prop() readonly maxLength?: number

  /**
   * Specifies the minimum number of characters that the user can enter.
   */
  @Prop() readonly minLength?: number

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form.
   */
  @Prop() readonly disabled: boolean = false

  /**
   * If `true` the element can not be mutated, meaning the user can not edit the control.
   */
  @Prop() readonly readonly: boolean = false

  /**
   * The visible width of the text control, in average character widths.
   */
  @Prop() readonly cols?: number

  /**
   * The number of visible text lines for the control.
   */
  @Prop() readonly rows?: number

  /**
   * Indicates how the control wraps text.
   */
  @Prop() readonly wrap?: DS.TextareaWrap

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() readonly required: boolean = true

  /**
   * A hint to the browser for which keyboard to display.
   */
  @Prop() readonly inputmode?: DS.TextareaInputMode

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid.
   */
  @Prop({ reflect: true }) readonly autoInvalidOff: boolean = false

  /**
   * EVENTS
   * ------------------------------------------------------
   */

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<DS.TextareaBlurDetail>

  /**
   * Emitted when a keyboard key has been pressed.
   */
  @Event() dsKeyPress!: EventEmitter<DS.TextareaKeyPressDetail>

  /**
   * Emitted when the textarea has focus.
   */
  @Event() dsFocus!: EventEmitter<DS.TextareaFocusDetail>

  /**
   * Emitted when the textarea has been clicked.
   */
  @Event() dsClick!: EventEmitter<DS.TextareaClickDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsInput!: EventEmitter<DS.TextareaInputDetail>

  /**
   * Emitted when the textarea value has changed.
   */
  @Event() dsChange!: EventEmitter<DS.TextareaChangeDetail>

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
    this.debounceChanged()
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
   * Sets focus on the native `textarea` element.
   */
  @Method()
  async setFocus() {
    return this.control.setFocus()
  }

  /**
   * Sets blur on the native `textarea` element.
   * @internal
   */
  @Method()
  async setBlur() {
    return this.control.setBlur()
  }

  /**
   * Returns the native `<textarea>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLTextAreaElement> {
    return Promise.resolve(this.control.nativeEl as HTMLTextAreaElement)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

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
    this.control.onInput(ev)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Field
        disabled={this.disabled}
        color={this.color}
        invalid={this.invalid}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
        inputId="textarea"
      >
        <textarea
          id="textarea"
          part="textarea"
          name={this.name}
          ref={el => (this.control.nativeEl = el)}
          aria-describedby="description"
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          disabled={this.disabled}
          autoCapitalize={this.autocapitalize}
          autocomplete={this.autocomplete}
          autofocus={this.autofocus}
          minLength={this.minLength}
          maxLength={this.maxLength}
          placeholder={this.placeholder || ''}
          readonly={this.readonly}
          required={this.required}
          inputMode={this.inputmode}
          cols={this.cols}
          rows={this.rows}
          wrap={this.wrap}
          onClick={ev => this.handleClick(ev)}
          onFocus={ev => this.handleFocus(ev)}
          onBlur={ev => this.handleBlur(ev)}
          onInput={ev => this.handleInput(ev as InputEvent)}
          onKeyPress={ev => this.dsKeyPress.emit(ev)}
          {...this.inheritedAttributes}
        />
      </Field>
    )
  }
}

let TextareaIds = 0
