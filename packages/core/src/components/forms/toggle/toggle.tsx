import { AttachInternals, Component, Element, Event, EventEmitter, h, Listen, Prop, State } from '@stencil/core'
import {
  Logger,
  type LogInstance,
  inheritAttributes,
  type Attributes,
  OneOf,
  setFormValue,
  Type,
  watchInvalidTextSlot,
} from '@utils'
import { Field } from '../input/field.util'
import { DsComponentInterface, defaultConfig } from '@global'
import {
  ToggleLabelPosition,
  TOGGLE_LABEL_POSITIONS,
  ToggleFocusDetail,
  ToggleBlurDetail,
  ToggleChangeDetail,
} from './toggle.interfaces'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Toggle renders a switch-like form control for toggling between on/off states with optional label and help text.
 *
 * @slot - The toggle label content.
 * @slot helper - The helper or hint text below the toggle.
 * @slot invalid-text - Overrides the `invalidText` prop with custom markup, shown instead of the description when `invalid` is `true`.
 * @part label - The label element wrapping the toggle.
 * @part input - The native HTML checkbox input element.
 * @part slot - The content slot wrapper.
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
  private initialValue = false
  private disconnectInvalidTextSlotWatcher?: () => void

  log!: LogInstance
  @Logger('toggle')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement
  @AttachInternals() internals!: ElementInternals

  @State() focused = false
  @State() hasInvalidTextSlotContent = false

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * If `true`, disables the automatic `invalid`/`invalidText` behavior that the `@baloise/ds-angular` integration
   * applies when the bound `NgControl` is touched and invalid. Only affects the Angular integration; it is a no-op
   * in other framework integrations.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly autoInvalidOff: boolean = false

  /**
   * If `true`, the toggle is selected.
   */
  @Prop({ mutable: true, reflect: true })
  @Type('boolean')
  checked: boolean = false

  /**
   * If `true`, the toggle is dense and has less size.
   */
  @Prop()
  @Type('boolean')
  readonly dense: boolean = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * The text to display when the toggle is in an invalid state.
   */
  @Prop()
  @Type('string')
  readonly invalidText: string = ''

  /**
   * Label of the toggle item.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * Defines the position of the label, either before or after the toggle input. Default is after.
   */
  @Prop()
  @OneOf(TOGGLE_LABEL_POSITIONS)
  readonly labelPosition: ToggleLabelPosition = 'right'

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly name: string = this.inputId

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly readonly: boolean = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly required: boolean = false

  /**
   * A DOMString representing the value of the toggle. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the toggle's name.
   */
  @Prop()
  @Type('string')
  readonly value: string | number = 'on'

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() dsBlur!: EventEmitter<ToggleBlurDetail>

  /**
   * Emitted when the value property has changed.
   */
  @Event() dsChange!: EventEmitter<ToggleChangeDetail>

  /**
   * Emitted when the toggle has focus.
   */
  @Event() dsFocus!: EventEmitter<ToggleFocusDetail>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback(): void {
    this.initialValue = this.checked
    setFormValue(this.internals, this.checked ? (this.value as string) : null)
    this.disconnectInvalidTextSlotWatcher = watchInvalidTextSlot(this.el, hasContent => {
      this.hasInvalidTextSlotContent = hasContent
    })
  }

  disconnectedCallback(): void {
    this.disconnectInvalidTextSlotWatcher?.()
  }

  componentWillLoad() {
    setFormValue(this.internals, this.checked ? (this.value as string) : null)
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

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) return
    this.focused = false
    this.dsBlur.emit(ev)
  }

  private handleChange = (ev: Event): void => {
    this.checked = (ev.target as HTMLInputElement).checked
    this.dsChange.emit(this.checked)
    setFormValue(this.internals, this.checked ? (this.value as string) : null)
  }

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled || this.readonly) return
    this.focused = true
    this.dsFocus.emit(ev)
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const isInvalid = this.invalid || this.hasInvalidTextSlotContent

    return (
      <Field
        role="field"
        disabled={this.disabled}
        color="primary"
        invalid={isInvalid}
        label=""
        description=""
        invalidText={this.invalidText}
        required={this.required}
        language={defaultConfig.language}
        cssClasses={{
          'is-disabled': this.disabled || this.readonly,
          'is-invalid': isInvalid,
          'is-checked': this.checked,
          'is-dense': this.dense,
          'has-label-left': this.labelPosition === 'left',
          'has-label-top': this.labelPosition === 'top',
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
            aria-describedby={isInvalid ? 'description' : undefined}
            aria-invalid={isInvalid ? 'true' : 'false'}
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
      </Field>
    )
  }
}

let toggleIds = 0
