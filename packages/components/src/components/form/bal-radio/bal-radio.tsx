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
} from '@stencil/core'
import { isDescendant } from '../../../helpers/helpers'

@Component({
  tag: 'bal-radio',
})
export class Radio implements ComponentInterface {
  private inputId = `bal-rb-${radioIds++}`
  private inputEl?: HTMLInputElement

  @State() hasFocus = false

  @Element() el!: HTMLElement
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
   * The tabindex of the control.
   */
  @Prop() balTabindex = 0

  /**
   * The value of the control.
   */
  @Prop() value = ''

  /**
   * If `true` the radio has no label
   */
  @Prop() isEmpty = false

  /**
   * If `true`, the radio is selected.
   */
  @Prop({ mutable: true, reflect: true }) checked = false

  /**
   * If `true`, the user cannot interact with the checkbox.
   */
  @Prop() disabled = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

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

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && (ev.target === this.el || isDescendant(this.el, ev.target as HTMLElement))) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  /**
   * Sets the focus on the input element.
   */
  @Method()
  async setFocus() {
    if (this.inputEl) {
      this.inputEl.focus()
    }
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

  private onInputFocus = (ev: FocusEvent) => {
    this.hasFocus = true
    this.balFocus.emit(ev)
  }

  private onInputBlur = (ev: FocusEvent) => {
    this.hasFocus = false
    this.balBlur.emit(ev)
  }

  private getTextColor() {
    if (this.interface === 'radio') {
      return this.disabled ? 'grey' : this.invalid ? 'danger' : 'primary'
    } else {
      return this.disabled ? 'grey' : this.checked ? 'white' : 'primary'
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
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
      >
        <input
          class={{
            'is-disabled': this.disabled,
            'data-test-radio-input': true,
          }}
          type="radio"
          id={inputId}
          name={this.name}
          value={this.value}
          disabled={this.disabled}
          checked={this.checked}
          onFocus={e => this.onInputFocus(e)}
          onBlur={e => this.onInputBlur(e)}
          ref={inputEl => (this.inputEl = inputEl)}
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
            inline
            color={this.getTextColor()}
            class={{
              'has-padding-left': !this.isEmpty && this.interface !== 'select-button',
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
