import {
  AttachInternals,
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
} from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { Attributes, inheritAttributes } from '../../utils/attributes'

@Component({
  tag: 'ds-checkbox',
  styleUrl: 'checkbox.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Checkbox implements ComponentInterface, Loggable {
  private inputId = `ds-cb-${checkboxIds++}`
  private inheritAttributes: Attributes = {}
  nativeInput?: HTMLInputElement

  @Element() el!: HTMLDsCheckboxElement

  log!: LogInstance
  @Logger('checkbox')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @AttachInternals() internals!: ElementInternals

  @State() focused = false

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * Label of the radio item.
   */
  @Prop() label = ''

  /**
   * Defines the position of the label, either before or after the radio input. Default is after.
   */
  @Prop() labelPosition: DS.CheckboxLabelPosition = 'right'

  /**
   * A DOMString representing the value of the checkbox. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the checkbox's name.
   */
  @Prop() value: string | number = 'on'

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true }) checked = false
  private initialValue = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * Defines the color of the tile checkbox.
   */
  @Prop() tileColor?: DS.CheckboxTileColor

  /**
   * Defines the layout of the input
   */
  @Prop() tile = false

  /**
   * @internal
   */
  @Prop() cols: DS.CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop() colsTablet: DS.CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop() colsMobile: DS.CheckboxGroupColumns = 1

  /**
   * Emitted when the toggle has focus.
   */
  @Event() dsFocus!: EventEmitter<DS.CheckboxFocusDetail>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() dsBlur!: EventEmitter<DS.CheckboxBlurDetail>

  /**
   * Emitted when the value property has changed.
   */
  @Event() dsChange!: EventEmitter<DS.CheckboxChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.initialValue = this.checked
    this.internals.setFormValue(this.checked ? (this.value as string) : null)
  }

  componentWillLoad() {
    this.internals.setFormValue(this.checked ? (this.value as string) : null)
    this.inheritAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.checked = this.initialValue
    }
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleChange(ev: Event): void {
    this.checked = (ev.target as HTMLInputElement).checked
    this.dsChange.emit(this.checked)
    this.internals.setFormValue(this.checked ? (this.value as string) : null)
  }

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) return
    this.focused = true
    this.dsFocus.emit(ev)
  }

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) return
    this.focused = false
    this.dsBlur.emit(ev)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
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
      >
        <label id="label" part="label">
          <input
            type="checkbox"
            part="input"
            id={this.inputId}
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled || this.readonly}
            required={this.required}
            aria-invalid={this.invalid ? 'true' : null}
            onChange={ev => this.handleChange(ev)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            ref={inputEl => (this.nativeInput = inputEl)}
            {...this.inheritAttributes}
          />
          <div id="slot" part="slot">
            <slot></slot>
          </div>
        </label>
      </Host>
    )
  }
}

let checkboxIds = 0
