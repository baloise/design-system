import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  Watch,
  Event,
  EventEmitter,
  Listen,
  Method,
  State,
} from '@stencil/core'
import Big from 'big.js'
import { formatLocaleNumber } from '@baloise/web-app-utils'
import { debounceEvent, rIC } from '../../utils/helpers'
import { inheritAttributes } from '../../utils/attributes'
import { FormInput, inputListenOnClick, stopEventBubbling } from '../../utils/form-input'
import {
  ListenToConfig,
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  defaultConfig,
} from '../../utils/config'
import { BEM } from '../../utils/bem'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { i18nBalInputStepper } from './bal-input-stepper.i18n'
import { LogInstance, Loggable, Logger } from '../../utils/log'

@Component({
  tag: 'bal-input-stepper',
  styleUrl: 'bal-input-stepper.sass',
})
export class InputStepper
  implements ComponentInterface, BalConfigObserver, FormInput<number | undefined>, BalAriaFormLinking, Loggable
{
  private inputId = `bal-input-stepper-${InputStepperIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  private decreaseHasFocus = false
  private increaseHasFocus = false

  nativeInput?: HTMLInputElement

  @Element() el!: HTMLElement

  @State() focused = false
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  log!: LogInstance

  @Logger('bal-input-stepper')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * The min value the input can have
   */
  @Prop() min = 0

  /**
   * The max value the input can have
   */
  @Prop() max = 10

  /**
   * The steps in which the input increases or decreases
   */
  @Prop() steps = 1

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true` the input is shown as invalid
   */
  @Prop() invalid = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * The value of the input. Only allows values in the range of the min max attribute.
   */
  @Prop({ mutable: true }) value = 0
  private initialValue = 0

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Emitted when the input value has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalInputStepperChangeDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalInputStepperInputDetail>

  /**
   * Emitted when the input value has increased.
   */
  @Event() balIncrease!: EventEmitter<BalEvents.BalInputStepperIncreaseDetail>

  /**
   * Emitted when the input value has decreased.
   */
  @Event() balDecrease!: EventEmitter<BalEvents.BalInputStepperDecreaseDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalInputStepperFocusDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalInputStepperBlurDetail>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    inputListenOnClick(this, ev)
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = this.initialValue
    }
  }

  connectedCallback() {
    this.debounceChanged()
    this.initialValue = this.value
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement | undefined> {
    return Promise.resolve(this.nativeInput)
  }

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  increase() {
    if (!this.disabled && !this.readonly) {
      const newValue = new Big(this.value).plus(this.steps).toNumber()
      if (newValue <= this.max) {
        this.value = newValue
        this.balInput.emit(newValue)
        this.balChange.emit(newValue)
        this.balIncrease.emit(newValue)
      }
    }
  }

  decrease() {
    if (!this.disabled && !this.readonly) {
      const newValue = new Big(this.value).minus(this.steps).toNumber()
      if (newValue >= this.min) {
        this.value = newValue
        this.balInput.emit(newValue)
        this.balChange.emit(newValue)
        this.balDecrease.emit(newValue)
      }
    }
  }

  private onFocusDecrease = (ev: CustomEvent) => {
    this.decreaseHasFocus = true
    this.onFocus(ev)
  }

  private onFocusIncrease = (ev: CustomEvent) => {
    this.increaseHasFocus = true
    this.onFocus(ev)
  }

  private onFocus = (ev: CustomEvent) => {
    stopEventBubbling(ev)
    this.balFocus.emit(ev.detail)
  }

  private onBlurDecrease = (ev: CustomEvent) => {
    stopEventBubbling(ev)
    this.decreaseHasFocus = false

    rIC(() => this.onBlur(ev.detail))
  }

  private onBlurIncrease = (ev: CustomEvent) => {
    stopEventBubbling(ev)
    this.increaseHasFocus = false

    rIC(() => this.onBlur(ev.detail))
  }

  private onBlur = (ev: FocusEvent) => {
    if (!(this.decreaseHasFocus || this.increaseHasFocus)) {
      this.balBlur.emit(ev)
    }
  }

  render() {
    const block = BEM.block('input-stepper')
    const elInput = block.element('input')
    const elInner = block.element('inner')
    const elText = elInner.element('text')

    const increaseLabel = i18nBalInputStepper[this.language].increase
    const decreaseLabel = i18nBalInputStepper[this.language].decrease

    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        aria-focused={this.focused ? 'true' : null}
        class={{
          ...block.class(),
        }}
      >
        <div
          class={{
            ...elInner.class(),
          }}
        >
          <bal-button
            aria={{
              title: decreaseLabel,
              label: decreaseLabel,
              controls: this.ariaForm.controlId || this.inputId,
            }}
            size="small"
            square
            data-testid="bal-input-stepper-decrease"
            outlined={!this.invalid}
            icon="minus"
            color={this.invalid ? 'danger' : 'info'}
            disabled={this.disabled || this.readonly || this.value <= this.min}
            onClick={_ => this.decrease()}
            onBalFocus={ev => this.onFocusDecrease(ev)}
            onBalBlur={ev => this.onBlurDecrease(ev)}
          ></bal-button>
          <bal-text
            space="none"
            color={this.disabled || this.readonly ? 'grey' : this.invalid ? 'danger' : ''}
            bold
            class={{
              ...elText.class(),
            }}
            data-testid="bal-input-stepper-text"
          >
            {formatLocaleNumber(`${this.language}-${this.region}`, this.value)}
          </bal-text>
          <bal-button
            aria={{
              title: increaseLabel,
              label: increaseLabel,
              controls: this.ariaForm.controlId || this.inputId,
            }}
            size="small"
            data-testid="bal-input-stepper-increase"
            square
            outlined={!this.invalid}
            icon="plus"
            color={this.invalid ? 'danger' : 'info'}
            disabled={this.disabled || this.readonly || this.value >= this.max}
            onClick={_ => this.increase()}
            onBalFocus={ev => this.onFocusIncrease(ev)}
            onBalBlur={ev => this.onBlurIncrease(ev)}
          ></bal-button>
        </div>
        <input
          class={{
            ...elInput.class(),
          }}
          id={this.ariaForm.controlId || this.inputId}
          aria-labelledby={this.ariaForm.labelId}
          aria-describedby={this.ariaForm.messageId}
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : null}
          data-testid="bal-input-stepper"
          type="text"
          value={this.value}
          name={this.name}
          tabindex="-1"
          ref={inputEl => (this.nativeInput = inputEl)}
          readonly={this.readonly}
          disabled={this.disabled}
          {...this.inheritedAttributes}
        />
      </Host>
    )
  }
}

let InputStepperIds = 0
