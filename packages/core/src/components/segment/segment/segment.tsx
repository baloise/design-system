import {
  AttachInternals,
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
} from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { Field, FieldInterface } from '../../input/field.util'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '../../../utils/config'
import { stopEventBubbling } from '../../../utils/form-control'
import { isDescendant } from '../../../utils/helpers'
import { SegmentItemInterface } from '../segment-item.type'

@Component({
  tag: 'ds-segment',
  styleUrl: 'segment.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Segment implements ComponentInterface, Loggable, Omit<FieldInterface, 'color'> {
  private initialValue?: any | null
  inputId = `ds-sg-${segmentIds++}`

  @Element() el!: HTMLDsSegmentElement

  log!: LogInstance
  @Logger('segment')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() items: SegmentItemInterface[] = []

  @AttachInternals() internals!: ElementInternals

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The name of the segment items in the group. Child items will inherit the name.
   */
  @Prop() readonly name: string = this.inputId

  /**
   * The label of the input, which is displayed above the input field.
   */
  @Prop() readonly label?: string

  /**
   * The description of the input, which is displayed below the input field.
   */
  @Prop() readonly description?: string

  /**
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop() readonly color: DS.SegmentColor = ''

  /**
   * Shows a loading indicator at the end of the input and replaces the end slot content.
   */
  @Prop() readonly loading: boolean = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() readonly invalid: boolean | undefined

  /**
   * The text to display when the input is in an invalid state.
   */
  @Prop() readonly invalidText?: string

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() readonly disabled: boolean | undefined

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly readonly: boolean | undefined

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() readonly required: boolean = true

  /**
   * Displays the segment items over the full width.
   */
  @Prop() readonly wide: boolean = false

  /**
   * Displays the segment items vertically
   */
  @Prop() readonly vertical: boolean = false

  /**
   * Displays the segment items vertically on mobile
   */
  @Prop() readonly verticalOnMobile: boolean = false

  /**
   * If `true`, the segment items can be deselected.
   */
  @Prop() readonly allowEmptySelection: boolean = false

  /**
   * The value of the segment group.
   */
  @Prop({ mutable: true }) value?: any | null

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<DS.SegmentBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() dsFocus!: EventEmitter<DS.SegmentFocusDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() dsChange!: EventEmitter<DS.SegmentChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.initialValue = this.value
    this.internals.setFormValue(this.value)
  }

  componentDidLoad() {
    this.handleSlotChange()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('dsWillUpdate', { capture: true, target: 'document' })
  listenToDsWillUpdate(ev: UIEvent) {
    if (isDescendant(this.el, ev.target as HTMLElement)) {
      stopEventBubbling(ev)
      this.handleSlotChange()
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = this.initialValue
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /** @internal */
  @Method()
  async setValue(value: number | string | boolean) {
    this.value = value
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
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private readItemsFromSlot() {
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])')

    if (slot) {
      const assignedElements = slot?.assignedElements({ flatten: true }) || []
      const segmentItems = assignedElements.filter(el => el.tagName.toLowerCase() === 'ds-segment-item')

      this.items = segmentItems.map(el => {
        const item = el as HTMLDsSegmentItemElement
        return {
          label: item.label,
          value: item.value,
          description: item.description,
        }
      })
    }
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleInputChange = (itemValue: any) => {
    if (this.disabled || this.readonly) return
    this.value = itemValue
    this.dsChange.emit(this.value)
    this.internals.setFormValue(this.value)
  }

  // Native radio never fires "change" when clicking an already-checked item,
  // so onClick is the only hook for deselection.
  private handleInputClick = (ev: MouseEvent, itemValue: any) => {
    if (!this.allowEmptySelection || this.disabled || this.readonly) return
    if (this.value === itemValue) {
      ev.preventDefault()
      this.value = undefined
      this.dsChange.emit(this.value)
      this.internals.setFormValue(null)
    }
  }

  private handleSlotChange = () => {
    this.readItemsFromSlot()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Field
        role="fieldset"
        disabled={this.disabled}
        color={'primary'}
        invalid={this.invalid}
        loading={this.loading}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
        cssClasses={{
          'is-wide': this.wide,
          'is-vertical': this.vertical,
          'is-vertical-on-mobile': this.verticalOnMobile,
        }}
        onSlotChange={this.handleSlotChange}
      >
        <div id="group">
          {this.items.map(item => (
            <label key={item.value}>
              <input
                type="radio"
                name={this.name}
                disabled={this.disabled}
                readOnly={this.readonly}
                value={item.value}
                checked={item.value === this.value}
                onClick={ev => this.handleInputClick(ev, item.value)}
                onChange={() => this.handleInputChange(item.value)}
              />
              <span class="label">{item.label}</span>
              <span class="description">{item.description}</span>
            </label>
          ))}
        </div>
        <div>
          <slot onSlotchange={() => this.handleSlotChange()}></slot>
        </div>
      </Field>
    )
  }
}

let segmentIds = 0
