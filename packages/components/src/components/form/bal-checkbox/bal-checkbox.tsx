import { Component, h, Host, Prop, Element, EventEmitter, Event, Method, Watch, Listen, State } from '@stencil/core'
import { isDescendant } from '../../../helpers/helpers'

@Component({
  tag: 'bal-checkbox',
})
export class Checkbox {
  private inputId = `bal-cb-${checkboxIds++}`
  private nativeInput?: HTMLInputElement

  @State() hasFocus = false

  @Element() el!: HTMLElement

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

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
   * The tabindex of the control.
   */
  @Prop() balTabindex = 0

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true, reflect: true }) checked = false

  /**
   * Update the native input element when the checked changes
   */
  @Watch('checked')
  protected checkedChanged(newChecked: boolean, oldChecked: boolean) {
    if (newChecked !== oldChecked) {
      this.balChange.emit(this.checked)
    }
  }

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

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && (ev.target === this.el || isDescendant(this.el, ev.target as HTMLElement))) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  /**
   * Sets the focus on the checkbox input element.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus()
    }
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement | undefined> {
    return Promise.resolve(this.nativeInput)
  }

  private onInputFocus = (ev: FocusEvent) => {
    this.hasFocus = true
    this.balFocus.emit(ev)
  }

  private onInputBlur = (ev: FocusEvent) => {
    this.hasFocus = false
    this.balBlur.emit(ev)
  }

  private onClick = (ev: FocusEvent) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }
    ev.preventDefault()

    this.checked = !this.checked
  }

  render() {
    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        aria-hidden={this.disabled ? 'true' : null}
        aria-checked={`${this.checked}`}
        aria-focused={this.hasFocus ? 'true' : null}
        role="checkbox"
        onClick={this.onClick}
        class={{
          'is-inverted': this.inverted,
          'is-disabled': this.disabled,
          'is-focused': this.hasFocus,
          'bal-checkbox': this.interface === 'checkbox',
          'bal-switch': this.interface === 'switch',
        }}
      >
        <input
          class={{
            'is-disabled': this.disabled,
            'data-test-checkbox-input': true,
          }}
          type="checkbox"
          name={this.name}
          id={this.inputId}
          checked={this.checked}
          value={this.value}
          tabindex={this.balTabindex}
          aria-checked={`${this.checked}`}
          disabled={this.disabled || this.hidden}
          onFocus={e => this.onInputFocus(e)}
          onBlur={e => this.onInputBlur(e)}
          ref={inputEl => (this.nativeInput = inputEl)}
        />
        <label
          class={{
            'option-label': true,
            'is-disabled': this.disabled,
            'data-test-checkbox-label': true,
          }}
        >
          <bal-text>
            <slot></slot>
          </bal-text>
        </label>
      </Host>
    )
  }
}

let checkboxIds = 0
