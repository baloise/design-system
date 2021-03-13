import { Component, h, Host, Prop, Element, EventEmitter, Event, Method, Watch, Listen } from '@stencil/core'
import { findItemLabel } from '../../helpers/helpers'

@Component({
  tag: 'bal-checkbox',
  styleUrl: 'bal-checkbox.scss',
  shadow: false,
  scoped: true,
})
export class Checkbox {
  private inputId = `bal-cb-${checkboxIds++}`
  private nativeInput?: HTMLInputElement
  private nativeLabel?: HTMLLabelElement

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
    if (this.disabled && ev.target && ev.target === this.el) {
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

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      if (this.nativeLabel !== event.target) {
        event.stopPropagation()
      }
    }
  }

  private inputClick = (event: MouseEvent) => {
    event.stopPropagation()
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
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'is-inverted': this.inverted,
          'is-disabled': this.disabled,
        }}
      >
        <input
          class={{
            'is-disabled': this.disabled,
          }}
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
          onClick={this.inputClick}
          onFocus={e => this.balFocus.emit(e)}
          onBlur={e => this.balBlur.emit(e)}
          onInput={this.onInput}
          ref={inputEl => (this.nativeInput = inputEl)}
        />
        <label
          class={{
            'is-disabled': this.disabled,
          }}
          htmlFor={this.inputId}
          ref={labelEl => (this.nativeLabel = labelEl)}
          onClick={this.handleClick}
        >
          <slot>{this.label}</slot>
        </label>
      </Host>
    )
  }
}

let checkboxIds = 0
