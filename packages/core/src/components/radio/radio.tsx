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

  @Element() el!: HTMLStencilElement

  log!: LogInstance
  @Logger('radio')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @AttachInternals() internals!: ElementInternals

  @State() focused = false
  @State() wasFocused = false
  @State() buttonTabindex?: number

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() readonly name: string = this.inputId

  /**
   * Label of the radio item.
   */
  @Prop() readonly label = ''

  /**
   * Defines the position of the label, either before or after the radio input. Default is after.
   */
  @Prop() readonly labelPosition: RadioLabelPosition = 'right'

  /**
   * A DOMString representing the value of the checkbox. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the checkbox's name.
   */
  @Prop() value?: any | null

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true }) checked = false
  private initialValue = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() readonly disabled: boolean = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly readonly: boolean = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() readonly required: boolean = false

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) readonly autoInvalidOff: boolean = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() readonly invalid: boolean = false

  /**
   * Defines the layout of the input
   */
  @Prop() readonly tile: boolean = false

  /**
   * Defines the color of the tile radio.
   */
  @Prop() readonly tileColor?: RadioTileColor

  /**
   * @internal
   */
  @Prop() readonly cols: RadioGroupColumns = 1

  /**
   * @internal
   */
  @Prop() readonly colsTablet: RadioGroupColumns = 1

  /**
   * @internal
   */
  @Prop() readonly colsMobile: RadioGroupColumns = 1

  /**
   * Emitted when the toggle has focus.
   */
  @Event() dsFocus!: EventEmitter<RadioFocusDetail>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() dsBlur!: EventEmitter<RadioBlurDetail>

  /**
   * Emitted when the value property has changed.
   */
  @Event() dsChange!: EventEmitter<RadioChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
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

  disconnectedCallback() {
    if (this.group) {
      this.group.removeEventListener('dsChange', this.updateState)
    }

    this.el.removeEventListener('keydown', this.handleKeydown)
    this.el.removeEventListener('touchstart', this.handlePointerDown)
    this.el.removeEventListener('mousedown', this.handlePointerDown)
  }

  /**
   * LISTENERS
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
   * GETTERS
   * ------------------------------------------------------
   */

  private get group(): HTMLDsRadioGroupElement | null {
    return this.el.closest('ds-radio-group')
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

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
