import {
  AttachInternals,
  Component,
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
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  inheritAttributes,
  FormControl,
  FormControlInterface,
  debounceEvent,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { defaultConfig, DsComponentInterface, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { Field, FieldInterface } from '../input/field.util'
import { INPUT_COLORS, InputColor, InputAutocomplete } from '../input/input.interfaces'
import {
  TextareaWrap,
  TextareaInputMode,
  TEXTAREA_WRAPS,
  TextareaBlurDetail,
  TextareaKeyPressDetail,
  TextareaFocusDetail,
  TextareaClickDetail,
  TextareaInputDetail,
  TextareaChangeDetail,
} from './textarea.interfaces'

/**
 * Textarea renders a multi-line text input field with validation, resizing, and optional help/error messaging.
 *
 * @slot - The textarea field content and surrounding elements.
 * @part textarea - The native HTML textarea element.
 * @part prefix - The prefix wrapper (if used).
 * @part suffix - The suffix wrapper (if used).
 */
@Component({
  tag: 'ds-textarea',
  styleUrl: 'textarea.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Textarea implements DsComponentInterface, FieldInterface, FormControlInterface<string | null> {
  inputId = `ds-textarea-${TextareaIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private control = new FormControl(this)

  log!: LogInstance
  @Logger('textarea')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement
  @AttachInternals() internals!: ElementInternals

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Indicates whether and how the text value should be automatically capitalized.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly autocapitalize: string = 'off'

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly autocomplete: InputAutocomplete = 'off'

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly autofocus: boolean = false

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly autoInvalidOff: boolean = false

  /**
   * Defines the color state of the textarea.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...INPUT_COLORS)
  readonly color: InputColor = 'primary'

  /**
   * The visible width of the text control, in average character widths.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly cols?: number

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `dsChange` event after each keystroke.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly debounce: number = 0

  @Watch('debounce')
  debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * The description displayed below the textarea field.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly description: string = ''

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * A hint to the browser for which keyboard to display.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly inputmode?: TextareaInputMode

  /**
   * If `true` the component gets an invalid style.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly invalid: boolean = false

  /**
   * Text shown in the description area when `invalid` is true.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly invalidText: string = ''

  /**
   * The label displayed above the textarea field.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * Specifies the maximum number of characters that the user can enter.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly maxLength?: number

  /**
   * Specifies the minimum number of characters that the user can enter.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly minLength?: number

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly name: string = this.inputId

  /**
   * Instructional text that shows before the textarea has a value.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly placeholder: string = ''

  /**
   * If `true` the element can not be mutated, meaning the user can not edit the control.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly readonly: boolean = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly required: boolean = true

  /**
   * The number of visible text lines for the control.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly rows?: number

  /**
   * The value of the textarea.
   */
  @Prop({ mutable: true, reflect: true }) value: string | null = null

  /**
   * Indicates how the control wraps text.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...TEXTAREA_WRAPS)
  readonly wrap?: TextareaWrap

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<TextareaBlurDetail>

  /**
   * Emitted when the textarea value has changed.
   */
  @Event() dsChange!: EventEmitter<TextareaChangeDetail>

  /**
   * Emitted when the textarea has been clicked.
   */
  @Event() dsClick!: EventEmitter<TextareaClickDetail>

  /**
   * Emitted when the textarea has focus.
   */
  @Event() dsFocus!: EventEmitter<TextareaFocusDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsInput!: EventEmitter<TextareaInputDetail>

  /**
   * Emitted when a keyboard key has been pressed.
   */
  @Event() dsKeyPress!: EventEmitter<TextareaKeyPressDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
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
   * PUBLIC LISTENERS
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
  async getInputElement(): Promise<HTMLTextAreaElement> {
    return this.control.nativeEl as HTMLTextAreaElement
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
   * EVENT HANDLERS
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
