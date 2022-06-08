import {
  Component,
  h,
  Host,
  Prop,
  Element,
  EventEmitter,
  Event,
  Method,
  Watch,
  ComponentInterface,
  Listen,
  State,
} from '@stencil/core'
import {
  FormInput,
  getInputTarget,
  inputHandleBlur,
  inputHandleChange,
  inputHandleClick,
  inputHandleFocus,
  inputHandleHostClick,
  inputListenOnClick,
  inputSetBlur,
  inputSetFocus,
} from '../../../helpers/form-input.helpers'
import { debounceEvent, findItemLabel, inheritAttributes } from '../../../helpers/helpers'
import { Props } from '../../../props'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-textarea',
})
export class Textarea implements ComponentInterface, FormInput<string | undefined> {
  private inputId = `bal-textarea-${TextareaIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  nativeInput?: HTMLTextAreaElement
  inputValue = this.value

  @Element() el!: HTMLElement

  @State() hasFocus = false

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

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
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder?: string

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
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
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
  @Prop() wrap?: Props.BalTextareaWrap

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
  @Prop() inputmode?: Props.BalTextareaInputMode

  /**
   * The value of the textarea.
   */
  @Prop({ mutable: true }) value?: string = ''

  /**
   * Emitted when the input value has changed..
   */
  @Event() balChange!: EventEmitter<string | undefined>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<string | undefined>

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
  listenOnClick(event: UIEvent) {
    inputListenOnClick(this, event)
  }

  connectedCallback() {
    this.debounceChanged()
  }

  componentDidLoad() {
    this.inputValue = this.value
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * Sets focus on the native `input` in `bal-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    inputSetFocus(this)
  }

  /**
   * Sets blur on the native `input` in `bal-input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    inputSetBlur(this)
  }

  /**
   * Returns the native `<textarea>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLTextAreaElement | undefined> {
    return Promise.resolve(this.nativeInput)
  }

  private getValue(): string {
    return this.value || ''
  }

  private onInput = (ev: InputEvent) => {
    const input = getInputTarget(ev)

    if (input) {
      this.inputValue = input.value
    }

    this.balInput.emit(this.inputValue)
  }

  private onFocus = (event: FocusEvent) => inputHandleFocus(this, event)

  private onBlur = (ev: FocusEvent) => {
    inputHandleBlur(this, ev)

    const input = ev.target as HTMLInputElement | null
    if (input) {
      input.value = this.getValue()
    }

    inputHandleChange(this)
  }

  private onClick = (event: MouseEvent) => inputHandleClick(this, event)

  private handleClick = (event: MouseEvent) => inputHandleHostClick(this, event)

  render() {
    const value = this.getValue()
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    const block = BEM.block('textarea')
    const elNative = block.element('native')

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          ...block.class(),
        }}
      >
        <textarea
          class={{
            ...elNative.class(),
            'textarea': true,
            'is-inverted': this.inverted,
            'is-disabled': this.disabled || this.readonly,
            'is-danger': this.invalid,
            'clickable': this.clickable,
          }}
          ref={inputEl => (this.nativeInput = inputEl)}
          name={this.name}
          id={this.inputId}
          aria-labelledby={labelId}
          disabled={this.disabled}
          readonly={this.readonly}
          autoCapitalize={this.autocapitalize}
          autoFocus={this.autofocus}
          minLength={this.minLength}
          maxLength={this.maxLength}
          placeholder={this.placeholder}
          inputMode={this.inputmode}
          value={this.value}
          cols={this.cols}
          rows={this.rows}
          wrap={this.wrap}
          onFocus={this.onFocus}
          onInput={ev => this.onInput(ev as InputEvent)}
          onBlur={this.onBlur}
          onClick={this.onClick}
          onKeyPress={e => this.balKeyPress.emit(e)}
          {...this.inheritedAttributes}
        >
          {value}
        </textarea>
      </Host>
    )
  }
}

let TextareaIds = 0
