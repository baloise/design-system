import { AttachInternals, Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State } from '@stencil/core'
import { Logger, type LogInstance, inheritAttributes, type Attributes } from '@utils'
import { DsComponentInterface } from '@global'
import { CheckboxLabelPosition, CheckboxGroupColumns } from '../checkbox/checkbox.interfaces'
import { ToggleTileColor, ToggleFocusDetail, ToggleBlurDetail, ToggleChangeDetail } from './toggle.interfaces'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Toggle renders a switch-like form control for toggling between on/off states with optional label and help text.
 *
 * @slot - The toggle label content.
 * @slot helper - The helper or hint text below the toggle.
 * @part toggle - The native HTML input element.
 * @part container - The toggle and label wrapper.
 */
@Component({
  tag: 'ds-toggle',
  styleUrl: 'toggle.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Toggle implements DsComponentInterface {
  inputId = `ds-tg-${toggleIds++}`
  private inheritAttributes: Attributes = {}
  private nativeInput?: HTMLInputElement

  @Element() el!: HTMLStencilElement

  log!: LogInstance
  @Logger('toggle')
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
  @Prop() readonly name: string = this.inputId

  /**
   * Label of the radio item.
   */
  @Prop() readonly label = ''

  /**
   * Defines the position of the label, either before or after the radio input. Default is after.
   */
  @Prop() readonly labelPosition: CheckboxLabelPosition = 'right'

  /**
   * A DOMString representing the value of the toggle. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the toggle's name.
   */
  @Prop() readonly value: string | number = 'on'

  /**
   * If `true`, the toggle is selected.
   */
  @Prop({ mutable: true }) checked = false
  private initialValue = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly readonly: boolean = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() readonly disabled: boolean = false

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
   * Defines the color of the tile toggle.
   */
  @Prop() readonly color?: ToggleTileColor

  /**
   * Defines the layout of the input
   */
  @Prop() readonly tile: boolean = false

  /**
   * @internal
   */
  @Prop() readonly cols: CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop() readonly colsTablet: CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop() readonly colsMobile: CheckboxGroupColumns = 1

  /**
   * Emitted when the toggle has focus.
   */
  @Event() dsFocus!: EventEmitter<ToggleFocusDetail>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() dsBlur!: EventEmitter<ToggleBlurDetail>

  /**
   * Emitted when the value property has changed.
   */
  @Event() dsChange!: EventEmitter<ToggleChangeDetail>

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

  private handleChange = (ev: Event): void => {
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

let toggleIds = 0
