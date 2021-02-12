import { Component, h, Host, Prop, Element, EventEmitter, Event, Method, Watch } from '@stencil/core'
import { findItemLabel } from '../../utils/helpers'

@Component({
  tag: 'bal-checkbox',
  styleUrl: 'bal-checkbox.scss',
  shadow: false,
  scoped: true,
})
export class Checkbox {
  private inputId = `bal-cb-${checkboxIds++}`
  private inputEl?: HTMLInputElement

  @Element() el!: HTMLElement

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * The label of the control.
   */
  @Prop() label: string = ''

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
  @Prop({ mutable: true }) checked = false

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

  /**
   * Update the native input element when the value changes
   */
  @Watch('checked')
  protected valueChanged() {
    this.balChange.emit(this.checked)
  }

  /**
   * Sets the focus on the checkbox input element.
   */
  @Method()
  async setFocus() {
    if (this.inputEl) {
      this.inputEl.focus()
    }
  }

  private onInput = (ev: any) => {
    this.checked = ev.target.checked
    this.balChange.emit(this.checked)
  }

  render() {
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    return (
      <Host
        class={{
          'is-inverted': this.inverted,
        }}>
        <input
          type="checkbox"
          role="checkbox"
          id={this.inputId}
          name={this.name}
          value={this.value}
          checked={this.checked}
          tabindex={this.balTabindex}
          aria-checked={this.checked ? 'true' : 'false'}
          aria-label={label}
          disabled={this.disabled}
          aria-disabled={this.disabled ? 'true' : 'false'}
          onFocus={e => this.balFocus.emit(e)}
          onBlur={e => this.balBlur.emit(e)}
          onInput={this.onInput}
          ref={inputEl => (this.inputEl = inputEl)}
        />
        <label htmlFor={this.inputId}>
          <bal-text>{this.label}</bal-text>
        </label>
      </Host>
    )
  }
}

let checkboxIds = 0
