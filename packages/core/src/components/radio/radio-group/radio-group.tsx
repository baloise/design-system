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
  tag: 'ds-radio-group',
  styleUrl: 'radio-group.host.scss',
  shadow: true,
  formAssociated: true,
})
export class RadioGroup implements ComponentInterface, Loggable, FieldInterface {
  private initialValue?: any | null
  inputId = `ds-rg-${radioGroupIds++}`

  @Element() el!: HTMLDsRadioGroupElement

  log!: LogInstance
  @Logger('radio-group')
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
   * The name of the radios in the group. Child radios will inherit the name.
   */
  @Prop() name: string = this.inputId

  /**
   * The label of the input, which is displayed above the input field.
   */
  @Prop() label?: string

  /**
   * Defines the position of the label, either before or after the radio input. Default is after.
   */
  @Prop() labelPosition: DS.RadioLabelPosition = 'right'

  /**
   * The description of the input, which is displayed below the input field.
   */
  @Prop() description?: string

  /**
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop() color: DS.InputColor = 'primary'

  /**
   * Shows a loading indicator at the end of the input and replaces the end slot content.
   */
  @Prop() loading = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid: boolean | undefined

  /**
   * The text to display when the input is in an invalid state.
   */
  @Prop() invalidText?: string

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled: boolean | undefined

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly: boolean | undefined

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = true

  /**
   * Displays the checkboxes vertically
   */
  @Prop() vertical = false

  /**
   * If `true`, the radios can be deselected.
   */
  @Prop() allowEmptySelection = false

  /**
   * the value of the radio group.
   */
  @Prop({ mutable: true }) value?: any | null

  @Watch('value')
  valueChanged() {
    this.handleValueChange()
  }

  /**
   * Defines the layout of the input
   */
  @Prop() tile = false

  /**
   * Defines the color of the tile checkbox.
   */
  @Prop() tileColor?: DS.RadioTileColor

  /**
   * Defines the column size like the grid.
   */
  @Prop() cols: DS.RadioGroupColumns = 1

  /**
   * Defines the column size for tablet and bigger like the grid.
   */
  @Prop() colsTablet: DS.RadioGroupColumns = 1

  /**
   * Defines the column size for mobile and bigger like the grid.
   */
  @Prop() colsMobile: DS.RadioGroupColumns = 1

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<DS.RadioGroupBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() dsFocus!: EventEmitter<DS.RadioGroupFocusDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() dsChange!: EventEmitter<DS.RadioGroupChangeDetail>

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
  listenOnClick(ev: UIEvent) {
    if (isDescendant(this.el, ev.target as HTMLElement)) {
      stopEventBubbling(ev)
    }
  }

  @Listen('dsFocus', { capture: true, target: 'document' })
  radioFocusListener(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'ds-radio')) {
      stopEventBubbling(ev)
    }
  }

  @Listen('dsBlur', { capture: true, target: 'document' })
  radioBlurListener(ev: CustomEvent<FocusEvent>) {
    const { target } = ev
    if (target && isDescendant(this.el, target) && hasTagName(target, 'ds-radio')) {
      stopEventBubbling(ev)
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetListener(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = this.initialValue
    }
  }

  @Listen('keydown', { target: 'document' })
  listenOnKeydown(ev: any) {
    if (ev.target && !this.el.contains(ev.target)) {
      return
    }

    // Get all radios inside of the radio group and then
    // filter out disabled radios since we need to skip those
    const radios = this.getRadios().filter(radio => !radio.disabled)
    const targetRadio = ev.target.closest('ds-radio')

    // Only move the radio if the current focus is in the radio group
    if (targetRadio && radios.includes(targetRadio)) {
      const index = radios.findIndex(radio => radio === targetRadio)
      const current = radios[index]

      let next

      // If hitting arrow down or arrow right, move to the next radio
      // If we're on the last radio, move to the first radio
      if (['ArrowDown', 'ArrowRight'].includes(ev.code)) {
        next = index === radios.length - 1 ? radios[0] : radios[index + 1]
      }

      // If hitting arrow up or arrow left, move to the previous radio
      // If we're on the first radio, move to the last radio
      if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
        next = index === 0 ? radios[radios.length - 1] : radios[index - 1]
      }

      if (next && radios.includes(next)) {
        next.setFocus()

        this.value = next.value
        this.dsChange.emit(this.value)
        this.internals.setFormValue(this.value)
      }

      // Update the radio group value when a user presses the
      // space bar on top of a selected radio
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
    this.getRadios().forEach(radio => {
      if (this.disabled !== undefined) {
        radio.disabled = this.disabled
      }
      if (this.readonly !== undefined) {
        radio.readonly = this.readonly
      }
      if (this.invalid !== undefined) {
        radio.invalid = this.invalid
      }
      radio.labelPosition = this.labelPosition
      radio.tile = this.tile
      radio.tileColor = this.tileColor
      radio.cols = this.cols
      radio.colsTablet = this.colsTablet
      radio.colsMobile = this.colsMobile
    })
  }

  private setRadioChecked() {
    this.getRadios().forEach((radio: HTMLDsRadioElement) => {
      if (radio.updateState) {
        radio.updateState()
      }
    })
  }

  private setRadioTabindex(value: any) {
    const radios = this.getRadios()

    // Get the first radio that is not disabled and the checked one
    const first = radios.find(radio => !radio.disabled)
    const checked = radios.find(radio => radio.value === value && !radio.disabled)

    if (!first && !checked) {
      return
    }

    // If an enabled checked radio exists, set it to be the focusable radio
    // otherwise we default to focus the first radio
    const focusable = checked || first

    for (const radio of radios) {
      const tabindex = radio === focusable ? 0 : -1
      radio.setButtonTabindex(tabindex)
    }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private getRadios(): HTMLDsRadioElement[] {
    return Array.from(this.el.querySelectorAll('ds-radio'))
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleValueChange = async () => {
    this.setRadioTabindex(this.value)
    this.setRadioChecked()
  }

  private handleClick = (ev: Event) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    ev.preventDefault()

    const selectedRadio = ev.target && (ev.target as HTMLElement).closest('ds-radio')
    if (selectedRadio && !selectedRadio.disabled && !selectedRadio.readonly) {
      const currentValue = this.value
      const newValue = selectedRadio.value
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

let radioGroupIds = 0
