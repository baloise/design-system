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
import { Field, FieldInterface } from '../../input/field.util'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import {
  Loggable,
  Logger,
  LogInstance,
  hasTagName,
  isDescendant,
  stopEventBubbling,
  areArraysEqual,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'

@Component({
  tag: 'ds-checkbox-group',
  styleUrl: 'checkbox-group.host.scss',
  shadow: true,
  formAssociated: true,
})
export class CheckboxGroup implements ComponentInterface, Loggable, FieldInterface {
  inputId = `ds-cg-${checkboxGroupIds++}`

  @Element() el!: HTMLDsCheckboxGroupElement

  log!: LogInstance
  @Logger('checkbox-group')
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
   * The name of the checkboxes in the group. Child checkboxes will inherit the name.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly name: string = this.inputId

  /**
   * If `true` it acts as the main form control
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly control: boolean = false

  /**
   * The value of the control.
   */
  @Prop() readonly value: any[] = []
  @State() private internalValue: any[] = []

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

  /**
   * The label of the input, which is displayed above the input field.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label?: string

  /**
   * Defines the position of the label, either before or after the checkbox input. Default is after.
   */
  @Prop()
  @ValidateEmptyOrOneOf('left', 'top', 'right')
  readonly labelPosition: DS.CheckboxLabelPosition = 'right'

  /**
   * The description of the input, which is displayed below the input field.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly description?: string

  /**
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly color: DS.InputColor = 'primary'

  /**
   * Shows a loading indicator at the end of the input and replaces the end slot content.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly loading: boolean = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly invalid: boolean | undefined

  /**
   * The text to display when the input is in an invalid state.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly invalidText?: string

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean | undefined

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly readonly: boolean | undefined

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly required: boolean = true

  /**
   * Displays the checkboxes vertically
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly vertical: boolean = false

  /**
   * Defines the layout of the input
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly tile: boolean = false

  /**
   * Defines the color of the tile checkbox.
   */
  @Prop()
  @ValidateEmptyOrOneOf('purple', 'green', 'yellow', 'red', '')
  readonly tileColor?: DS.CheckboxTileColor

  /**
   * Defines the column size like the grid.
   */
  @Prop()
  @ValidateEmptyOrOneOf(1, 2, 3, 4)
  readonly cols: DS.CheckboxGroupColumns = 1

  /**
   * Defines the column size for tablet and bigger like the grid.
   */
  @Prop()
  @ValidateEmptyOrOneOf(1, 2, 3, 4)
  readonly colsTablet: DS.CheckboxGroupColumns = 1

  /**
   * Defines the column size for mobile and bigger like the grid.
   */
  @Prop()
  @ValidateEmptyOrOneOf(1, 2, 3, 4)
  readonly colsMobile: DS.CheckboxGroupColumns = 1

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<DS.CheckboxGroupBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() dsFocus!: EventEmitter<DS.CheckboxGroupFocusDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() dsChange!: EventEmitter<DS.CheckboxGroupChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
    this.valueChanged()
    this.passDownAttributes()
    this.internals.setFormValue(this.internalValue.join(','))
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
    if (this.control) {
      if (isDescendant(this.el, ev.target as HTMLElement)) {
        stopEventBubbling(ev)
        this.updateValues()
      }
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

  @Listen('dsFocus', { capture: true, target: 'document' })
  listenToDsFocus(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'ds-checkbox')) {
      stopEventBubbling(ev)
    }
  }

  @Listen('dsBlur', { capture: true, target: 'document' })
  listenToDsBlur(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'ds-checkbox')) {
      stopEventBubbling(ev)
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
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
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private passDownAttributes() {
    this.getCheckboxes().forEach(checkbox => {
      if (this.control) {
        if (this.disabled !== undefined) {
          checkbox.disabled = this.disabled
        }
        if (this.readonly !== undefined) {
          checkbox.readonly = this.readonly
        }
        if (this.invalid !== undefined) {
          checkbox.invalid = this.invalid
        }
      }

      checkbox.name = this.name
      checkbox.labelPosition = this.labelPosition
      checkbox.tile = this.tile
      checkbox.tileColor = this.tileColor
      checkbox.cols = this.cols
      checkbox.colsTablet = this.colsTablet
      checkbox.colsMobile = this.colsMobile
    })
  }

  private updateValues() {
    // generate new value array out of the checked checkboxes
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
   * GETTERS
   * ------------------------------------------------------
   */

  private getCheckboxes(): HTMLDsCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('ds-checkbox'))
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
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

      this.getCheckboxes().forEach((checkbox: HTMLDsCheckboxElement) => {
        checkbox.checked = isChecked(checkbox)
      })
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
      >
        <slot></slot>
      </Field>
    )
  }
}

let checkboxGroupIds = 0
