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
  ValidateEmptyOrType,
  setupValidation,
  ValidateEmptyOrOneOf,
} from '@utils'
import { defaultConfig, DsComponentInterface, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { Field, FieldInterface } from '../input/field.util'
import { INPUT_COLORS, InputColor } from '../input/input.interfaces'
import {
  SelectOption,
  SelectBlurDetail,
  SelectKeyPressDetail,
  SelectFocusDetail,
  SelectClickDetail,
  SelectInputDetail,
  SelectChangeDetail,
} from './select.interfaces'

/**
 * Select renders a select dropdown with validation and optional help/error messaging.
 *
 * @slot - The select field content and surrounding elements.
 * @part select - The native HTML select element.
 * @part prefix - The prefix wrapper (if used).
 * @part suffix - The suffix wrapper (if used).
 */
@Component({
  tag: 'ds-select',
  styleUrl: 'select.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Select implements DsComponentInterface, FieldInterface, FormControlInterface<string | null> {
  inputId = `ds-select-${SelectIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private control = new FormControl(this)

  log!: LogInstance
  @Logger('select')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement
  @AttachInternals() internals!: ElementInternals

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() slottedOptions: SelectOption[] = []

  private slotElement: HTMLSlotElement | undefined

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

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
   * Defines the color state of the select.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...INPUT_COLORS)
  readonly color: InputColor = 'primary'

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
   * The description displayed below the select field.
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
   * The label displayed above the select field.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly name: string = this.inputId

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
   * The value of the select.
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrType('string')
  value: string | null = null

  /**
   * The options for the select element.
   */
  @Prop()
  readonly options: SelectOption[] = []

  @Watch('options')
  optionsChanged() {
    this.validateCurrentValue()
  }

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<SelectBlurDetail>

  /**
   * Emitted when the select value has changed.
   */
  @Event() dsChange!: EventEmitter<SelectChangeDetail>

  /**
   * Emitted when the select has been clicked.
   */
  @Event() dsClick!: EventEmitter<SelectClickDetail>

  /**
   * Emitted when the select has focus.
   */
  @Event() dsFocus!: EventEmitter<SelectFocusDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsInput!: EventEmitter<SelectInputDetail>

  /**
   * Emitted when a keyboard key has been pressed.
   */
  @Event() dsKeyPress!: EventEmitter<SelectKeyPressDetail>

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
    this.extractSlottedOptions()
  }

  componentWillUpdate() {
    setupValidation(this)
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

  private handleSlotChange = async () => {
    await this.extractSlottedOptions()
    this.validateCurrentValue()
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private async extractSlottedOptions() {
    if (!this.slotElement) return

    const slottedElements = this.slotElement.assignedElements({ flatten: true })
    const options: SelectOption[] = slottedElements
      .filter(el => el.tagName.toLowerCase() === 'ds-select-option')
      .map(el => {
        const value = el.getAttribute('value') || ''
        const label = el.textContent || ''
        return { value, label }
      })

    this.slottedOptions = options
  }

  private validateCurrentValue() {
    if (!this.value) return

    const availableOptions = this.getAvailableOptions()
    const valueExists = availableOptions.some(opt => opt.value === this.value)

    if (!valueExists) {
      this.value = null
    }
  }

  private getAvailableOptions(): SelectOption[] {
    // Prop takes precedence over slot
    return this.options.length > 0 ? this.options : this.slottedOptions
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets focus on the native `select` element.
   */
  @Method()
  async setFocus() {
    return this.control.setFocus()
  }

  /**
   * Sets blur on the native `select` element.
   * @internal
   */
  @Method()
  async setBlur() {
    return this.control.setBlur()
  }

  /**
   * Returns the native `<select>` element used under the hood.
   */
  @Method()
  async getInputElement(): Promise<HTMLSelectElement> {
    return this.control.nativeEl as unknown as HTMLSelectElement
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

  private handleInput = (ev: Event) => {
    this.control.onInput(ev as InputEvent)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const availableOptions = this.getAvailableOptions()
    return (
      <Field
        inputId={'select'}
        disabled={this.disabled}
        color={this.color}
        invalid={this.invalid}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
      >
        <slot
          ref={el => {
            if (el) {
              this.slotElement = el
            }
          }}
          onSlotchange={this.handleSlotChange}
        ></slot>
        <select
          id="select"
          part="select"
          name={this.name}
          ref={el => {
            if (el) {
              this.control.nativeEl = el as unknown as HTMLInputElement | HTMLTextAreaElement | undefined
            }
          }}
          aria-describedby="description"
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          disabled={this.disabled}
          autofocus={this.autofocus}
          required={this.required}
          onClick={ev => this.handleClick(ev)}
          onFocus={ev => this.handleFocus(ev)}
          onBlur={ev => this.handleBlur(ev)}
          onChange={ev => {
            const value = (ev.target as HTMLSelectElement).value
            this.control.setValue(value)
            this.handleInput(ev as unknown as Event)
          }}
          onKeyPress={ev => this.dsKeyPress.emit(ev as KeyboardEvent)}
          {...this.inheritedAttributes}
        >
          {availableOptions.map(option => (
            <option key={option.value} value={option.value} selected={this.value === option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>
    )
  }
}

let SelectIds = 0
