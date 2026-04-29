import { AttachInternals, Component, Element, Event, EventEmitter, h, Listen, Method, Prop, State } from '@stencil/core'
import { Logger, type LogInstance, stopEventBubbling, isDescendant, ListenToResize } from '@utils'
import { Field, FieldInterface } from '../../input/field.util'
import { DsComponentInterface, defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { SegmentItemInterface } from '../segment-item.type'
import { SegmentColor, SegmentBlurDetail, SegmentFocusDetail, SegmentChangeDetail } from '../segment-item.interfaces'
import { HTMLStencilElement } from '@stencil/core/internal'

@Component({
  tag: 'ds-segment',
  styleUrl: 'segment.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Segment implements DsComponentInterface, Omit<FieldInterface, 'color'> {
  private initialValue?: any | null
  inputId = `ds-sg-${segmentIds++}`

  @Element() el!: HTMLStencilElement

  log!: LogInstance
  @Logger('segment')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() items: SegmentItemInterface[] = []
  @State() autoVertical = false

  @AttachInternals() internals!: ElementInternals

  private resizeObserver?: ResizeObserver
  // Natural (horizontal) offsetWidth of #group, stored just before going auto-vertical.
  // Used to decide when there is enough room to go back to horizontal layout.
  private lastNaturalWidth = 0

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
  @Prop() readonly label: string = ''

  /**
   * The description of the input, which is displayed below the input field.
   */
  @Prop() readonly description: string = ''

  /**
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop() readonly color: SegmentColor = ''

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
  @Prop() readonly invalidText: string = ''

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
   * If `true`, segment items expand to fill the available width equally.
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
   * If `true`, the segment only shows icons without labels.
   */
  @Prop() readonly iconOnly: boolean = false

  /**
   * The value of the segment group.
   */
  @Prop({ mutable: true }) value?: any | null

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<SegmentBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() dsFocus!: EventEmitter<SegmentFocusDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() dsChange!: EventEmitter<SegmentChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.initialValue = this.value
    this.internals.setFormValue(this.value)
    this.resizeObserver = new ResizeObserver(() => {
      this.updateLayout()
      this.updatePill()
    })
    this.resizeObserver.observe(this.el)
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect()
  }

  componentDidLoad() {
    this.handleSlotChange()
  }

  componentDidRender() {
    this.updatePill()
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
   * @internal define config for the component
   */
  @Method()
  @ListenToResize()
  async listenToResize(): Promise<void> {
    this.updateLayout()
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
          icon: item.icon,
          svg: item.svg,
        }
      })
      this.updateLayout()
    }
  }

  private updatePill = () => {
    const group = this.el.shadowRoot?.querySelector<HTMLDivElement>('#group')
    const pill = this.el.shadowRoot?.querySelector<HTMLDivElement>('#pill')
    if (!group || !pill) return

    const selectedLabel = group.querySelector<HTMLLabelElement>('label:has(input:checked)')
    if (!selectedLabel) {
      pill.style.display = 'none'
      return
    }

    pill.style.display = 'block'
    pill.style.left = `${selectedLabel.offsetLeft}px`
    pill.style.top = `${selectedLabel.offsetTop}px`
    pill.style.width = `${selectedLabel.offsetWidth}px`
    pill.style.height = `${selectedLabel.offsetHeight}px`
  }

  // Checks whether items overflow the available host width and switches between
  // horizontal (default) and vertical layout automatically.
  // Manual `vertical` and `wide` props always take precedence.
  private updateLayout = () => {
    if (this.vertical || this.wide) {
      if (this.autoVertical) this.autoVertical = false
      return
    }

    const group = this.el.shadowRoot?.querySelector<HTMLDivElement>('#group')
    if (!group) return

    if (this.autoVertical) {
      // Go back to horizontal once there is enough room again.
      if (this.el.clientWidth >= this.lastNaturalWidth) {
        this.autoVertical = false
      }
    } else {
      // Store the natural (horizontal) width before potentially going vertical
      // so we have a threshold to compare against when the viewport widens.
      this.lastNaturalWidth = group.offsetWidth
      if (group.offsetWidth > this.el.clientWidth) {
        this.autoVertical = true
      }
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
          'is-auto-vertical': this.autoVertical,
        }}
        onSlotChange={this.handleSlotChange}
      >
        <div id="group">
          <div id="pill"></div>
          {this.items.map(item => (
            <label
              key={item.value}
              class={{
                'is-selected': item.value === this.value,
              }}
              aria-checked={item.value === this.value}
              aria-invalid={this.invalid ? 'true' : null}
              aria-disabled={this.disabled ? 'true' : null}
              {...(this.iconOnly
                ? {
                    'aria-label': `${item.label}${item.description ? `- ${item.description}` : ''}`,
                    'title': `${item.label}${item.description ? `- ${item.description}` : ''}`,
                  }
                : {})}
            >
              <input
                type="radio"
                name={this.name}
                disabled={this.disabled}
                readOnly={this.readonly}
                value={item.value}
                checked={item.value === this.value}
                onClick={ev => this.handleInputClick(ev, item.value)}
                onChange={() => this.handleInputChange(item.value)}
                aria-invalid={this.invalid ? 'true' : null}
              />
              {item.icon && <ds-icon name={item.icon}></ds-icon>}
              {item.svg && <ds-icon svg={item.svg}></ds-icon>}
              {!this.iconOnly && (
                <span id="content">
                  <span class="label">{item.label}</span>
                  {item.description && <span class="description">{item.description}</span>}
                </span>
              )}
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
