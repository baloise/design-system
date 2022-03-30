import { Component, Host, h, Prop } from '@stencil/core'
import { Props } from '../../../props'

@Component({
  tag: 'bal-notification',
})
export class Notification {
  /**
   * Defines the color of the element
   */
  @Prop() color: Props.BalNotificationColor = ''

  render() {
    return (
      <Host>
        <div class={`notification p-5 is-${this.color}`}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
