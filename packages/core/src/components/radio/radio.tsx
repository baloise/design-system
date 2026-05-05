import {
  AttachInternals,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core'
import {
  Logger,
  type LogInstance,
  isSpaceKey,
  inheritAttributes,
  isDescendant,
  waitAfterIdleCallback,
  stopEventBubbling,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { FOCUS_KEYS } from '../app/app.focus.util'
import {
  RADIO_GROUP_COLUMNS,
  RADIO_TILE_COLORS,
  RADIO_LABEL_POSITIONS,
  type RadioGroupColumns,
  type RadioTileColor,
  type RadioLabelPosition,
  type RadioFocusDetail,
  type RadioBlurDetail,
  type RadioChangeDetail,
} from './radio.interfaces'
import { DsComponentInterface } from '@global'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Radio renders a radio button form control for selecting one option from a group with optional label and help text.
 *
 * @slot - The radio label content.
 * @slot helper - The helper or hint text below the radio.
 * @part label - The label wrapper element.
 * @part input - The native HTML input element.
 * @part slot - The content slot wrapper.
 */
@Component({
  tag: 'ds-radio',
  styleUrl: 'radio.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Radio implements DsComponentInterface {
  inputId = `ds-rb-${radioIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private keyboardMode = true
  private nativeInput?: HTMLInputElement

  log!: LogInstance

  @Logger('radio')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement
  @AttachInternals() internals!: ElementInternals

  @State() focused = false
  @State() wasFocused = false
  @State() buttonTabindex?: number

  private initialValue = false

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly autoInvalidOff: boolean = false

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrType('boolean')
  checked = false

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrOneOf(...RADIO_GROUP_COLUMNS)
  readonly cols: RadioGroupColumns = 1

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrOneOf(...RADIO_GROUP_COLUMNS)
  readonly colsMobile: RadioGroupColumns = 1

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrOneOf(...RADIO_GROUP_COLUMNS)
  readonly colsTablet: RadioGroupColumns = 1

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly invalid: boolean = false

  /**
   * Label of the radio item.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * Defines the position of the label, either before or after the radio input. Default is after.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...RADIO_LABEL_POSITIONS)
  readonly labelPosition: RadioLabelPosition = 'right'

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly name: string = this.inputId

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly readonly: boolean = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly required: boolean = false

  /**
   * Defines the layout of the input
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly tile: boolean = false

  /**
   * Defines the color of the tile radio.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...RADIO_TILE_COLORS)
  readonly tileColor?: RadioTileColor

  /**
   * A DOMString representing the value of the radio. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the radio's name.
   */
  @Prop({ mutable: true, reflect: true }) value?: any | null

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() dsBlur!: EventEmitter<RadioBlurDetail>

  /**
   * Emitted when the value property has changed.
   */
  @Event() dsChange!: EventEmitter<RadioChangeDetail>

  /**
   * Emitted when the toggle has focus.
   */
  @Event() dsFocus!: EventEmitter<RadioFocusDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
    if (this.value === undefined) {
      this.value = this.inputId
    }

    if (this.group) {
      this.updateState()
      this.group.addEventListener('dsChange', this.updateState)
    }

    this.el.addEventListener('keydown', this.handleKeydown)
    this.el.addEventListener('touchstart', this.handlePointerDown)
    this.el.addEventListener('mousedown', this.handlePointerDown)
  }

  componentWillLoad() {
    this.internals.setFormValue(this.checked ? (this.value as string) : null)
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  componentWillUpdate() {
    setupValidation(this)
  }

  disconnectedCallback() {
    if (this.group) {
      this.group.removeEventListener('dsChange', this.updateState)
    }

    this.el.removeEventListener('keydown', this.handleKeydown)
    this.el.removeEventListener('touchstart', this.handlePointerDown)
    this.el.removeEventListener('mousedown', this.handlePointerDown)
  }

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: UIEvent) {
    if (
      (this.disabled || this.readonly) &&
      ev.target &&
      (ev.target === this.el || isDescendant(this.el, ev.target as HTMLElement))
    ) {
      stopEventBubbling(ev)
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets the focus on the checkbox input element.
   */
  @Method()
  async setFocus() {
    await waitAfterIdleCallback()
    this.nativeInput?.focus()
  }

  /**
   * Sets blur on the native `input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    this.nativeInput?.blur()
  }

  /** @internal */
  @Method()
  async setButtonTabindex(value: number) {
    this.buttonTabindex = value
  }

  /**
   * @internal
   * Options of the tab like label, value etc.
   */
  @Method()
  async updateState() {
    if (this.group) {
      const newChecked = this.group.value === this.value
      if (newChecked !== this.checked) {
        this.checked = newChecked
      }
    }
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handlePointerDown = () => (this.keyboardMode = false)

  private handleKeydown = (ev: any) => {
    if (!isSpaceKey(ev)) {
      this.wasFocused = false
    }
    this.keyboardMode = FOCUS_KEYS.includes(ev.key)
  }

  private handleChange = (ev: Event): void => {
    this.checked = (ev.target as HTMLInputElement).checked
    this.dsChange.emit(this.checked)
    this.internals.setFormValue(this.checked ? (this.value as string) : null)
  }

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) return

    if (this.keyboardMode) {
      this.focused = true
      this.wasFocused = true
    }

    this.dsFocus.emit(ev)
  }

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) return
    this.focused = false
    this.dsBlur.emit(ev)
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled) {
      return
    }

    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    if (this.wasFocused) {
      this.focused = true
    }

    this.toggleChecked(ev)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private get group(): HTMLDsRadioGroupElement | null {
    return this.el.closest('ds-radio-group')
  }

  private setChecked = (state: boolean) => {
    this.checked = state
    this.dsChange.emit(this.checked)
  }

  private toggleChecked = (ev: Event) => {
    ev.preventDefault()

    this.setFocus()
    this.checked = true
    this.setChecked(this.checked)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const value = typeof this.value === 'boolean' ? JSON.stringify(this.value) : this.value
    const inputAttributes = this.inheritedAttributes
    if (this.buttonTabindex !== undefined) {
      inputAttributes['tabIndex'] = this.buttonTabindex
    }

    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        aria-checked={`${this.checked}`}
        aria-invalid={this.invalid ? 'true' : null}
        class={{
          'is-disabled': this.disabled || this.readonly,
          'is-invalid': this.invalid,
          'is-checked': this.checked,
          'is-tile': this.tile,
          [`has-tile-${this.tileColor}`]: this.tile && !!this.tileColor,
          'has-label-left': this.labelPosition === 'left',
          'has-label-top': this.labelPosition === 'top',
          [`has-cols-${this.cols}`]: this.tile && this.cols > 1,
          [`has-cols-${this.colsTablet}-tablet`]: this.tile && this.colsTablet > 1,
          [`has-cols-${this.colsMobile}-mobile`]: this.tile && this.colsMobile > 1,
        }}
        onClick={this.handleClick}
      >
        <label id="label" part="label">
          <input
            type="radio"
            part="input"
            id={this.inputId}
            name={this.name}
            value={value}
            tabindex={this.buttonTabindex}
            checked={this.checked}
            disabled={this.disabled || this.readonly}
            required={this.required}
            aria-invalid={this.invalid ? 'true' : null}
            onChange={ev => this.handleChange(ev)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            ref={inputEl => (this.nativeInput = inputEl)}
            {...inputAttributes}
          />
          <div id="slot" part="slot">
            <slot></slot>
          </div>
        </label>
      </Host>
    )
  }
}

let radioIds = 0
