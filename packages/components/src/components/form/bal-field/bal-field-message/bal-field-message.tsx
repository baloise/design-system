import { Component, h, Host, Prop } from '@stencil/core'
import { Props } from '../../../../types'

@Component({
  tag: 'bal-field-message',
})
export class FieldMessage {
  /**
   * Defines the color of the message.
   */
  @Prop() color: Props.BalFieldMessageColor = ''

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  render() {
    return (
      <Host
        class={{
          [`help is-${this.invalid ? 'danger' : this.color}`]: true,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
