import { Component, h, Host, Prop, Element, EventEmitter, Event, Method, Watch, Listen, State } from '@stencil/core'
import { isDescendant } from '../../helpers/helpers'

@Component({
  tag: 'bal-checkbox',
  styleUrl: 'bal-checkbox.scss',
  shadow: false,
  scoped: true,
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
   * Defines the layout of the checkbox button
   */
  @Prop() interface: 'checkbox' | 'switch' = 'checkbox'

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex: number = 0

  /**
   * The value of the control.
   */
  @Prop() value: string = 'on'

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true, reflect: true }) checked = false

  /**
   * Update the native input element when the value changes
   */
  @Watch('checked')
  protected valueChanged(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.balChange.emit(this.checked)
    }
  }

  /**
   * If `true`, the user cannot interact with the checkbox.
   */
  @Prop() disabled = false

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
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!)
  }

  private onInput = (ev: any) => {
    this.checked = ev.target.checked
  }

  private onInputFocus = (ev: any) => {
    this.hasFocus = true
    this.balFocus.emit(ev)
  }

  private onInputBlur = (ev: any) => {
    this.hasFocus = false
    this.balBlur.emit(ev)
  }

  render() {
    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
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
          role="checkbox"
          id={this.inputId}
          name={this.name}
          value={this.value}
          checked={this.checked}
          tabindex={this.balTabindex}
          aria-checked={this.checked ? 'true' : 'false'}
          disabled={this.disabled}
          aria-disabled={this.disabled ? 'true' : 'false'}
          onFocus={e => this.onInputFocus(e)}
          onBlur={e => this.onInputBlur(e)}
          onInput={this.onInput}
          ref={inputEl => (this.nativeInput = inputEl)}
        />
        <label
          class={{
            'option-label': true,
            'is-disabled': this.disabled,
            'data-test-checkbox-label': true,
          }}
          htmlFor={this.inputId}
          onClick={(ev: MouseEvent) => {
            ev.stopPropagation()
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
