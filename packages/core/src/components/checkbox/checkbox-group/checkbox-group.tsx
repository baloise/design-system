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
import { DsComponentInterface } from '@global'
import { Field, FieldInterface } from '../../input/field.util'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import {
  Logger,
  LogInstance,
  hasTagName,
  isDescendant,
  stopEventBubbling,
  areArraysEqual,
  hasValue,
  OneOf,
  shallowReady,
  Type,
  watchInvalidTextSlot,
} from '@utils'
import { INPUT_COLORS, InputColor } from '../../input/input.interfaces'
import {
  CheckboxLabelPosition,
  CheckboxTileColor,
  CheckboxGroupColumns,
  CHECKBOX_LABEL_POSITIONS,
  CHECKBOX_TILE_COLORS,
  CHECKBOX_GROUP_COLUMNS,
  CheckboxGroupBlurDetail,
  CheckboxGroupFocusDetail,
  CheckboxGroupChangeDetail,
} from '../checkbox.interfaces'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Checkbox Group groups multiple checkboxes so multiple options can be selected within a form field.
 *
 * @slot - The checkbox items to display inside the group.
 * @slot invalid-text - Overrides the `invalidText` prop with custom markup, shown instead of the description when `invalid` is `true`.
 */
@Component({
  tag: 'ds-checkbox-group',
  styleUrl: 'checkbox-group.host.scss',
  shadow: true,
  formAssociated: true,
})
export class CheckboxGroup implements DsComponentInterface, FieldInterface {
  inputId = `ds-cg-${checkboxGroupIds++}`

