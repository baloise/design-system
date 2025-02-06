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
  State,
  Listen,
} from '@stencil/core'
import {
  FormInput,
  getInputTarget,
  inputHandleBlur,
  inputHandleChange,
  inputHandleClick,
  inputHandleFocus,
  inputHandleHostClick,
  inputHandleReset,
  inputListenOnClick,
  inputSetBlur,
  inputSetFocus,
} from '../../utils/form-input'
import { debounceEvent } from '../../utils/helpers'
import { inheritAttributes } from '../../utils/attributes'
import { BEM } from '../../utils/bem'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { ariaBooleanToString } from '../../utils/aria'

@Component({
  tag: 'bal-textarea',
  styleUrl: 'bal-textarea.sass',
})
export class Textarea implements ComponentInterface, FormInput<string | undefined>, BalAriaFormLinking {
  private inputId = `bal-textarea-${TextareaIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  nativeInput?: HTMLTextAreaElement
  inputValue = this.value
  initialValue = this.value || ''

  @Element() el!: HTMLElement

  @State() focused = false
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

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
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: BalProps.BalInputAutocomplete = 'off'

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
  @Prop() wrap?: BalProps.BalTextareaWrap

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
  @Prop() inputmode?: BalProps.BalTextareaInputMode

  /**
   * The value of the textarea.
   */
  @Prop({ mutable: true }) value?: string = ''

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Emitted when the input value has changed..
   */
  @Event() balChange!: EventEmitter<BalEvents.BalTextareaChangeDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalTextareaInputDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalTextareaBlurDetail>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<BalEvents.BalTextareaKeyPressDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalTextareaFocusDetail>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    inputListenOnClick(this, ev)
  }

  private resetHandlerTimer?: NodeJS.Timeout

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      inputHandleReset(this, this.initialValue, this.resetHandlerTimer)
    }
  }

  connectedCallback() {
    this.debounceChanged()
    this.initialValue = this.value || ''
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

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
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

  private onFocus = (ev: FocusEvent) => inputHandleFocus(this, ev)

  private onBlur = (ev: FocusEvent) => {
    inputHandleBlur(this, ev)

    const input = ev.target as HTMLInputElement | null
    if (input) {
      input.value = this.getValue()
    }

    inputHandleChange(this)
  }

  private onClick = (ev: MouseEvent) => inputHandleClick(this, ev)

  private handleClick = (ev: MouseEvent) => inputHandleHostClick(this, ev)

  render() {
    const value = this.getValue()

    const block = BEM.block('textarea')
    const elNative = block.element('native')

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={ariaBooleanToString(this.disabled)}
        class={{
          ...block.class(),
        }}
      >
        <textarea
          class={{
            ...elNative.class(),
            'textarea': true,
            'is-disabled': this.disabled || this.readonly,
            'is-danger': this.invalid,
            'clickable': this.clickable,
          }}
          data-testid="bal-textarea-input"
          ref={inputEl => (this.nativeInput = inputEl)}
          name={this.name}
          id={this.ariaForm.controlId || this.inputId}
          aria-labelledby={this.ariaForm.labelId}
          aria-describedby={this.ariaForm.messageId}
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          aria-disabled={ariaBooleanToString(this.disabled)}
          disabled={this.disabled}
          readonly={this.readonly}
          required={this.required}
          autoCapitalize={this.autocapitalize}
          autocomplete={this.autocomplete}
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
          <slot />
        </textarea>
      </Host>
    )
  }
}

let TextareaIds = 0
