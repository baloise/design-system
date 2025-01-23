import { Component, Host, h, Prop } from '@stencil/core'
import { BEM } from '../../utils/bem'

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

  /**
   * If `true` the notifications are presented in a light variant
   */
  @Prop() light = false

  /**
   * If `true` there will be no icon provided
   */
  @Prop() noIcon = false

  render() {
    const block = BEM.block('notification')
    const innerEl = block.element('inner')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`no-icon`).class(this.noIcon),
          ...block.modifier(`color-${this.color}${this.light ? '-light' : ''}`).class(!!this.color),
          ...block.modifier(`color-light`).class(!this.color && this.light),
        }}
        data-testid="bal-notification-content"
      >
        {/* <div
          class={{
            ...innerEl.class(),
            ...innerEl.modifier(`color-${this.color}`).class(!!this.color),
          }}
          data-testid="bal-notification-content"
        > */}
        <slot></slot>
        {/* </div> */}
      </Host>
    )
  }
}