  log!: LogInstance
  @Logger('checkbox-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement
  @AttachInternals() internals!: ElementInternals

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() private internalValue: any[] = []
  @State() hasInvalidTextSlotContent = false

  private disconnectInvalidTextSlotWatcher?: () => void

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
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop()
  @OneOf(INPUT_COLORS)
  readonly color: InputColor = 'primary'

  /**
   * Defines the column size like the grid.
   */
  @Prop()
  @OneOf(CHECKBOX_GROUP_COLUMNS)
  readonly cols: CheckboxGroupColumns = 1

  /**
   * Defines the column size for mobile and bigger like the grid.
   */
  @Prop()
  @OneOf(CHECKBOX_GROUP_COLUMNS)
  readonly colsMobile: CheckboxGroupColumns = 1

  /**
   * Defines the column size for tablet and bigger like the grid.
   */
  @Prop()
  @OneOf(CHECKBOX_GROUP_COLUMNS)
  readonly colsTablet: CheckboxGroupColumns = 1

  /**
   * If `true` it acts as the main form control
   */
  @Prop()
  @Type('boolean')
  readonly control: boolean = false

  /**
   * The description of the input, which is displayed below the input field.
   */
  @Prop()
  @Type('string')
  readonly description: string = ''

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
   * The text to display when the input is in an invalid state.
   */
  @Prop()
  @Type('string')
  readonly invalidText: string = ''

  /**
   * The label of the input, which is displayed above the input field.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * Defines the position of the label, either before or after the checkbox input. Default is after.
   */
  @Prop()
  @OneOf(CHECKBOX_LABEL_POSITIONS)
  readonly labelPosition: CheckboxLabelPosition = 'right'

  /**
   * Shows a loading indicator at the end of the input and replaces the end slot content.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly loading: boolean = false

  /**
   * The name of the checkboxes in the group. Child checkboxes will inherit the name.
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
  readonly required: boolean = true

  /**
   * Defines the layout of the input
   */
  @Prop()
  @Type('boolean')
  readonly tile: boolean = false

  /**
   * If `true` and `tile` is set, the checkbox box is visually hidden on every checkbox in the group.
   */
  @Prop()
  @Type('boolean')
  readonly hideTrigger: boolean = false

  /**
   * Defines the color of the tile checkbox.
   */
  @Prop()
  @OneOf(CHECKBOX_TILE_COLORS)
  readonly tileColor?: CheckboxTileColor

  /**
   * The value of the control.
   */
  @Prop() readonly value: any[] = []

  @Watch('value')
  valueChanged() {
    if (this.control) {
      const newFormattedValue = this.formatValueToArray(this.value)
      if (!areArraysEqual(newFormattedValue, this.internalValue)) {
        this.internalValue = newFormattedValue
        this.handleValueChange()
      }
    }
  }

  /**
   * Displays the checkboxes vertically
   */
  @Prop()
  @Type('boolean')
  readonly vertical: boolean = false

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<CheckboxGroupBlurDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() dsChange!: EventEmitter<CheckboxGroupChangeDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() dsFocus!: EventEmitter<CheckboxGroupFocusDetail>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback() {
    this.valueChanged()
    this.disconnectInvalidTextSlotWatcher = watchInvalidTextSlot(this.el, hasContent => {
      this.hasInvalidTextSlotContent = hasContent
    })
    this.passDownAttributes()
    this.internals.setFormValue(this.internalValue.join(','))
  }

  disconnectedCallback() {
    this.disconnectInvalidTextSlotWatcher?.()
  }

  componentWillLoad() {
    // Re-derives `internalValue` from the current `value` prop (rather than re-running `handleValueChange()`
    // against whatever `internalValue` already holds): a consumer that assigns `.value` as a JS property
    // right after inserting the element (e.g. Angular's `ControlValueAccessor.writeValue()`, called as soon
    // as the host connects) can land the assignment in the brief window between `connectedCallback()`'s own
    // `valueChanged()` call above and this component's `@Watch('value')` becoming live, so that assignment's
    // resulting checked-state sync would otherwise be silently lost. `valueChanged()` always reads `this.value`
    // directly rather than relying on the watch having fired, so it self-heals regardless of that race.
    this.valueChanged()
  }

  componentWillUpdate() {
    this.passDownAttributes()
  }

  componentDidLoad() {
    this.handleSlotChange()
  }

  /**
   * PUBLIC LISTENERS
   * ─────────────────────────────────────────────────────
   */

  @Listen('dsBlur', { capture: true, target: 'document' })
  listenToDsBlur(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'ds-checkbox')) {
      stopEventBubbling(ev)
      // Re-emit as the group's own `dsBlur`, mirroring `listenToDsChange`/`updateValues` re-emitting `dsChange`
      // above: consumers (and the `@baloise/ds-angular` `ControlValueAccessor`, which listens for `dsBlur`
      // directly on this host to mark the bound `NgControl` as touched) only ever interact with the group, not
      // its individual checkboxes, and the child event was just stopped from bubbling any further than this.
      this.dsBlur.emit(ev.detail)
    }
  }

  @Listen('dsChange', { capture: true, target: 'document' })
  listenToDsChange(ev: UIEvent) {
    if (this.control) {
      if (isDescendant(this.el, ev.target as HTMLElement)) {
        stopEventBubbling(ev)
        this.updateValues()
      }
    }
  }

  @Listen('dsFocus', { capture: true, target: 'document' })
  listenToDsFocus(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'ds-checkbox')) {
      stopEventBubbling(ev)
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      if (this.control) {
        this.internalValue = []
      }
      this.handleValueChange()
    }
  }

  /**
   * PUBLIC METHODS
   * ─────────────────────────────────────────────────────
   */

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
   * ─────────────────────────────────────────────────────
   */

  private handleValueChange = async () => {
    if (this.control) {
      const isChecked = (checkbox: HTMLDsCheckboxElement) => {
        for (let index = 0; index < this.internalValue.length; index++) {
          const valueItem = this.internalValue[index]
          if (valueItem !== undefined && valueItem.toString() === checkbox.value.toString()) {
            return true
          }
        }
        return false
      }

      const checkboxes = this.getCheckboxes()
      // A consumer that assigns `.value` as a JS property right after inserting the group (e.g. Angular's
      // `ControlValueAccessor.writeValue()`, called as soon as the host connects) can race a child
      // `ds-checkbox`'s own initialization: setting `.checked` on one that hasn't finished loading yet is
      // silently lost once that checkbox's own `componentWillLoad` applies its default. Awaiting each child's
      // readiness first (a no-op once already loaded, e.g. on a later user-driven value change) closes that gap.
      await Promise.all(checkboxes.map(checkbox => shallowReady(checkbox)))

      checkboxes.forEach((checkbox: HTMLDsCheckboxElement) => {
        checkbox.checked = isChecked(checkbox)
      })
    }
  }

  private handleSlotChange = () => {
    this.passDownAttributes()
    this.handleValueChange()
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  private formatValueToArray(value: any): any[] {
    if (Array.isArray(value)) {
      return value
    } else if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'string') {
        return value.split(',').map(item => item.trim())
      } else {
        return [value]
      }
    } else {
      return []
    }
  }

  private getCheckboxes(): HTMLDsCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('ds-checkbox'))
  }

  private passDownAttributes() {
    const isInvalid = this.invalid || this.hasInvalidTextSlotContent
    this.getCheckboxes().forEach(checkbox => {
      if (this.control) {
        if (hasValue(this.disabled)) {
          checkbox.disabled = this.disabled
        }
        if (hasValue(this.readonly)) {
          checkbox.readonly = this.readonly
        }
        checkbox.invalid = isInvalid
      }

      checkbox.name = this.name
      checkbox.labelPosition = this.labelPosition
      checkbox.tile = this.tile
      checkbox.hideTrigger = this.hideTrigger
      checkbox.tileColor = (checkbox.getAttribute('tile-color') as CheckboxTileColor) ?? this.tileColor
      checkbox.cols = this.cols
      checkbox.colsTablet = this.colsTablet
      checkbox.colsMobile = this.colsMobile
    })
  }

  private updateValues() {
    const newValue: any[] = []
    this.getCheckboxes().forEach(cb => {
      if (cb.checked) {
        newValue.push(cb.value)
      }
    })

    if (!areArraysEqual(this.internalValue, newValue)) {
      this.internalValue = [...newValue]
      this.dsChange.emit(this.internalValue)
      this.internals.setFormValue(this.internalValue.join(','))
    }
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    return (
      <Field
        role="fieldset"
        disabled={this.disabled}
        color={this.color}
        invalid={this.invalid || this.hasInvalidTextSlotContent}
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
      >
        <slot onSlotchange={this.handleSlotChange}></slot>
      </Field>
    )
  }
}

let checkboxGroupIds = 0
