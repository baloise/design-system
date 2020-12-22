import { Component, h, Host, Prop, Element, EventEmitter, Event, Method } from '@stencil/core'

@Component({
  tag: 'bal-radio',
  styleUrl: 'bal-radio.scss',
  shadow: false,
  scoped: true,
})
export class Radio {
  private inputId = `bal-rb-${radioIds++}`
  private inputEl?: HTMLInputElement

  @Element() element!: HTMLElement

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
  @Prop() balTabindex: number = 0

  /**
   * The label of the control.
   */
  @Prop() label: string = ''

  /**
   * The value of the control.
   */
  @Prop() value: string = ''

  /**
   * If `true`, the radio is selected.
   */
  @Prop() checked = false

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
  @Event({ eventName: 'balFocus' }) balFocus!: EventEmitter<void>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event({ eventName: 'balBlur' }) balBlur!: EventEmitter<void>

  /**
   * Sets the focus on the input element.
   */
  @Method()
  async setFocus() {
    if (this.inputEl) {
      this.inputEl.focus()
    }
  }

  get parent(): HTMLBalRadioGroupElement {
    return this.element.closest('bal-radio-group')
  }

  connectedCallback() {
    if (this.parent) {
      this.updateState()
      this.parent.addEventListener('balChange', () => this.updateState())
    }
  }

  disconnectedCallback() {
    if (this.parent) {
      this.parent.removeEventListener('balChange', () => this.updateState())
    }
  }

  private updateState = () => {
    if (this.parent) {
      this.checked = this.parent.value === this.value
    }
  }

  private onFocus = () => {
    this.balFocus.emit()
  }

  private onBlur = () => {
    this.balBlur.emit()
  }

  render() {
    const { inputId, label } = this
    return (
      <Host
        class={{
          'bal-radio': this.interface === 'radio',
          'bal-select-button': this.interface === 'select-button',
          'is-inverted': this.inverted,
        }}>
        <input
          type="radio"
          role="radio"
          id={inputId}
          name={this.name}
          tabindex={this.balTabindex}
          value={this.value}
          aria-label={label}
          disabled={this.disabled}
          checked={this.checked}
          aria-disabled={this.disabled ? 'true' : 'false'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          ref={inputEl => (this.inputEl = inputEl)}
        />
        <label htmlFor={inputId}>
          <bal-text>{label}</bal-text>
        </label>
      </Host>
    )
  }
}

let radioIds = 0
