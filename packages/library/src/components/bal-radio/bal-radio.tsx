import { Component, h, Host, Prop, Element, EventEmitter, Event, Method, ComponentInterface, Listen } from '@stencil/core'

@Component({
  tag: 'bal-radio',
  styleUrl: 'bal-radio.scss',
  shadow: false,
  scoped: true,
})
export class Radio implements ComponentInterface {
  private inputId = `bal-rb-${radioIds++}`
  private inputEl?: HTMLInputElement

  @Element() el!: HTMLElement

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

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
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

  get parent(): HTMLBalRadioGroupElement | null {
    return this.el.closest('bal-radio-group')
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

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private inputClick = (event: MouseEvent) => {
    event.stopPropagation()
  }

  render() {
    const { inputId, label } = this
    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'bal-radio': this.interface === 'radio',
          'bal-select-button': this.interface === 'select-button',
          'is-inverted': this.inverted,
          'is-disabled': this.disabled,
        }}
      >
        <input
          class={{
            'is-disabled': this.disabled,
          }}
          type="radio"
          role="radio"
          id={inputId}
          name={this.name}
          tabindex={this.balTabindex}
          value={this.value}
          aria-label={label}
          aria-hidden={this.disabled ? 'true' : null}
          disabled={this.disabled}
          checked={this.checked}
          aria-disabled={this.disabled ? 'true' : 'false'}
          onClick={this.inputClick}
          onFocus={e => this.balFocus.emit(e)}
          onBlur={e => this.balBlur.emit(e)}
          ref={inputEl => (this.inputEl = inputEl)}
        />
        <label
          class={{
            'is-disabled': this.disabled,
          }}
          htmlFor={inputId}
          onClick={this.handleClick}
        >
          <bal-text>{label}</bal-text>
        </label>
      </Host>
    )
  }
}

let radioIds = 0
