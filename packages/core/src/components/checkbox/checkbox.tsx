import { AttachInternals, Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State } from '@stencil/core'
import { Logger, type LogInstance, inheritAttributes, type Attributes, hasValue, OneOf, Required, Type } from '@utils'
import {
  CheckboxLabelPosition,
  CheckboxTileColor,
  CheckboxGroupColumns,
  CheckboxFocusDetail,
  CheckboxBlurDetail,
  CheckboxChangeDetail,
  CHECKBOX_LABEL_POSITIONS,
  CHECKBOX_TILE_COLORS,
  CHECKBOX_GROUP_COLUMNS,
} from './checkbox.interfaces'
import { DsComponentInterface } from '@global'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Checkbox renders a checkbox form control for selecting multiple options from a group with optional label and help text.
 *
 * @slot - The checkbox label content.
 * @slot hint - A `ds-hint` shown alongside the label. In tile layout it is positioned in the top right corner.
 * @part label - The label wrapper element.
 * @part input - The native HTML input element.
 * @part slot - The content slot wrapper.
 * @part hint - The hint slot wrapper.
 */
@Component({
  tag: 'ds-checkbox',
  styleUrl: 'checkbox.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Checkbox implements DsComponentInterface {
  inputId = `ds-cb-${checkboxIds++}`
  private inheritAttributes: Attributes = {}
  private nativeInput?: HTMLInputElement

  @Element() el!: HTMLStencilElement

  log!: LogInstance
  @Logger('checkbox')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @AttachInternals() internals!: ElementInternals

  @State() focused = false

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly name: string = this.inputId

  /**
   * Label of the radio item.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * Defines the position of the label, either before or after the radio input. Default is after.
   */
  @Prop()
  @Required()
  @OneOf(CHECKBOX_LABEL_POSITIONS)
  readonly labelPosition: CheckboxLabelPosition = 'right'

  /**
   * A DOMString representing the value of the checkbox. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the checkbox's name.
   */
  @Prop()
  @Type('string')
  readonly value: string | number = 'on'

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true })
  @Type('boolean')
  checked: boolean = false
  private initialValue = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop()
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop()
  @Type('boolean')
  readonly readonly: boolean = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  @Type('boolean')
  readonly required: boolean = false

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly autoInvalidOff: boolean = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop()
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * Defines the color of the tile checkbox.
   */
  @Prop()
  @OneOf(CHECKBOX_TILE_COLORS)
  readonly tileColor?: CheckboxTileColor

  /**
   * Defines the layout of the input
   */
  @Prop()
  @Type('boolean')
  readonly tile: boolean = false

  /**
   * If `true` and `tile` is set, the checkbox box is visually hidden. The tile remains fully clickable and keyboard-accessible.
   */
  @Prop()
  @Type('boolean')
  readonly hideTrigger: boolean = false

  /**
   * @internal
   */
  @Prop()
  @OneOf(CHECKBOX_GROUP_COLUMNS)
  readonly cols: CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop()
  @OneOf(CHECKBOX_GROUP_COLUMNS)
  readonly colsTablet: CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop()
  @OneOf(CHECKBOX_GROUP_COLUMNS)
  readonly colsMobile: CheckboxGroupColumns = 1

  /**
   * Emitted when the toggle has focus.
   */
  @Event() dsFocus!: EventEmitter<CheckboxFocusDetail>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() dsBlur!: EventEmitter<CheckboxBlurDetail>

  /**
   * Emitted when the value property has changed.
   */
  @Event() dsChange!: EventEmitter<CheckboxChangeDetail>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
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
   * PUBLIC LISTENERS
   * ─────────────────────────────────────────────────────
   */

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.checked = this.initialValue
    }
  }

  /**
   * EVENT HANDLERS
   * ─────────────────────────────────────────────────────
   */

  private handleChange = (ev: Event) => {
    this.checked = (ev.target as HTMLInputElement).checked
    this.dsChange.emit(this.checked)
    this.internals.setFormValue(this.checked ? (this.value as string) : null)
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled || this.readonly) {
      return
    }

    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    // A click on the native input itself already toggles it and fires `change`, which
    // `handleChange` handles. Only intervene for clicks on slotted content. `ev.target` is
    // retargeted to the host across the shadow boundary, so check the composed path instead.
    if (ev.composedPath()[0] === this.nativeInput) {
      return
    }

    // Prevent the native `<label>` default action, which fails to forward the click to the
    // input when the slotted content contains its own nested `<label>` element (e.g. `ds-label`).
    ev.preventDefault()

    // Clicking the hint should open/close its panel without toggling the checkbox.
    if ((ev.target as HTMLElement).closest?.('[slot="hint"]')) {
      return
    }

    this.nativeInput?.focus()
    this.checked = !this.checked
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
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  private hasHint(): boolean {
    return this.el.querySelector('[slot="hint"]') !== null
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
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
          [`has-tile-${this.tileColor}`]: this.tile && hasValue(this.tileColor),
          'hide-trigger': this.tile && this.hideTrigger,
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
            <slot>{this.label}</slot>
          </div>
          {this.hasHint() && (
            <div id="hint" part="hint">
              <slot name="hint"></slot>
            </div>
          )}
        </label>
      </Host>
    )
  }
}

let checkboxIds = 0
