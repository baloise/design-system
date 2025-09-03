import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import isNil from 'lodash.isnil'
import { stopEventBubbling } from 'packages/core/src/utils/form-input'
import { BEM } from '../../../utils/bem'

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
  @Event() balClick!: EventEmitter<BalEvents.BalDataValueClickDetail>

  /**
   * Emitted when the edit button has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalDataValueFocusDetail>

  /**
   * Emitted when the edit button loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalDataValueBlurDetail>

  private onClickHandler = (ev: BalEvents.BalButtonClick) => {
    const input = this.el.querySelector('bal-input')
    if (!isNil(input)) {
      input.setFocus()
    }

    stopEventBubbling(ev)
    this.balClick.emit(ev.detail)
  }

  render() {
    const block = BEM.block('data-value')
    const buttonEl = block.element('button')
    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('is-editable').class(this.editable),
          ...block.modifier('is-multiline').class(this.multiline),
        }}
      >
        <div>
          <slot />
        </div>
        <bal-button
          class={{
            ...buttonEl.class(),
          }}
          data-testid="bal-data-value-button"
          square
          outlined
          color="text"
          size="small"
          icon="edit"
          disabled={this.disabled}
          onBalBlur={_ => this.balBlur.emit()}
          onBalFocus={_ => this.balFocus.emit()}
          onBalClick={ev => this.onClickHandler(ev)}
        ></bal-button>
      </Host>
    )
  }
}
