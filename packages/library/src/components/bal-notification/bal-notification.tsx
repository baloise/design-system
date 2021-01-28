import { Component, Host, h, Prop } from '@stencil/core'
import { ColorTypes } from '../../types/color.types'

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
  @Prop() type: '' | ColorTypes = ''

  render() {
    return (
      <Host>
        <div class={`notification is-${this.type}`}>
          <bal-text>
            <slot />
          </bal-text>
        </div>
      </Host>
    )
  }
}
