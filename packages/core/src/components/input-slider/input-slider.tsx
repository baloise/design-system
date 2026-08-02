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
import { HTMLStencilElement } from '@stencil/core/internal'
import isNaN from 'lodash/isNaN'
import { inheritAttributes, debounceEvent, hasValue, Logger, type LogInstance, OneOf, Type } from '@utils'
import { defaultConfig, DsComponentInterface, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { Field, FieldInterface } from '../input/field.util'
import { INPUT_COLORS, InputColor } from '../input/input.interfaces'
import {
  INPUT_SLIDER_BRAND_COLORS,
  InputSliderBrandColor,
  InputSliderInputDetail,
  InputSliderChangeDetail,
  InputSliderBlurDetail,
  InputSliderFocusDetail,
  InputSliderClickDetail,
} from './input-slider.interfaces'
import { clampValue, resolveInitialValue } from './input-slider.utils'
import { InputSliderPickerController } from './input-slider.picker'
import type { target as NoUiSliderTarget } from 'nouislider'

/**
 * Input slider renders a noUiSlider-backed slider with validation and label/description messaging.
 *
 * @part slider - The noUiSlider target element.
 */
@Component({
  tag: 'ds-input-slider',
  styleUrl: 'input-slider.host.scss',
  shadow: true,
  formAssociated: true,
})
export class InputSlider implements DsComponentInterface, FieldInterface {
  private inheritedAttributes: { [k: string]: any } = {}
  private sliderEl: NoUiSliderTarget | undefined
  private picker: InputSliderPickerController | undefined
  private initialValue: number = NaN

  inputSliderId = `ds-input-slider-${InputSliderIds++}`

  log!: LogInstance
  @Logger('input-slider')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement
  @AttachInternals() internals!: ElementInternals

  focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the slider. Unlike a text input, a slider can never be
   * empty; when unset it defaults to `min`. Internally starts as `NaN` (this
   * codebase's established "empty number" sentinel, see `isValueEmpty`) until
   * `connectedCallback` resolves it — never actually rendered or emitted.
   */
  @Prop({ mutable: true, reflect: true })
  @Type('number')
  value: number = NaN

  @Watch('value')
  protected valueChanged(newVal: number) {
    this.picker?.setValue(newVal)
    this.syncFormValue(newVal)
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly name: string = this.inputSliderId

  /**
   * The label of the slider, which is displayed above the control.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * The description of the slider, which is displayed below the control.
   */
  @Prop()
  @Type('string')
  readonly description: string = ''

  /**
   * Defines the color of the slider. The default value is `primary`.
   */
  @Prop()
  @OneOf(INPUT_COLORS)
  readonly color: InputColor = 'primary'

  /**
   * Recolors the connect (the filled progress track) with a brand color instead of the default
   * grey/primary style. Left of the handle uses the darker `-4` shade, right of it the lighter
   * `-2` shade. Empty (default) keeps the current grey/primary look.
   */
  @Prop()
  @OneOf(INPUT_SLIDER_BRAND_COLORS)
  readonly brandColor: InputSliderBrandColor = ''

  /**
   * If `true` the component gets an invalid style.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly invalid: boolean = false

  @Watch('invalid')
  protected invalidChanged() {
    this.picker?.setInvalid(this.invalid)
  }

  /**
   * The text to display when the slider is in an invalid state.
   */
  @Prop()
  @Type('string')
  readonly invalidText: string = ''

  /**
   * The minimum value of the slider.
   */
  @Prop()
  @Type('number')
  readonly min: number = 0

  /**
   * The maximum value of the slider.
   */
  @Prop()
  @Type('number')
  readonly max: number = 100

  @Watch('min')
  @Watch('max')
  protected minChanged() {
    if (!isNaN(this.value)) {
      this.value = clampValue(this.value, this.min, this.max)
    }
    this.picker?.updateRange(this.min, this.max, this.step)
  }

  /**
   * The granularity the value must adhere to, as a string so `"any"` (free,
   * continuous dragging with no step snapping) can be expressed alongside
   * numeric step sizes.
   */
  @Prop()
  @Type('string')
  readonly step: string = '1'

  @Watch('step')
  protected stepChanged() {
    this.picker?.updateRange(this.min, this.max, this.step)
  }

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `dsChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop()
  @Type('number')
  readonly debounce: number = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop()
  @Type('boolean')
  readonly disabled: boolean = false

  @Watch('disabled')
  protected disabledChanged() {
    this.syncDisabledState()
  }

  /**
   * If `true` the element can not be mutated. noUiSlider has no native concept of
   * `readonly`, so this is treated as equivalent to `disabled`.
   */
  @Prop()
  @Type('boolean')
  readonly readonly: boolean = false

  @Watch('readonly')
  protected readonlyChanged() {
    this.syncDisabledState()
  }

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  @Type('boolean')
  readonly required: boolean = true

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly autoInvalidOff: boolean = false

  /**
   * Emitted on each keyboard/pointer movement, before the value is committed.
   */
  @Event() dsInput!: EventEmitter<InputSliderInputDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() dsFocus!: EventEmitter<InputSliderFocusDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() dsBlur!: EventEmitter<InputSliderBlurDetail>

  /**
   * Emitted when the input is clicked.
   */
  @Event() dsClick!: EventEmitter<InputSliderClickDetail>

  /**
   * Emitted when the value is committed (noUiSlider `change`, not `blur` — see
   * ADR-0010/ADR-0007). Fires once per discrete drag/step, independent of focus.
   */
  @Event() dsChange!: EventEmitter<InputSliderChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.debounceChanged()
    this.value = clampValue(resolveInitialValue(this.value, this.min), this.min, this.max)
    this.initialValue = this.value
    this.syncFormValue(this.value)
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  componentDidLoad() {
    if (!this.sliderEl) return

    this.picker = new InputSliderPickerController({
      targetEl: this.sliderEl,
      labelId: 'label',
      min: this.min,
      max: this.max,
      step: this.step,
      value: this.value,
      disabled: this.disabled || this.readonly,
      invalid: this.invalid,
      onInput: value => {
        this.dsInput.emit(value)
      },
      onChange: value => {
        this.setValue(value)
      },
    })

    this.picker.handleEl?.addEventListener('focus', this.handleFocus)
    this.picker.handleEl?.addEventListener('blur', this.handleBlur)
  }

  disconnectedCallback() {
    this.picker?.destroy()
    this.picker = undefined
  }

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: UIEvent) {
    if ((this.disabled || this.readonly) && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    const form = ev.target as HTMLElement
    if (form?.contains(this.el)) {
      this.value = this.initialValue
    }
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
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets focus on `ds-input-slider`'s slider handle. Use this method instead of the global
   * `element.focus()`.
   */
  @Method()
  async setFocus() {
    this.picker?.focus()
  }

  /**
   * Sets blur on `ds-input-slider`'s slider handle. Use this method instead of the global
   * `element.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    this.picker?.blur()
  }

  /**
   * Returns the noUiSlider handle element used under the hood.
   */
  @Method()
  async getInputElement(): Promise<HTMLElement | undefined> {
    return this.picker?.handleEl
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private setValue(newValue: number) {
    if (this.value === newValue) return
    this.value = newValue
    this.dsChange.emit(newValue)
  }

  private syncFormValue(value: number) {
    this.internals.setFormValue(String(value))
  }

  private syncDisabledState() {
    this.picker?.setDisabled(this.disabled || this.readonly)
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleFocus = (ev: FocusEvent) => {
    this.focused = true
    if (!this.disabled && !this.readonly) {
      this.dsFocus.emit(ev)
    }
  }

  private handleBlur = (ev: FocusEvent) => {
    this.focused = false
    if (!this.disabled && !this.readonly) {
      this.dsBlur.emit(ev)
    }
  }

  private handleClick = (ev: MouseEvent) => {
    if (!this.disabled && !this.readonly) {
      this.dsClick.emit(ev)
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Field
        disabled={this.disabled || this.readonly}
        color={this.color}
        invalid={this.invalid}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
        cssClasses={{
          'is-brand-yellow': hasValue(this.brandColor) && this.brandColor === 'yellow',
          'is-brand-purple': hasValue(this.brandColor) && this.brandColor === 'purple',
          'is-brand-red': hasValue(this.brandColor) && this.brandColor === 'red',
          'is-brand-green': hasValue(this.brandColor) && this.brandColor === 'green',
        }}
      >
        <div
          id="slider"
          part="slider"
          ref={el => (this.sliderEl = el as NoUiSliderTarget)}
          onClick={this.handleClick}
          {...this.inheritedAttributes}
        />
        {/* Submitted with the form via ElementInternals.setFormValue() — see connectedCallback/setValue. */}
      </Field>
    )
  }
}

let InputSliderIds = 0
