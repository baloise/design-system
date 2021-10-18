import { Component, Host, h, Prop } from '@stencil/core'
import { ColorTypesExtended } from '../../types/color.types'

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
  @Prop() color: '' | ColorTypesExtended = ''

  render() {
    return (
      <Host>
        <div class={`notification has-background-${this.color}`}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
