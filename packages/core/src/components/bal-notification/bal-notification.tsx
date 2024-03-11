import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-notification',
  styleUrl: 'bal-notification.sass',
})
export class Notification {
  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop() color: BalProps.BalNotificationColor = ''

  render() {
    return (
      <Host class="bal-notification">
        <div
          class={`bal-notification__inner bal-notification__inner--color-${this.color}`}
          data-testid="bal-notification-content"
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
