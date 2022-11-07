import { Component, Host, h, Prop } from '@stencil/core'
import { Props } from '../../../types'

@Component({
  tag: 'bal-notification',
  styleUrls: {
    css: 'bal-notification.sass',
  },
})
export class Notification {
  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop() color: Props.BalNotificationColor = ''

  render() {
    return (
      <Host class="bal-notification">
        <div class={`bal-notification__inner bal-notification__inner--is-${this.color}`}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
