import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-notification',
  styleUrl: 'bal-notification.scss',
  scoped: true,
  shadow: false,
})
export class Notification {
  /**
   * Defines the color of the element
   */
  @Prop() type: '' | 'primary' | 'info' | 'success' | 'warning' | 'danger' = ''

  render() {
    return (
      <Host>
        <div class={`notification is-${this.type}`}>
          <slot />
        </div>
      </Host>
    )
  }
}
