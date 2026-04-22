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
  Watch,
} from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { Field, FieldInterface } from '../../input/field.util'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '../../../utils/config'
import { stopEventBubbling } from '../../../utils/form-control'
import { hasTagName, isDescendant } from '../../../utils/helpers'

@Component({
  tag: 'ds-segment',
  styleUrl: 'segment.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Segment implements ComponentInterface, Loggable, FieldInterface {
  private initialValue?: any | null
  private inputId = `ds-sg-${segmentIds++}`

  @Element() el!: HTMLDsSegmentElement

  log!: LogInstance
  @Logger('segment')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

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
   * Defines the position of the label, either before or after the segment item input. Default is after.
   */
  @Prop() readonly labelPosition: DS.SegmentItemLabelPosition = 'right'

  /**
   * The description of the input, which is displayed below the input field.
   */
  @Prop() readonly description?: string

  /**
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop() readonly color: DS.InputColor = 'primary'

  /**
   * Shows a loading indicator at the end of the input and replaces the end slot content.
   */
  @Prop() readonly loading = false

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
  @Prop() readonly required = true

  /**
   * Displays the segment items vertically
   */
  @Prop() readonly vertical = false

  /**
   * If `true`, the segment items can be deselected.
   */
  @Prop() readonly allowEmptySelection = false

  /**
   * The value of the segment group.
   */
  @Prop({ mutable: true }) value?: any | null

  @Watch('value')
  valueChanged() {
    this.handleValueChange()
  }

  /**
   * Defines the layout of the input
   */
  @Prop() readonly tile = false

  /**
   * Defines the color of the tile segment item.
   */
  @Prop() readonly tileColor?: DS.SegmentItemTileColor

  /**
   * Defines the column size like the grid.
   */
  @Prop() readonly cols: DS.SegmentGroupColumns = 1

  /**
   * Defines the column size for tablet and bigger like the grid.
   */
  @Prop() readonly colsTablet: DS.SegmentGroupColumns = 1

  /**
   * Defines the column size for mobile and bigger like the grid.
   */
  @Prop() readonly colsMobile: DS.SegmentGroupColumns = 1

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
    this.passDownAttributes()
  }

  componentWillUpdate() {
    this.passDownAttributes()
  }

  componentWillLoad() {
    this.handleValueChange()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('dsChange', { capture: true, target: 'document' })
  listenToDsChange(ev: UIEvent) {
    if (isDescendant(this.el, ev.target as HTMLElement)) {
      stopEventBubbling(ev)
    }
  }

  @Listen('dsFocus', { capture: true, target: 'document' })
  listenToDsFocus(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'ds-segment-item')) {
      stopEventBubbling(ev)
    }
  }

  @Listen('dsBlur', { capture: true, target: 'document' })
  listenToDsBlur(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'ds-segment-item')) {
      stopEventBubbling(ev)
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = this.initialValue
    }
  }

  @Listen('keydown', { target: 'document' })
  listenToKeydown(ev: any) {
    if (ev.target && !this.el.contains(ev.target)) {
      return
    }

    // Get all segment items inside the segment and then
    // filter out disabled items since we need to skip those
    const items = this.getSegmentItems().filter(item => !item.disabled)
    const targetItem = ev.target.closest('ds-segment-item')

    // Only move the item if the current focus is in the segment
    if (targetItem && items.includes(targetItem)) {
      const index = items.findIndex(item => item === targetItem)
      const current = items[index]

      let next

      // If hitting arrow down or arrow right, move to the next item
      // If we're on the last item, move to the first item
      if (['ArrowDown', 'ArrowRight'].includes(ev.code)) {
        next = index === items.length - 1 ? items[0] : items[index + 1]
      }

      // If hitting arrow up or arrow left, move to the previous item
      // If we're on the first item, move to the last item
      if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
        next = index === 0 ? items[items.length - 1] : items[index - 1]
      }

      if (next && items.includes(next)) {
        next.setFocus()

        this.value = next.value
        this.dsChange.emit(this.value)
        this.internals.setFormValue(this.value)
      }

      // Update the segment value when a user presses the
      // space bar on top of a selected item
      if (['Space'].includes(ev.code)) {
        this.value = this.allowEmptySelection && this.value !== undefined ? undefined : current.value
        this.dsChange.emit(this.value)
        this.internals.setFormValue(this.value)

        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault()
      }
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

  private passDownAttributes() {
    this.getSegmentItems().forEach(item => {
      if (this.disabled !== undefined) {
        item.disabled = this.disabled
      }
      if (this.readonly !== undefined) {
        item.readonly = this.readonly
      }
      if (this.invalid !== undefined) {
        item.invalid = this.invalid
      }
    })
  }

  private setSegmentItemChecked() {
    this.getSegmentItems().forEach((item: HTMLDsSegmentItemElement) => {
      if (item.updateState) {
        item.updateState()
      }
    })
  }

  private setSegmentItemTabindex(value: any) {
    const items = this.getSegmentItems()

    // Get the first item that is not disabled and the checked one
    const first = items.find(item => !item.disabled)
    const checked = items.find(item => item.value === value && !item.disabled)

    if (!first && !checked) {
      return
    }

    // If an enabled checked item exists, set it to be the focusable item
    // otherwise we default to focus the first item
    const focusable = checked || first

    for (const item of items) {
      const tabindex = item === focusable ? 0 : -1
      item.setButtonTabindex(tabindex)
    }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private getSegmentItems(): HTMLDsSegmentItemElement[] {
    return Array.from(this.el.querySelectorAll('ds-segment-item'))
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleValueChange = async () => {
    this.setSegmentItemTabindex(this.value)
    this.setSegmentItemChecked()
  }

  private handleClick = (ev: Event) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    ev.preventDefault()

    const selectedItem = ev.target && (ev.target as HTMLElement).closest('ds-segment-item')
    if (selectedItem && !selectedItem.disabled && !selectedItem.readonly) {
      const currentValue = this.value
      const newValue = selectedItem.value
      if (newValue !== currentValue) {
        this.value = newValue
      } else if (this.allowEmptySelection) {
        this.value = undefined
      }
      this.dsChange.emit(this.value)
      this.internals.setFormValue(this.value)
    }
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
        color={this.color}
        invalid={this.invalid}
        loading={this.loading}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
        cssClasses={{
          'is-vertical': this.vertical,
          'is-tile': this.tile,
        }}
        onClick={this.handleClick}
      >
        <slot></slot>
      </Field>
    )
  }
}

let segmentIds = 0
