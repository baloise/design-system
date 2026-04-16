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
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { ariaBooleanToString } from '../../utils/aria'
import { inheritAttributes } from '../../utils/attributes'
import { FormControl, FormControlInterface } from '../../utils/form-control'
import { debounceEvent } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '../../utils/config'
import { I18nDsLabel } from '../label/label.i18n'

@Component({
  tag: 'ds-textarea',
  styleUrl: 'textarea.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Textarea implements ComponentInterface, FormControlInterface<string | null>, Loggable {
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
  @Prop() name: string = this.textareaId

  /**
   * The label displayed above the textarea field.
   */
  @Prop() label?: string

  /**
   * The description displayed below the textarea field.
   */
  @Prop() description?: string

  /**
   * Defines the color state of the textarea.
   */
  @Prop() color: 'primary' | 'danger' | 'success' | 'warning' = 'primary'

  /**
   * Text shown in the description area when `invalid` is true.
   */
  @Prop() invalidText?: string

  /**
   * If `true` the component gets an invalid style.
   */
  @Prop() invalid = false

  /**
   * Indicates whether and how the text value should be automatically capitalized.
   */
  @Prop() autocapitalize = 'off'

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: DS.InputAutocomplete = 'off'

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop() autofocus = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `dsChange` event after each keystroke.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * Instructional text that shows before the textarea has a value.
   */
  @Prop() placeholder?: string

  /**
   * Specifies the maximum number of characters that the user can enter.
   */
  @Prop() maxLength?: number

  /**
   * Specifies the minimum number of characters that the user can enter.
   */
  @Prop() minLength?: number

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not be mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * The visible width of the text control, in average character widths.
   */
  @Prop() cols?: number

  /**
   * The number of visible text lines for the control.
   */
  @Prop() rows?: number

  /**
   * Indicates how the control wraps text.
   */
  @Prop() wrap?: DS.TextareaWrap

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = true

  /**
   * A hint to the browser for which keyboard to display.
   */
  @Prop() inputmode?: DS.TextareaInputMode

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid.
   */
  @Prop({ reflect: true }) autoInvalidOff = false

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
  listenOnClick(ev: UIEvent) {
    this.control.listenOnClick(ev)
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenOnReset(ev: UIEvent) {
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
      <Host
        aria-disabled={ariaBooleanToString(this.disabled)}
        class={{
          'ds-field': true,
          'is-disabled': this.disabled,
          'is-danger': this.color === 'danger' || this.invalid,
          'is-success': this.color === 'success' && !this.invalid,
          'is-warning': this.color === 'warning' && !this.invalid,
        }}
      >
        {/* ---------------------------------------- */}
        {/* Label                                    */}
        {/* ---------------------------------------- */}
        <label htmlFor="textarea" part="label" id="label">
          <slot name="label">{this.label}</slot>
          {this.required === false && <span>{I18nDsLabel[this.language].optional || ''}</span>}
        </label>

        {/* ---------------------------------------- */}
        {/* Textarea Container                       */}
        {/* ---------------------------------------- */}
        <div id="container">
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

let TextareaIds = 0
