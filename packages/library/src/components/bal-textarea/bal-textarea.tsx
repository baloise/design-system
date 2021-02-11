import { Component, h, Host, Prop, Element, EventEmitter, Event, Method, Watch } from '@stencil/core'

@Component({
  tag: 'bal-textarea',
  styleUrl: 'bal-textarea.scss',
  shadow: false,
  scoped: true,
})
export class Textarea {
  private inputId = `bal-ta-${TextareaIds++}`
  private inputEl?: HTMLTextAreaElement

  @Element() el!: HTMLElement

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

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
   * The value of the control.
   */
  @Prop({ mutable: true }) value: string = ''

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged() {
    this.balChange.emit(this.value == null ? this.value : this.value.toString())
  }

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event({ eventName: 'balInput' }) balInput!: EventEmitter<string>
  private onInput = (event: { target: { value: string } }) => {
    let val = event.target && event.target?.value

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
   * Emitted when the input value has changed..
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
        <textarea
          class={{
            'textarea': true,
            'is-inverted': this.inverted,
            'clickable': this.clickable,
          }}
          id={this.inputId}
          placeholder={this.placeholder}
          name={this.name}
          value={this.value}
          tabindex={this.balTabindex}
          disabled={this.disabled}
          readonly={this.readonly}
          maxLength={this.maxLength}
          minLength={this.minLength}
          onChange={() => this.balChange.emit(this.value)}
          onInput={e => this.onInput(e as any)}
          onBlur={e => this.balBlur.emit(e)}
          onClick={e => this.balClick.emit(e)}
          onKeyPress={e => this.balKeyPress.emit(e)}
          onFocus={e => this.balFocus.emit(e)}
          ref={inputEl => (this.inputEl = inputEl)}
        />
      </Host>
    )
  }
}

let TextareaIds = 0
