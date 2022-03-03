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
import { debounceEvent, findItemLabel } from '../../../helpers/helpers'
import { FormInput, inputListenOnClick } from '../../../helpers/form-input.helpers'
import {
  attachComponentToConfig,
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  defaultConfig,
  detachComponentToConfig,
} from '../../../config'

@Component({
  tag: 'bal-input-stepper',
})
export class InputStepper implements ComponentInterface, BalConfigObserver, FormInput<number | undefined> {
  private inputId = `bal-input-stepper${InputStepperIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  nativeInput?: HTMLInputElement

  @Element() el!: HTMLElement

  @State() hasFocus = false
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region

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
   * If `true` the input is disabled
   */
  @Prop() disabled = false

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

  // @Watch('value')
  // protected async valueChanged(newValue: number, oldValue: number) {
  //   if (this.didInit && newValue !== oldValue) {
  //     this.balInput.emit(newValue)
  //     this.balChange.emit(newValue)
  //   }
  // }

  /**
   * Emitted when the input value has changed.
   */
  @Event() balChange!: EventEmitter<number | undefined>

  /**
   * Emitted when the input value has changed.
   */
  @Event() balInput!: EventEmitter<number | undefined>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(event: UIEvent) {
    inputListenOnClick(this, event)
  }

  connectedCallback() {
    this.debounceChanged()
    attachComponentToConfig(this)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  configChanged(state: BalConfigState): void {
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

  increase() {
    const newValue = new Big(this.value).plus(this.steps).toNumber()
    if (newValue <= this.max) {
      this.value = newValue
      this.balInput.emit(newValue)
      this.balChange.emit(newValue)
    }
  }

  decrease() {
    const newValue = new Big(this.value).minus(this.steps).toNumber()
    if (newValue >= this.min) {
      this.value = newValue
      this.balInput.emit(newValue)
      this.balChange.emit(newValue)
    }
  }

  render() {
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'is-disabled': this.disabled,
          'is-invalid': this.invalid,
        }}
      >
        <div class="is-flex fg-1 is-justify-content-center is-align-items-center">
          <bal-button
            size="small"
            square
            outlined={!this.invalid}
            icon="minus"
            color={this.invalid ? 'danger' : 'info'}
            disabled={this.disabled || this.value <= this.min}
            onClick={_ => this.decrease()}
          ></bal-button>
          <bal-text space="none" color={this.disabled ? 'info' : this.invalid ? 'danger' : ''} bold>
            {formatLocaleNumber(`${this.language}-${this.region}`, this.value)}
          </bal-text>
          <bal-button
            size="small"
            square
            outlined={!this.invalid}
            icon="plus"
            color={this.invalid ? 'danger' : 'info'}
            disabled={this.disabled || this.value >= this.max}
            onClick={_ => this.increase()}
          ></bal-button>
        </div>
        <input
          type="text"
          value={this.value}
          name={this.name}
          ref={inputEl => (this.nativeInput = inputEl)}
          id={this.inputId}
          aria-labelledby={labelId}
          disabled={this.disabled}
        />
      </Host>
    )
  }
}

let InputStepperIds = 0
