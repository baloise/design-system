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
  Listen,
  Watch,
} from '@stencil/core'
import {
  FormInput,
  inputHandleBlur,
  inputHandleFocus,
  inputSetBlur,
  inputSetFocus,
  stopEventBubbling,
} from '../../../helpers/form-input.helpers'
import { isDescendant } from '../../../helpers/helpers'

@Component({
  tag: 'bal-radio',
})
export class Radio implements ComponentInterface, FormInput<any> {
  private inputId = `bal-rb-${radioIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  nativeInput?: HTMLInputElement

  @Element() el!: HTMLElement

  @State() hasFocus = false
  @State() hasLabel = true

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * Defines the layout of the radio button
   */
  @Prop() interface: 'radio' | 'select-button' = 'radio'

  /**
   * The value of the control.
   */
  @Prop() value = ''

  /**
   * @deprecated If `true` the radio has no label
   */
  @Prop() isEmpty = false
  @Watch('isEmpty') isEmptyHandler() {
    this.labelHidden = this.isEmpty
    console.warn('[DEPRECATED] - Use label-hidden instead')
  }

  /**
   * If `true` the radio has no label
   */
  @Prop() labelHidden = false

  /**
   * If `true`, the radio is selected.
   */
  @Prop({ mutable: true }) checked = false

  /**
   * If `true`, the user cannot interact with the checkbox.
   */
  @Prop() disabled = false

  /**
   * If `true`, the control works on dark background.
   */
  @Prop() inverted = false

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
  @Event() balChange!: EventEmitter<boolean>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && (ev.target === this.el || isDescendant(this.el, ev.target as HTMLElement))) {
      stopEventBubbling(ev)
    }
  }

  /**
   * Sets the focus on the checkbox input element.
   */
  @Method()
  async setFocus() {
    inputSetFocus<any>(this)
  }

  /**
   * Sets blur on the native `input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    inputSetBlur<any>(this)
  }

  get radioGroup(): HTMLBalRadioGroupElement | null {
    return this.el.closest('bal-radio-group')
  }

  connectedCallback() {
    if (this.radioGroup) {
      this.updateState()
      this.radioGroup.addEventListener('balChange', () => this.updateState())
    }
  }

  disconnectedCallback() {
    if (this.radioGroup) {
      this.radioGroup.removeEventListener('balChange', () => this.updateState())
    }
  }

  private updateState = () => {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this.value
    }
  }

  private onInputFocus = (ev: FocusEvent) => inputHandleFocus<any>(this, ev)

  private onInputBlur = (ev: FocusEvent) => inputHandleBlur<any>(this, ev)

  private onClick = (ev: MouseEvent) => {
    if (!this.disabled) {
      this.balChange.emit(this.checked)
      this.balClick.emit(ev)
    } else {
      stopEventBubbling(ev)
    }
  }

  render() {
    const { inputId } = this

    return (
      <Host
        role="radio"
        aria-checked={`${this.checked}`}
        aria-disabled={this.disabled ? 'true' : null}
        aria-hidden={this.disabled ? 'true' : null}
        aria-focused={this.hasFocus ? 'true' : null}
        class={{
          'bal-radio': this.interface === 'radio',
          'bal-select-button': this.interface === 'select-button',
          'is-inverted': this.inverted,
          'is-disabled': this.disabled,
          'is-focused': this.hasFocus,
        }}
        onClick={this.onClick}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        {...this.inheritedAttributes}
      >
        <input
          class={{
            'is-disabled': this.disabled,
            'data-test-radio-input': true,
          }}
          type="radio"
          id={inputId}
          name={this.name}
          tabindex={-1}
          value={this.value}
          disabled={this.disabled}
          checked={this.checked}
          onFocus={e => this.onInputFocus(e)}
          onBlur={e => this.onInputBlur(e)}
          ref={inputEl => (this.nativeInput = inputEl)}
        />
        <label
          class={{
            'option-label': true,
            'is-disabled': this.disabled,
            'data-test-radio-label': true,
          }}
          htmlFor={inputId}
        >
          <bal-text
            class={{
              'has-padding-left': !this.labelHidden && this.interface !== 'select-button',
            }}
          >
            <slot></slot>
          </bal-text>
        </label>
      </Host>
    )
  }
}

let radioIds = 0
