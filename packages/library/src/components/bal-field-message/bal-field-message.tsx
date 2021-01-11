import { Component, h, Host, Element, Prop } from '@stencil/core'

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
  @Prop() type: '' | 'danger' | 'success' | 'warning' = ''

  render() {
    return (
      <Host class={`help is-${this.type}`}>
        <bal-text>
          <slot></slot>
        </bal-text>
      </Host>
    )
  }
}
