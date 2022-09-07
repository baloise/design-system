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
import { debounceEvent, findItemLabel, inheritAttributes } from '../../../helpers/helpers'
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
import { BEM } from '../../../utils/bem'
import { Events } from '../../../types'

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

  /**
   * Emitted when the input value has changed.
   */
  @Event() balChange!: EventEmitter<Events.BalInputStepperChangeDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() balInput!: EventEmitter<Events.BalInputStepperInputDetail>

  /**
   * Emitted when the input value has increased.
   */
  @Event() balIncrease!: EventEmitter<Events.BalInputStepperChangeDetail>

  /**
   * Emitted when the input value has decreased.
   */
  @Event() balDecrease!: EventEmitter<Events.BalInputStepperChangeDetail>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(event: UIEvent) {
    inputListenOnClick(this, event)
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    const formElement = event.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = 0
    }
  }

  connectedCallback() {
    this.debounceChanged()
    attachComponentToConfig(this)
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
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

  render() {
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    const block = BEM.block('input-stepper')
    const elInput = block.element('input')
    const elInner = block.element('inner')
    const elText = elInner.element('text')

    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          ...block.class(),
        }}
      >
        <div
          class={{
            'is-flex': true,
            'fg-1': true,
            'is-justify-content-center': true,
            'is-align-items-center': true,
            ...elInner.class(),
          }}
        >
          <bal-button
            size="small"
            square
            outlined={!this.invalid}
            icon="minus"
            color={this.invalid ? 'danger' : 'info'}
            disabled={this.disabled || this.readonly || this.value <= this.min}
            onClick={_ => this.decrease()}
          ></bal-button>
          <bal-text
            space="none"
            color={this.disabled || this.readonly ? 'grey' : this.invalid ? 'danger' : ''}
            bold
            class={{
              ...elText.class(),
            }}
          >
            {formatLocaleNumber(`${this.language}-${this.region}`, this.value)}
          </bal-text>
          <bal-button
            size="small"
            square
            outlined={!this.invalid}
            icon="plus"
            color={this.invalid ? 'danger' : 'info'}
            disabled={this.disabled || this.readonly || this.value >= this.max}
            onClick={_ => this.increase()}
          ></bal-button>
        </div>
        <input
          class={{
            ...elInput.class(),
          }}
          type="text"
          value={this.value}
          name={this.name}
          ref={inputEl => (this.nativeInput = inputEl)}
          id={this.inputId}
          aria-labelledby={labelId}
          readonly={this.readonly}
          disabled={this.disabled}
          {...this.inheritedAttributes}
        />
      </Host>
    )
  }
}

let InputStepperIds = 0
