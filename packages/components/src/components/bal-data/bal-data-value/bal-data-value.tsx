import { Component, Host, h, Prop, Event, EventEmitter, Element } from '@stencil/core'
import isNil from 'lodash.isnil'

@Component({
  tag: 'bal-data-value',
})
export class DataValue {
  @Element() el!: HTMLElement

  /**
   * If `true` a small button with a edit icon will be shown on the right.
   */
  @Prop() editable = false

  /**
   * If `true` the button will get disabled.
   */
  @Prop() disabled = false

  /**
   * If `true` the text will break and the height of the item increases.
   */
  @Prop() multiline = false

  /**
   * Emitted when the edit button has focus.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  /**
   * Emitted when the edit button has focus.
   */
  @Event() balFocus!: EventEmitter<void>

  /**
   * Emitted when the edit button loses focus.
   */
  @Event() balBlur!: EventEmitter<void>

  onClickHandler(event: MouseEvent) {
    this.balClick.emit(event)
    const input = this.el.querySelector('bal-input')
    if (!isNil(input)) {
      input.setFocus()
    }
  }

  render() {
    return (
      <Host
        class={{
          'bal-data-value': true,
          'is-editable': this.editable,
          'is-multiline': this.multiline,
        }}
      >
        <div>
          <slot></slot>
        </div>
        <bal-button
          class="bal-data-value-btn"
          square
          outlined
          size="small"
          color="info"
          icon="edit"
          disabled={this.disabled}
          onBalBlur={_ => this.balBlur.emit()}
          onBalFocus={_ => this.balFocus.emit()}
          onClick={ev => this.onClickHandler(ev)}
        ></bal-button>
      </Host>
    )
  }
}
