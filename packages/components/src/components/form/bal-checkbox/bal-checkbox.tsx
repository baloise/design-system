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
   * A DOMString representing the value of the checkbox. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the checkbox's name.
   */
  @Prop() value = 'on'

  /**
   * Defines the layout of the checkbox button
   */
  @Prop() interface: 'checkbox' | 'switch' = 'checkbox'

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true }) checked = false

  /**
   * If `true`, the user cannot interact with the checkbox.
   */
  @Prop() disabled = false

  /**
   * If `true`, the value will not be send with a form submit
   */
  @Prop() hidden = false

  /**
   * If `true`, the control works on dark background.
   */
  @Prop() inverted = false

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<boolean>

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
    if (this.disabled && ev.target && (ev.target === this.el || isDescendant(this.el, ev.target as HTMLElement))) {
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

    if (!this.disabled) {
      this.checked = !this.checked
      this.balChange.emit(this.checked)
      this.balClick.emit(ev)
    } else {
      stopEventBubbling(ev)
    }
  }

  render() {
    return (
      <Host
        role="checkbox"
        aria-checked={`${this.checked}`}
        aria-disabled={this.disabled ? 'true' : null}
        aria-hidden={this.disabled ? 'true' : null}
        aria-focused={this.hasFocus ? 'true' : null}
        class={{
          'is-inverted': this.inverted,
          'is-disabled': this.disabled,
          'is-focused': this.hasFocus,
          'bal-checkbox': this.interface === 'checkbox',
          'bal-switch': this.interface === 'switch',
        }}
        {...this.inheritedAttributes}
      >
        <input
          class={{
            'is-disabled': this.disabled,
            'data-test-checkbox-input': true,
          }}
          type="checkbox"
          id={this.inputId}
          name={this.name}
          tabindex={-1}
          checked={this.checked}
          value={this.value}
          aria-checked={`${this.checked}`}
          disabled={this.disabled || this.hidden}
          onFocus={e => this.onInputFocus(e)}
          onBlur={e => this.onInputBlur(e)}
          onClick={this.onClick}
          ref={inputEl => (this.nativeInput = inputEl)}
        />
        <label
          class={{
            'option-label': true,
            'is-disabled': this.disabled,
            'data-test-checkbox-label': true,
          }}
          htmlFor={this.inputId}
        >
          <bal-text
            class={{
              'has-padding-left': !this.labelHidden,
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
