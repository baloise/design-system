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
   * A DOMString representing the value of the checkbox. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the checkbox's name.
   */
  @Prop() value: string | number = 'on'

  /**
   * Defines the layout of the checkbox button
   */
  @Prop() interface: Props.BalCheckboxInterface = 'checkbox'

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true }) checked = false

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
   * If `true`, the control works on dark background.
   */
  @Prop() inverted = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * Emitted when the value property has changed.
   */
  @Event() balChange!: EventEmitter<Events.BalCheckboxChangeDetail>

  /**
   * Emitted when the toggle has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

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

  private onInputFocus = (ev: FocusEvent) => inputHandleFocus<any>(this, ev)

  private onInputBlur = (ev: FocusEvent) => inputHandleBlur<any>(this, ev)

  private onClick = (ev: MouseEvent) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }

    if (!this.disabled && !this.readonly) {
      this.checked = !this.checked
      this.balChange.emit(this.checked)
      this.balClick.emit(ev)
    } else {
      stopEventBubbling(ev)
    }
  }

  render() {
    const type = this.interface
    const block = BEM.block(type)
    const flatClass = 'is-flat'
    const hasFlat = this.flat
    const elLabel = block.element('label')
    const elText = elLabel.element('text')
    const elInput = block.element('input')
    const disabledClass = 'is-disabled'
    const hasDisabled = this.disabled || this.readonly
    const paddingLeftClass = 'has-padding-left'
    const hasPaddingLeft = !this.labelHidden
    const invalidClass = 'is-invalid'
    const hasInvalid = this.invalid

    return (
      <Host
        role="checkbox"
        aria-checked={`${this.checked}`}
        aria-disabled={this.disabled ? 'true' : null}
        aria-hidden={this.disabled ? 'true' : null}
        aria-focused={this.hasFocus ? 'true' : null}
        class={{
          ...block.class(),
          ...block.modifier(flatClass).class(hasFlat),
          ...block.modifier(disabledClass).class(hasDisabled),
          ...block.modifier(invalidClass).class(hasInvalid),
        }}
        {...this.inheritedAttributes}
      >
        <input
          class={{
            ...elInput.class(),
            ...elInput.modifier(disabledClass).class(hasDisabled),
            ...elInput.modifier(invalidClass).class(hasInvalid),
            'data-test-checkbox-input': true,
          }}
          type="checkbox"
          id={this.inputId}
          name={this.name}
          required={this.required}
          tabindex={-1}
          checked={this.checked}
          value={this.value}
          aria-checked={`${this.checked}`}
          disabled={this.disabled || this.hidden}
          readonly={this.readonly}
          onFocus={e => this.onInputFocus(e)}
          onBlur={e => this.onInputBlur(e)}
          onClick={this.onClick}
          ref={inputEl => (this.nativeInput = inputEl)}
        />
        <label
          class={{
            ...elLabel.class(),
            ...elLabel.modifier(disabledClass).class(hasDisabled),
            'data-test-checkbox-label': true,
          }}
          htmlFor={this.inputId}
        >
          <bal-text
            inline
            color={this.disabled || this.readonly ? 'grey' : this.invalid ? 'danger' : 'primary'}
            class={{
              ...elText.class(),
              ...elText.modifier(paddingLeftClass).class(hasPaddingLeft),
            }}
          >
            <slot></slot>
          </bal-text>
        </label>
      </Host>
    )
  }
}

let checkboxIds = 0
