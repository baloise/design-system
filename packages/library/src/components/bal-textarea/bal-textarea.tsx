import { Component, h, Host, Prop, Element, EventEmitter, Event, Method, Watch, ComponentInterface, Listen } from '@stencil/core'
import { debounceEvent, findItemLabel } from '../../helpers/helpers'
import { isBlank } from '../../utils/balStringUtil'

@Component({
  tag: 'bal-textarea',
  styleUrl: 'bal-textarea.scss',
  shadow: false,
  scoped: true,
})
export class Textarea implements ComponentInterface {
  private inputId = `bal-textarea-${TextareaIds++}`
  private nativeInput?: HTMLTextAreaElement
  private didInit = false
  private hasFocus = false

  @Element() el!: HTMLElement

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
   */
  @Prop() autocapitalize = 'none'

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop() autofocus = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * If `true`, the user cannot interact with the textarea.
   */
  @Prop() disabled = false

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder?: string

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex: number = 0

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
   */
  @Prop() maxLength?: number

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
   */
  @Prop() minLength?: number

  /**
   * If `true` this component can be placed on dark background
   */
  @Prop() inverted = false

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly = false

  /**
   * The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.
   */
  @Prop() cols?: number

  /**
   * The number of visible text lines for the control.
   */
  @Prop() rows?: number

  /**
   * Indicates how the control wraps text.
   */
  @Prop() wrap?: 'hard' | 'soft' | 'off'

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true` the input gets a clickable cursor style
   */
  @Prop() clickable = false

  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
   * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
   */
  @Prop() inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'

  /**
   * The value of the textarea.
   */
  @Prop({ mutable: true }) value?: string = ''

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged(newValue: string | number | null | undefined, oldValue: string | number | null | undefined) {
    if (this.didInit && !this.hasFocus && newValue !== oldValue) {
      this.balChange.emit(this.getValue())
    }
  }

  /**
   * Emitted when the input value has changed..
   */
  @Event() balChange!: EventEmitter<string>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<string>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<KeyboardEvent>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  componentDidLoad() {
    this.didInit = true
    if (isBlank(this.value)) {
      this.valueChanged(this.value, undefined)
    }
  }

  connectedCallback() {
    this.debounceChanged()
  }

  /**
   * Sets focus on the native `textarea` in `ion-textarea`. Use this method instead of the global
   * `textarea.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus()
    }
  }

  /**
   * Returns the native `<textarea>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLTextAreaElement> {
    return Promise.resolve(this.nativeInput!)
  }

  private getValue(): string {
    return this.value || ''
  }

  private onInput = (ev: Event) => {
    const textarea = ev.target as HTMLTextAreaElement | null
    if (textarea) {
      this.value = textarea.value || ''
    }
    this.balInput.emit(this.value || '')
  }

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true
    this.balFocus.emit(ev)
  }

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false
    this.balBlur.emit(ev)
    this.balChange.emit(this.getValue())
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  render() {
    const value = this.getValue()
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'is-disabled': this.disabled,
        }}
      >
        <textarea
          class={{
            'textarea': true,
            'is-inverted': this.inverted,
            'is-disabled': this.disabled,
            'clickable': this.clickable,
          }}
          ref={inputEl => (this.nativeInput = inputEl)}
          id={this.inputId}
          aria-labelledby={labelId}
          disabled={this.disabled}
          autoCapitalize={this.autocapitalize}
          autoFocus={this.autofocus}
          minLength={this.minLength}
          maxLength={this.maxLength}
          placeholder={this.placeholder}
          inputMode={this.inputmode}
          name={this.name}
          value={this.value}
          tabindex={this.balTabindex}
          readonly={this.readonly}
          cols={this.cols}
          rows={this.rows}
          wrap={this.wrap}
          onInput={this.onInput}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onClick={e => this.balClick.emit(e)}
          onKeyPress={e => this.balKeyPress.emit(e)}
        >
          {value}
        </textarea>
      </Host>
    )
  }
}

let TextareaIds = 0
