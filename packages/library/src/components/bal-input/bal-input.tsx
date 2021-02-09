import { Component, h, Host, Prop, Element, EventEmitter, Event, Method } from '@stencil/core'

@Component({
  tag: 'bal-input',
  styleUrl: 'bal-input.scss',
  shadow: false,
  scoped: true,
})
export class Input {
  private allowedKeys = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
    'Backspace',
    'Enter',
    'ArrowLeft',
    'Left',
    'ArrowRight',
    'Right',
    'Tab',
    'Esc',
    'Escape',
    'Del',
    'Delete',
  ]

  private inputId = `bal-in-${InputIds++}`
  private inputEl?: HTMLInputElement

  @Element() el!: HTMLElement

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * Defines the type of the input (text, number, email ...).
   */
  @Prop() type: string = 'text'

  /**
   * Placeholder of the input
   */
  @Prop() placeholder = ''

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex: number = 0

  /**
   * Defines the max length of the value.
   */
  @Prop() maxLength: number | undefined = undefined

  /**
   * Defines the min length of the value.
   */
  @Prop() minLength: number | undefined = undefined

  /**
   * If `true` this component can be placed on dark background
   */
  @Prop() inverted = false

  /**
   * If `true` the input is readonly
   */
  @Prop() readonly = false

  /**
   * If `true` the input is disabled
   */
  @Prop() disabled = false

  /**
   * If `true` the input gets a clickable cursor style
   */
  @Prop() clickable = false

  /**
   * The autocomplete attribute specifies whether or not an input field should have autocomplete enabled.
   */
  @Prop() autoComplete: boolean = false

  /**
   * If `true` on mobile device the number keypad is active
   */
  @Prop() numberKeyboard = false

  /**
   * If `true` the input only allows numbers
   */
  @Prop() onlyNumbers = false

  /**
   * The value of the control.
   */
  @Prop({ mutable: true }) value: string = ''

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event({ eventName: 'balInput' }) balInput!: EventEmitter<string>
  private onInput = (event: { target: { value: string } }) => {
    let val = event.target && event.target?.value

    if (this.onlyNumbers) {
      val = this.filterNumbers(val)
    }

    if (this.value !== val) {
      this.value = val
      this.balInput.emit(this.value)
    }
  }

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event({ eventName: 'balBlur' }) balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has clicked.
   */
  @Event({ eventName: 'balClick' }) balClick!: EventEmitter<MouseEvent>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event({ eventName: 'balKeyPress' }) balKeyPress!: EventEmitter<KeyboardEvent>

  /**
   * Emitted when the input has focus.
   */
  @Event({ eventName: 'balFocus' }) balFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input value has changed.
   */
  @Event({ eventName: 'balChange' }) balChange!: EventEmitter<string>

  /**
   * Sets the focus on the input element.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputEl.focus()
  }

  render() {
    return (
      <Host>
        <input
          class={{
            'input': true,
            'is-inverted': this.inverted,
            'clickable': this.clickable,
          }}
          autoComplete={this.autoComplete ? 'on' : 'off'}
          id={this.inputId}
          type={this.type}
          placeholder={this.placeholder}
          name={this.name}
          value={this.value}
          tabindex={this.balTabindex}
          disabled={this.disabled}
          readonly={this.readonly}
          pattern={this.numberKeyboard ? '[0-9]*' : ''}
          maxLength={this.maxLength}
          minLength={this.minLength}
          onInput={e => this.onInput(e as any)}
          onChange={() => this.balChange.emit(this.value)}
          onBlur={e => this.balBlur.emit(e)}
          onClick={e => this.balClick.emit(e)}
          onKeyPress={e => this.balKeyPress.emit(e)}
          onKeyDown={e => this.onKeyDown(e)}
          onFocus={e => this.balFocus.emit(e)}
          ref={inputEl => (this.inputEl = inputEl)}
        />
      </Host>
    )
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.numberKeyboard) {
      if (this.allowedKeys.indexOf(event.key) < 0) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  }

  private filterNumbers(val: string) {
    if (val && typeof val === 'string') {
      val = val.replace(/[^\d]/g, '')
    }
    return val
  }
}

let InputIds = 0
