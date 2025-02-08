import { Component, h, Host, Element, Prop, EventEmitter, Event, Method, Watch, State, Listen } from '@stencil/core'
import isNil from 'lodash.isnil'
import { debounceEvent } from '../../utils/helpers'
import { stopEventBubbling } from '../../utils/form-input'
import { BEM } from '../../utils/bem'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { ariaBooleanToString } from '../../utils/aria'

@Component({
  tag: 'bal-input-slider',
  styleUrl: 'bal-input-slider.sass',
})
export class InputSlider implements BalAriaFormLinking {
  @Element() el!: HTMLElement

  private inputId = `bal-input-slider-${inputSliderIds++}`
  private nativeInput?: HTMLInputElement
  private didInit = false
  private hasFocus = false
  private initialValue?: string | number = ''

  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * The step size. 0 means no steps.
   */
  @Prop() step = 0

  /**
   * Min value of the model.
   */
  @Prop() min = 0

  /**
   * Max value of the model.
   */
  @Prop() max = 100

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex = 0

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true`, small ticks for the steps are shown.
   */
  @Prop() hasTicks = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | number = ''

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalInputSliderInputDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalInputSliderBlurDetail>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<BalEvents.BalInputSliderKeyPressDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalInputSliderFocusDetail>

  /**
   * Emitted when the input value has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalInputSliderChangeDetail>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if ((this.disabled || this.readonly) && ev.target && ev.target === this.el) {
      stopEventBubbling(ev)
    }
  }

  private resetHandlerTimer?: NodeJS.Timeout

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = this.initialValue
      clearTimeout(this.resetHandlerTimer)
      this.resetHandlerTimer = setTimeout(() => {
        if (this.nativeInput) {
          this.nativeInput.value = this.initialValue as string
        }
      }, 0)
    }
  }

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged(newValue: string | number | undefined, oldValue: string | number | undefined) {
    if (this.didInit && !this.hasFocus && newValue !== oldValue) {
      this.balChange.emit(this.value)
    }
  }

  connectedCallback() {
    this.debounceChanged()
    this.initialValue = this.value
  }

  componentDidLoad() {
    this.didInit = true
    if (!isNil(this.value) && this.value !== '') {
      this.valueChanged(this.value, undefined)
    }
  }

  private setFocusTimer?: NodeJS.Timeout

  /**
   * Sets focus on the native `input` in `bal-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    clearTimeout(this.setFocusTimer)
    this.setFocusTimer = setTimeout(() => {
      if (this.nativeInput) {
        this.nativeInput.focus()
      }
    })
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

  get numberOfSteps(): number {
    const max = this.max - this.min
    if (this.step <= 0 || this.step >= max) {
      return 0
    }

    return ~~(max / this.step) + 1
  }

  private cssWidth(isUpper = false): string {
    const a: number = this.value === '' ? 0 : Math.round(Number(this.value) / this.step) * this.step
    const b: number = (100 / this.max) * a

    if (!isUpper) {
      return `${100 - b}%`
    }
    return `${b}%`
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null
    if (input) {
      this.value = input.value || ''
    }
    this.balInput.emit(this.value)
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled || this.readonly) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true
    this.balFocus.emit(ev)
  }

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false
    this.balBlur.emit(ev)
    this.balChange.emit(this.value)
  }

  private getNumberOfSteps() {
    const steps = []
    for (let step = 0; step < this.numberOfSteps; step++) {
      steps.push(step)
    }
    return steps
  }

  render() {
    const block = BEM.block('input-slider')
    const backgroundEl = block.element('background')

    const backgroundUpperEl = backgroundEl.element('upper')
    const backgroundUpperInnerEl = backgroundUpperEl.element('inner')

    const backgroundLowerEl = backgroundEl.element('lower')
    const backgroundLowerInnerEl = backgroundLowerEl.element('inner')

    const inputEl = block.element('input')
    const inputNativeEl = inputEl.element('native')
    const inputValueEl = inputEl.element('value')
    const inputValueLeftEl = inputValueEl.modifier('left')
    const inputValueRightEl = inputValueEl.modifier('right')

    const stepsEl = block.element('steps')
    const stepsItemEl = stepsEl.element('item')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('disabled').class(this.disabled || this.readonly),
        }}
        onClick={this.handleClick}
        aria-disabled={ariaBooleanToString(this.disabled || this.readonly)}
      >
        <div
          class={{
            ...backgroundEl.class(),
            ...backgroundEl.modifier('disabled').class(this.disabled || this.readonly),
          }}
        >
          <div
            class={{ ...backgroundUpperEl.class() }}
            style={{
              width: this.cssWidth(),
            }}
          >
            <div class={{ ...backgroundUpperInnerEl.class() }}></div>
          </div>
          <div
            class={{ ...backgroundLowerEl.class() }}
            style={{
              width: this.cssWidth(true),
            }}
          >
            <div class={{ ...backgroundLowerInnerEl.class() }}></div>
          </div>
        </div>
        <div class={{ ...inputEl.class() }}>
          <div class={{ ...inputValueEl.class(), ...inputValueLeftEl.class() }}></div>
          <input
            type="range"
            class={{
              ...inputNativeEl.class(),
              ...inputNativeEl.modifier('disabled').class(this.disabled || this.readonly),
            }}
            ref={inputEl => (this.nativeInput = inputEl)}
            id={this.ariaForm.controlId || this.inputId}
            aria-labelledby={this.ariaForm.labelId}
            aria-describedby={this.ariaForm.messageId}
            aria-disabled={ariaBooleanToString(this.disabled)}
            aria-invalid={this.invalid === true ? 'true' : 'false'}
            disabled={this.disabled}
            readonly={this.readonly}
            name={this.name}
            required={this.required}
            tabIndex={this.balTabindex}
            step={this.step}
            min={this.min}
            max={this.max}
            value={this.value !== '' && this.value !== undefined ? this.value : 0}
            onInput={this.onInput}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onKeyPress={e => this.balKeyPress.emit(e)}
            data-testid="bal-input-slider"
          />
          <div class={{ ...inputValueEl.class(), ...inputValueRightEl.class() }}></div>
        </div>
        <div class={{ ...stepsEl.class() }} style={{ display: this.hasTicks ? 'flex' : 'none' }}>
          {this.getNumberOfSteps().map(step => (
            <div
              key={step}
              class={{
                ...stepsItemEl.class(),
                ...stepsItemEl.modifier('disabled').class(this.disabled || this.readonly),
              }}
              data-step-id={step}
            ></div>
          ))}
        </div>
      </Host>
    )
  }
}

let inputSliderIds = 0
