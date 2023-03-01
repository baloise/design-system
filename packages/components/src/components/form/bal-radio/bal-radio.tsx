import {
  Component,
  h,
  Host,
  Prop,
  Element,
  EventEmitter,
  Event,
  Method,
  ComponentInterface,
  State,
  Watch,
} from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { FOCUS_KEYS } from '../../../utils/focus-visible'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'bal-radio',
  styleUrls: {
    css: '../bal-checkbox/radio-checkbox.sass',
  },
})
export class Radio implements ComponentInterface, Loggable {
  private inputId = `bal-rb-${radioIds++}`
  private radioGroup: HTMLBalRadioGroupElement | null = null
  private nativeInput!: HTMLInputElement
  private keyboardMode = true

  log!: LogInstance

  @Logger('bal-radio')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLBalRadioElement

  /**
   * If `true`, the radio is selected.
   */
  @State() checked = false
  @State() focused = false

  /**
   * The tabindex of the radio button.
   * @internal
   */
  @State() buttonTabindex = -1

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * the value of the radio.
   */
  @Prop() value?: any | null

  /**
   * @deprecated If `true` the radio has no label
   */
  @Prop() isEmpty = undefined
  @Watch('isEmpty') isEmptyHandler() {
    if (this.isEmpty !== undefined) {
      this.labelHidden = this.isEmpty
      console.warn('[DEPRECATED] - Use label-hidden instead')
    }
  }

  /**
   * Label of the radio item.
   */
  @Prop() label = ''

  /**
   * If `true` the radio has no label
   */
  @Prop() labelHidden = false

  /**
   * If `true` the control is no padding
   */
  @Prop() flat = false

  /**
   * Defines the layout of the radio button
   */
  @Prop() interface: BalProps.BalRadioInterface = 'radio'

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
   * If `true`, the value will not be send with a form submit
   */
  @Prop() hidden = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * Emitted when the toggle has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalRadioChangeDetail>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    if (this.value === undefined) {
      this.value = this.inputId
    }
    const radioGroup = (this.radioGroup = this.el.closest('bal-radio-group'))
    if (radioGroup) {
      this.updateState()
      radioGroup.addEventListener('balInput', this.updateState)
    }

    this.el.addEventListener('keydown', this.onKeydown)
    this.el.addEventListener('touchstart', this.onPointerDown)
    this.el.addEventListener('mousedown', this.onPointerDown)
  }

  disconnectedCallback() {
    const radioGroup = this.radioGroup
    if (radioGroup) {
      radioGroup.removeEventListener('balInput', this.updateState)
      this.radioGroup = null
    }

    this.el.removeEventListener('keydown', this.onKeydown)
    this.el.removeEventListener('touchstart', this.onPointerDown)
    this.el.removeEventListener('mousedown', this.onPointerDown)
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /** @internal */
  @Method()
  async setFocus(ev: any) {
    ev.stopPropagation()
    ev.preventDefault()

    this.nativeInput.focus()
    this.focused = true
  }

  /** @internal */
  @Method()
  async setButtonTabindex(value: number) {
    this.buttonTabindex = value
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement | undefined> {
    return Promise.resolve(this.nativeInput)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateState = () => {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this.value
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onClick = (ev: Event) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    this.checked = this.nativeInput.checked
    this.balClick.emit()
    this.nativeInput.focus()
  }

  private onFocus = () => {
    this.balFocus.emit()

    if (this.keyboardMode) {
      this.focused = true
    }
  }

  private onBlur = () => {
    this.balBlur.emit()
    this.focused = false
  }

  private onPointerDown = () => (this.keyboardMode = false)

  private onKeydown = (ev: any) => (this.keyboardMode = FOCUS_KEYS.includes(ev.key))

  componentWillLoad() {
    this.isEmptyHandler()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('radio-checkbox')
    const inputEl = block.element('input')
    const labelEl = block.element('label')
    const labelTextEl = labelEl.element('text')

    const value = typeof this.value === 'boolean' ? JSON.stringify(this.value) : this.value

    return (
      <Host
        role="radio"
        aria-checked={`${this.checked}`}
        aria-disabled={this.disabled ? 'true' : null}
        aria-hidden={this.disabled ? 'true' : null}
        aria-focused={this.focused ? 'true' : null}
        class={{
          'bal-focused': this.focused,
          ...block.class(),
          ...block.modifier('radio').class(),
          ...block.modifier('select-button').class(this.interface === 'select-button'),
          ...block.modifier('invalid').class(this.invalid),
          ...block.modifier('checked').class(this.checked),
          ...block.modifier('flat').class(this.flat),
          ...block.modifier('disabled').class(this.disabled || this.readonly),
        }}
        onClick={this.onClick}
      >
        <input
          class={{
            ...inputEl.class(),
            ...inputEl.modifier('select-button').class(this.interface === 'select-button'),
            'data-test-radio-input': true,
          }}
          type="radio"
          id={this.inputId}
          name={this.name}
          value={value}
          checked={this.checked}
          aria-checked={`${this.checked}`}
          disabled={this.disabled}
          readonly={this.readonly}
          required={this.required}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          ref={inputEl => (this.nativeInput = inputEl as HTMLInputElement)}
        />
        <label
          class={{
            ...labelEl.class(),
            ...labelEl.modifier('checked').class(this.checked),
            ...labelEl.modifier('radio').class(),
            'data-test-radio-label': true,
          }}
          htmlFor={this.inputId}
        >
          <span
            class={{
              ...labelTextEl.class(),
              ...labelTextEl.modifier('hidden').class(this.labelHidden),
            }}
          >
            {this.label}
            <slot></slot>
          </span>
        </label>
      </Host>
    )
  }
}

let radioIds = 0
