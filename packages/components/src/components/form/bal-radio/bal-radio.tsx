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
import { inheritAttributes, isDescendant } from '../../../helpers/helpers'
import { Props, Events } from '../../../types'
import { BEM } from '../../../utils/bem'

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
   * @deprecated If `true` the radio has no label
   */
  @Prop() isEmpty = false
  @Watch('isEmpty') isEmptyHandler() {
    this.labelHidden = this.isEmpty
    console.warn('[DEPRECATED] - Use label-hidden instead')
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

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
  @Prop() interface: Props.BalRadioInterface = 'radio'

  /**
   * Value of the radio item, if checked the whole group has this value.
   */
  @Prop() value: number | string | boolean = ''

  /**
   * If `true`, the radio is selected.
   */
  @Prop({ mutable: true, reflect: true }) checked = false

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
  @Event() balChange!: EventEmitter<Events.BalRadioChangeDetail>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (
      (this.disabled || this.readonly) &&
      ev.target &&
      (ev.target === this.el || isDescendant(this.el, ev.target as HTMLElement))
    ) {
      stopEventBubbling(ev)
    }
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  connectedCallback() {
    if (this.group) {
      this.updateState()
      this.group.addEventListener('balChange', () => this.updateState())
    }
  }

  disconnectedCallback() {
    if (this.group) {
      this.group.removeEventListener('balChange', () => this.updateState())
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

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement | undefined> {
    return Promise.resolve(this.nativeInput)
  }

  get group(): HTMLBalRadioGroupElement | null {
    return this.el.closest('bal-radio-group')
  }

  private updateState = () => {
    if (this.group) {
      this.checked = this.group.value === this.value
    }
  }

  private onInputFocus = (ev: FocusEvent) => inputHandleFocus<any>(this, ev)

  private onInputBlur = (ev: FocusEvent) => inputHandleBlur<any>(this, ev)

  private onClick = (ev: MouseEvent) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    if (element.nodeName !== 'INPUT' && !this.disabled && !this.readonly) {
      this.balChange.emit(this.checked)
      this.balClick.emit(ev)
      ev.preventDefault()
    } else {
      stopEventBubbling(ev)
    }
  }

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
        aria-focused={this.hasFocus ? 'true' : null}
        class={{
          ...block.class(),
          ...block.modifier('radio').class(),
          ...block.modifier('select-button').class(this.interface === 'select-button'),
          ...block.modifier('focused').class(this.hasFocus),
          ...block.modifier('invalid').class(this.invalid),
          ...block.modifier('checked').class(this.checked),
          ...block.modifier('flat').class(this.flat),
          ...block.modifier('disabled').class(this.disabled || this.readonly),
        }}
        onClick={this.onClick}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        {...this.inheritedAttributes}
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
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          ref={inputEl => (this.nativeInput = inputEl)}
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
            <slot></slot>
          </span>
        </label>
      </Host>
    )
  }
}

let radioIds = 0
