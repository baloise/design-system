import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-badge',
  styleUrls: {
    css: 'bal-badge.sass',
  },
})
export class Badge implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Name of the icon to show. If a icon is present text should be hidden.
   */
  @Prop() icon?: string

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop() size: BalProps.BalBadgeSize = ''

  /**
   * Define the alert color for the badge.
   */
  @Prop() color: BalProps.BalBadgeColor = 'danger'

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop() position: BalProps.BalBadgePosition = ''

  render() {
    return (
      <Host
        class={{
          'bal-badge': true,
          [`bal-badge--has-background-${this.color}`]: true,
          [`bal-badge--has-position-${this.position}`]: this.position !== '',
          [`bal-badge--has-size-${this.size}`]: this.size !== '',
        }}
      >
        <span
          class={{
            'bal-badge__label': true,
            'bal-badge__label--is-hidden': !!this.icon || this.size === 'small',
          }}
        >
          <slot></slot>
        </span>
        <bal-icon
          class={{
            'bal-badge__icon': true,
            'bal-badge__icon--is-hidden': !this.icon || this.size === 'small',
          }}
          size={this.size === '' ? 'small' : ''}
          name={this.icon}
          color="white"
        ></bal-icon>
      </Host>
    )
  }
}
