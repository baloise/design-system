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
import {
  formatLocaleNumber,
  inheritAttributes,
  isValueEmpty,
  debounceEvent,
  rIC,
  Logger,
  type LogInstance,
  OneOf,
  Type,
} from '@utils'
import { defaultConfig, DsComponentInterface, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { Field, FieldInterface } from '../input/field.util'
import { INPUT_COLORS, InputColor } from '../input/input.interfaces'
import {
  CounterBlurDetail,
  CounterChangeDetail,
  CounterDecreaseDetail,
  CounterFocusDetail,
  CounterIncreaseDetail,
  CounterInputDetail,
} from './counter.interfaces'
import { i18nDsCounter } from './counter.i18n'
import { clampValue, stepMinus, stepPlus } from './counter.utils'

const STEP_FALLBACK = 1

/**
 * Counter renders a numeric value flanked by decrease and increase buttons.
 *
 * @part counter - The container element holding the buttons and value.
 * @part value - The span rendering the current value.
 * @part decrease - The decrease (`-`) button.
 * @part increase - The increase (`+`) button.
 */
@Component({
  tag: 'ds-counter',
  styleUrl: 'counter.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Counter implements DsComponentInterface, FieldInterface {
  private inheritedAttributes: { [k: string]: any } = {}
  private initialValue: number = 0
  private stepWarned = false
  private decreaseButtonEl?: HTMLDsButtonElement
  private increaseButtonEl?: HTMLDsButtonElement

  counterId = `ds-counter-${CounterIds++}`

  log!: LogInstance
  @Logger('counter')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement
  @AttachInternals() internals!: ElementInternals

  private decreaseHasFocus = false
  private increaseHasFocus = false

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * The current numeric value of the counter. A counter can never be empty: every write is resolved onto
   * `[min, max]`, with an empty value (`null`/`undefined`/`NaN`) falling back to `min`. The resolution is
   * silent — no `dsChange` is emitted — because a programmatic write must never look like user input (a
   * `ControlValueAccessor`'s `writeValue()` may not call back into `onChange()`). A framework binding that
   * writes an out-of-range value therefore keeps that value on its side while the element shows the clamped
   * one, until the next user interaction emits a real `dsChange`.
   */
  @Prop({ mutable: true, reflect: true })
  @Type('number')
  value: number = 0

  @Watch('value')
  protected valueChanged() {
    // Resolve an empty value — e.g. from a framework binding resetting to "no value" (Angular's
    // `FormControl.reset()`, which calls `writeValue(null)` straight through onto this property) — onto
    // `min`, the same fallback `connectedCallback` applies to the initial value. Re-assigning `this.value`
    // re-enters this watcher; the second pass is no longer empty, so it terminates there instead of looping.
    if (isValueEmpty(this.value)) {
      this.value = clampValue(this.min, this.min, this.max)
      return
    }
    // `connectedCallback` and the `min`/`max` watchers already clamp; doing it here too makes every write
    // path consistent instead of leaving runtime `value` assignments as the one that escapes the range.
    const clamped = clampValue(this.value, this.min, this.max)
    if (clamped !== this.value) {
      this.value = clamped
      return
    }
    this.syncFormValue(this.value)
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly name: string = this.counterId

  /**
   * The label of the counter, which is displayed above the control.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * The description of the counter, which is displayed below the control.
   */
  @Prop()
  @Type('string')
  readonly description: string = ''

  /**
   * Defines the color of the counter. The default value is `primary`.
   */
  @Prop()
  @OneOf(INPUT_COLORS)
  readonly color: InputColor = 'primary'

  /**
   * If `true` the component gets an invalid style.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * The text to display when the counter is in an invalid state.
   */
  @Prop()
  @Type('string')
  readonly invalidText: string = ''

  /**
   * The minimum value the counter can take.
   */
  @Prop()
  @Type('number')
  readonly min: number = 0

  /**
   * The maximum value the counter can take.
   */
  @Prop()
  @Type('number')
  readonly max: number = 10

  @Watch('min')
  protected minChanged() {
    this.clampToRange()
  }

  @Watch('max')
  protected maxChanged() {
    this.clampToRange()
  }

  /**
   * The granularity by which the value increases or decreases per click. Must
   * be a positive number (integer or decimal). If a non-positive value is
   * provided, a warning is logged and `1` is used at click time.
   */
  @Prop()
  @Type('number')
  readonly step: number = 1

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
   * If `true` the element can not be mutated. Both buttons are disabled while
   * the form value continues to be submitted.
   */
  @Prop()
  @Type('boolean')
  readonly readonly: boolean = false

  /**
   * If `true`, the user must have a value before submitting a form. Because
   * the counter always has a numeric value, this only affects the "optional"
   * suffix on the label.
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
   * Emitted whenever the value changes via a step. Fires alongside `dsChange`.
   */
  @Event() dsInput!: EventEmitter<CounterInputDetail>

  /**
   * Emitted once per successful step. Debounceable via the `debounce` prop.
   */
  @Event() dsChange!: EventEmitter<CounterChangeDetail>

  /**
   * Emitted after a successful increase step, in addition to `dsChange`/`dsInput`.
   */
  @Event() dsIncrease!: EventEmitter<CounterIncreaseDetail>

  /**
   * Emitted after a successful decrease step, in addition to `dsChange`/`dsInput`.
   */
  @Event() dsDecrease!: EventEmitter<CounterDecreaseDetail>

  /**
   * Emitted when focus enters the widget (either button).
   */
  @Event() dsFocus!: EventEmitter<CounterFocusDetail>

  /**
   * Emitted when focus leaves the widget entirely. Tabbing between the two
   * buttons does not emit — see `handleFocusout`.
   */
  @Event() dsBlur!: EventEmitter<CounterBlurDetail>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback() {
    this.debounceChanged()
    this.value = clampValue(this.value, this.min, this.max)
    this.initialValue = this.value
    this.syncFormValue(this.value)
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * PUBLIC LISTENERS
   * ─────────────────────────────────────────────────────
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
   * ─────────────────────────────────────────────────────
   */

  /**
   * Sets focus on the counter. Prefers the increase button; falls back to
   * decrease if the increase is disabled (value at max).
   */
  @Method()
  async setFocus(): Promise<void> {
    const increaseDisabled = this.disabled || this.readonly || this.value >= this.max
    const target = increaseDisabled ? this.decreaseButtonEl : this.increaseButtonEl
    target?.shadowRoot?.querySelector('button')?.focus()
  }

  /**
   * Returns the underlying interactive element used under the hood. Returns
   * the increase button (or decrease, if increase is disabled).
   */
  @Method()
  async getInputElement(): Promise<HTMLElement | undefined> {
    const increaseDisabled = this.disabled || this.readonly || this.value >= this.max
    return increaseDisabled ? this.decreaseButtonEl : this.increaseButtonEl
  }

  /**
   * EVENT HANDLERS
   * ─────────────────────────────────────────────────────
   */

  private handleIncrease = () => {
    if (this.disabled || this.readonly) return
    const next = stepPlus(this.value, this.effectiveStep())
    if (next > this.max) return
    this.commit(next)
    this.dsIncrease.emit(next)
  }

  private handleDecrease = () => {
    if (this.disabled || this.readonly) return
    const next = stepMinus(this.value, this.effectiveStep())
    if (next < this.min) return
    this.commit(next)
    this.dsDecrease.emit(next)
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.disabled || this.readonly) return
    if (ev.key === 'ArrowUp') {
      ev.preventDefault()
      this.handleIncrease()
    } else if (ev.key === 'ArrowDown') {
      ev.preventDefault()
      this.handleDecrease()
    }
  }

  private handleFocusDecrease = (ev: CustomEvent<void>) => {
    this.decreaseHasFocus = true
    this.handleFocus(ev)
  }

  private handleFocusIncrease = (ev: CustomEvent<void>) => {
    this.increaseHasFocus = true
    this.handleFocus(ev)
  }

  private handleFocus = (ev: CustomEvent<void>) => {
    ev.stopPropagation()
    if (!this.disabled && !this.readonly) {
      this.dsFocus.emit()
    }
  }

  private handleBlurDecrease = (ev: CustomEvent<void>) => {
    ev.stopPropagation()
    this.decreaseHasFocus = false
    rIC(() => this.handleBlur())
  }

  private handleBlurIncrease = (ev: CustomEvent<void>) => {
    ev.stopPropagation()
    this.increaseHasFocus = false
    rIC(() => this.handleBlur())
  }

  private handleBlur = () => {
    if (!(this.decreaseHasFocus || this.increaseHasFocus)) {
      if (!this.disabled && !this.readonly) {
        this.dsBlur.emit()
      }
    }
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  private clampToRange() {
    const clamped = clampValue(this.value, this.min, this.max)
    if (clamped !== this.value) {
      this.value = clamped
    }
  }

  private syncFormValue(value: number) {
    this.internals.setFormValue(String(value))
  }

  private effectiveStep(): number {
    if (!Number.isFinite(this.step) || this.step <= 0) {
      if (!this.stepWarned) {
        console.warn(
          `[ds-counter] \`step\` must be a positive number, got ${this.step}. Falling back to ${STEP_FALLBACK}.`,
        )
        this.stepWarned = true
      }
      return STEP_FALLBACK
    }
    return this.step
  }

  private commit(next: number) {
    this.value = next
    this.dsInput.emit(next)
    this.dsChange.emit(next)
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const decreaseLabel = i18nDsCounter[this.language].decrease
    const increaseLabel = i18nDsCounter[this.language].increase
    const decreaseDisabled = this.disabled || this.readonly || this.value <= this.min
    const increaseDisabled = this.disabled || this.readonly || this.value >= this.max

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
        <div id="counter" part="counter" onKeyDown={this.handleKeyDown} {...this.inheritedAttributes}>
          <ds-button
            ref={el => (this.decreaseButtonEl = el as HTMLDsButtonElement)}
            part="decrease"
            data-testid="ds-counter-decrease"
            color={
              this.invalid
                ? 'danger'
                : this.color === 'danger' || this.color === 'warning' || this.color === 'success'
                  ? this.color
                  : 'secondary'
            }
            size="sm"
            square
            icon="minus"
            a11yLabel={decreaseLabel}
            a11yTitle={decreaseLabel}
            disabled={decreaseDisabled}
            onClick={this.handleDecrease}
            onDsFocus={this.handleFocusDecrease}
            onDsBlur={this.handleBlurDecrease}
          ></ds-button>
          <span part="value" data-testid="ds-counter-value">
            {formatLocaleNumber(this.value)}
          </span>
          <ds-button
            ref={el => (this.increaseButtonEl = el as HTMLDsButtonElement)}
            part="increase"
            data-testid="ds-counter-increase"
            color={
              this.invalid
                ? 'danger'
                : this.color === 'danger' || this.color === 'warning' || this.color === 'success'
                  ? this.color
                  : 'secondary'
            }
            size="sm"
            square
            icon="plus"
            a11yLabel={increaseLabel}
            a11yTitle={increaseLabel}
            disabled={increaseDisabled}
            onClick={this.handleIncrease}
            onDsFocus={this.handleFocusIncrease}
            onDsBlur={this.handleBlurIncrease}
          ></ds-button>
        </div>
      </Field>
    )
  }
}

let CounterIds = 0
