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
} from '@stencil/core'
import isNil from 'lodash.isnil'
import Big from 'big.js'
import { debounceEvent, findItemLabel } from '../../../helpers/helpers'

@Component({
  tag: 'bal-input-stepper',
})
export class InputStepper implements ComponentInterface {
  @Element() el!: HTMLElement

  private inputId = `bal-input-stepper${InputStepperIds++}`
  private nativeInput?: HTMLInputElement
  private didInit = false

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

  @Watch('value')
  protected async valueChanged(newValue: number, oldValue: number) {
    if (this.didInit && newValue !== oldValue) {
      this.balChange.emit(newValue)
    }
  }

  /**
   * Emitted when the input value has changed.
   */
  @Event() balChange!: EventEmitter<number>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  connectedCallback() {
    this.debounceChanged()
  }

  componentDidLoad() {
    this.didInit = true
    if (!isNil(this.value) && this.value !== 0) {
      this.valueChanged(this.value, 0)
    }
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
      this.balChange.emit(newValue)
    }
  }

  decrease() {
    const newValue = new Big(this.value).minus(this.steps).toNumber()
    if (newValue >= this.min) {
      this.value = newValue
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
            icon="plus"
            color={this.invalid ? 'danger' : 'info'}
            disabled={this.disabled || this.value >= this.max}
            onClick={_ => this.increase()}
          ></bal-button>
          <bal-text color={this.disabled ? 'hint' : this.invalid ? 'danger' : ''} bold>
            {this.value}
          </bal-text>
          <bal-button
            size="small"
            square
            outlined={!this.invalid}
            icon="minus"
            color={this.invalid ? 'danger' : 'info'}
            disabled={this.disabled || this.value <= this.min}
            onClick={_ => this.decrease()}
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
