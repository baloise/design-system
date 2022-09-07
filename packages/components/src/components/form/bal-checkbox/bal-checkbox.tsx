import {
  Component,
  h,
  Host,
  Prop,
  Element,
  EventEmitter,
  Event,
  Method,
  Listen,
  State,
  ComponentInterface,
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
import { BEM } from '../../../utils/bem'
import { Props, Events } from '../../../types'

@Component({
  tag: 'bal-checkbox',
})
export class Checkbox implements ComponentInterface, FormInput<any> {
  private inputId = `bal-cb-${checkboxIds++}`
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
   * If `true` the checkbox has no label
   */
  @Prop() labelHidden = false

  /**
   * If `true` the control is no padding
   */
  @Prop() flat = false

  /**
   * Defines the layout of the checkbox button
   */
  @Prop() interface: Props.BalCheckboxInterface = 'checkbox'

  /**
   * A DOMString representing the value of the checkbox. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the checkbox's name.
   */
  @Prop() value: string | number = 'on'

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true }) checked = false
  private initialValue = this.checked

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
   * Emitted when the value property has changed.
   */
  @Event() balChange!: EventEmitter<Events.BalCheckboxChangeDetail>

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

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    const formElement = event.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.checked = this.initialValue
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

  get group(): HTMLBalCheckboxGroupElement | null {
    return this.el.closest('bal-checkbox-group')
  }

  private updateState = () => {
    if (this.group && this.group.control) {
      this.checked = this.group.value.includes(this.value)
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
      this.checked = !this.checked
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

    return (
      <Host
        role="checkbox"
        aria-checked={`${this.checked}`}
        aria-disabled={this.disabled ? 'true' : null}
        aria-hidden={this.disabled ? 'true' : null}
        aria-focused={this.hasFocus ? 'true' : null}
        class={{
          ...block.class(),
          ...block.modifier('checkbox').class(),
          ...block.modifier('select-button').class(this.interface === 'select-button'),
          ...block.modifier('switch').class(this.interface === 'switch'),
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
            'data-test-checkbox-input': true,
          }}
          type="checkbox"
          id={this.inputId}
          name={this.name}
          value={this.value}
          checked={this.checked}
          aria-checked={`${this.checked}`}
          disabled={this.disabled || this.hidden}
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
            ...labelEl.modifier('switch').class(this.interface === 'switch'),
            ...labelEl.modifier('checkbox').class(),
            'data-test-checkbox-label': true,
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

let checkboxIds = 0
