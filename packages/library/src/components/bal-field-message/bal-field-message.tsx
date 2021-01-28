import { Component, h, Host, Element, Prop } from '@stencil/core'
import { ColorTypesExtended } from '../../types/color.types'

@Component({
  tag: 'bal-field-message',
  shadow: false,
  scoped: false,
})
export class FieldMessage {
  @Element() element: HTMLElement

  /**
   * Defines the color of the message.
   */
  @Prop() type: '' | ColorTypesExtended = ''

  render() {
    return (
      <Host class={`help is-${this.type}`}>
        <bal-text small>
          <slot></slot>
        </bal-text>
      </Host>
    )
  }
}
