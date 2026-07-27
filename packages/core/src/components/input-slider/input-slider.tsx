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
import {
  inheritAttributes,
  FormControl,
  FormControlInterface,
  debounceEvent,
  Logger,
  type LogInstance,
  OneOf,
  Type,
} from '@utils'
import { defaultConfig, DsComponentInterface, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { Field, FieldInterface } from '../input/field.util'
import { INPUT_COLORS, InputColor } from '../input/input.interfaces'
import {
  InputSliderInputDetail,
  InputSliderChangeDetail,
  InputSliderBlurDetail,
  InputSliderFocusDetail,
  InputSliderClickDetail,
} from './input-slider.interfaces'
import { clampValue, resolveInitialValue } from './input-slider.utils'

/**
 * Input slider renders a native range input with validation and label/description messaging.
 *
 * @part input - The native HTML range input element.
 */
@Component({
  tag: 'ds-input-slider',
  styleUrl: 'input-slider.host.scss',
  shadow: true,
  formAssociated: true,
})
export class InputSlider implements DsComponentInterface, FieldInterface, FormControlInterface<number> {
  private inheritedAttributes: { [k: string]: any } = {}
  private control = new FormControl<number>(this)
  inputSliderId = `ds-input-slider-${InputSliderIds++}`

  log!: LogInstance
  @Logger('input-slider')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement
  @AttachInternals() internals!: ElementInternals

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the slider. Unlike a text input, a range input can never be
   * empty; when unset it defaults to `min`. Internally starts as `NaN` (this
   * codebase's established "empty number" sentinel, see `isValueEmpty`) until
   * `connectedCallback` resolves it — never actually rendered or emitted.
   */
  @Prop({ mutable: true, reflect: true })
  @Type('number')
  value: number = NaN

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
   * If `true` the component gets an invalid style.
   */
  @Prop()
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * The text to display when the slider is in an invalid state.
   */
  @Prop()
  @Type('string')
  readonly invalidText: string = ''

  /**
   * The minimum value of the slider. Unlike `ds-input`/`ds-number-input`'s
   * `min`, this is numeric because the component's own logic (default value,
   * clamping) depends on it, not just the native attribute pass-through.
   */
  @Prop()
  @Type('number')
  readonly min: number = 0

  /**
   * The maximum value of the slider. See `min` for why this is numeric.
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
  }

  /**
   * The granularity the value must adhere to, as a string so `"any"` (free,
   * continuous dragging with no step snapping) can be expressed alongside
   * numeric step sizes.
   */
  @Prop()
  @Type('string')
  readonly step: string = '1'

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

  /**
   * If `true` the element can not be mutated. A native range input has no
   * concept of `readonly` (browsers only honor it on text-like inputs), so
   * this is treated as equivalent to `disabled`.
   */
  @Prop()
  @Type('boolean')
  readonly readonly: boolean = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  @Type('boolean')
  readonly required: boolean = true

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) readonly autoInvalidOff: boolean = false

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
   * Emitted when the value is committed (native `change`, not `blur` — see
   * ADR-0006). Fires once per discrete drag/step, independent of focus.
   */
  @Event() dsChange!: EventEmitter<InputSliderChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.debounceChanged()
    this.value = clampValue(resolveInitialValue(this.value, this.min), this.min, this.max)
    this.control.connectedCallback()
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  componentDidLoad() {
    this.control.componentDidLoad()
  }

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: UIEvent) {
    this.control.listenOnClick(ev)
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    this.control.listenOnReset(ev)
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
   * Sets focus on the native `input` in `ds-input-slider`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    return this.control.setFocus()
  }

  /**
   * Sets blur on the native `input` in `ds-input-slider`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    return this.control.setBlur()
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  async getInputElement(): Promise<HTMLInputElement> {
    return this.control.nativeEl as HTMLInputElement
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleInput = (_ev: Event) => {
    const nextValue = (this.control.nativeEl as HTMLInputElement | undefined)?.valueAsNumber
    if (nextValue === undefined || isNaN(nextValue)) return

    this.control.inputValue = nextValue
    this.dsInput.emit(nextValue)
  }

  // Value commit lives on the native `change` event, not `blur` — see ADR-0006.
  private handleChange = (_ev: Event) => {
    const nextValue = (this.control.nativeEl as HTMLInputElement | undefined)?.valueAsNumber
    if (nextValue === undefined || isNaN(nextValue)) return

    this.control.setValue(nextValue)
  }

  private handleFocus = (ev: FocusEvent) => {
    this.control.onFocus(ev)
  }

  private handleBlur = (ev: FocusEvent) => {
    this.focused = false
    if (!this.disabled) {
      this.dsBlur.emit(ev)
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
      >
        <input
          id="input"
          part="input"
          type="range"
          name={this.name}
          ref={inputEl => (this.control.nativeEl = inputEl)}
          aria-describedby="description"
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          disabled={this.disabled || this.readonly}
          required={this.required}
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          onInput={this.handleInput}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={ev => this.control.onClick(ev)}
          {...this.inheritedAttributes}
        />
      </Field>
    )
  }
}

let InputSliderIds = 0
