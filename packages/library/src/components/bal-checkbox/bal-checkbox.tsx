import { Component, h, Host, Prop, Element, EventEmitter, Event, Watch, Method } from '@stencil/core'

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
  @Watch('checked')
  protected checkedChanged() {
    if (this.inputEl.checked !== this.checked) {
      this.inputEl.checked = this.checked
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
  @Event({ eventName: 'balChange' }) balChange!: EventEmitter<boolean>

  /**
   * Emitted when the toggle has focus.
   */
  @Event({ eventName: 'balFocus' }) balFocus!: EventEmitter<void>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event({ eventName: 'balBlur' }) balBlur!: EventEmitter<void>

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

  private onFocus = () => {
    this.balFocus.emit()
  }

  private onBlur = () => {
    this.balBlur.emit()
  }

  render() {
    const { inputId, label } = this
    return (
      <Host
        class={{
          'is-inverted': this.inverted,
        }}>
        <input
          type="checkbox"
          role="checkbox"
          id={inputId}
          name={this.name}
          value={this.value}
          checked={this.checked}
          tabindex={this.balTabindex}
          aria-checked={this.checked ? 'true' : 'false'}
          aria-label={label}
          disabled={this.disabled}
          aria-disabled={this.disabled ? 'true' : 'false'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={this.onInput}
          ref={inputEl => (this.inputEl = inputEl)}
        />
        <label htmlFor={inputId}>
          <bal-text>{label}</bal-text>
        </label>
      </Host>
    )
  }
}

let checkboxIds = 0
