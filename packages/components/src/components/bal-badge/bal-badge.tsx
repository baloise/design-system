import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-badge',
})
export class Badge implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Name of the icon to show. If a icon is present text should be hidden.
   */
  @Prop() icon?: string = undefined

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop() size: 'small' | 'large' | '' = ''

  /**
   * Define the alert color for the badge.
   */
  @Prop() color: 'danger' | 'warning' | 'success' = 'danger'

  render() {
    return (
      <Host
        class={{
          'bal-badge': true,
          'has-radius-rounded': true,
          'has-text-white': true,
          [`has-background-${this.color}`]: true,
          [`has-size-${this.size}`]: this.size !== '',
        }}
      >
        <bal-text
          bold
          small={this.size !== 'large'}
          class={{
            'is-hidden': !!this.icon,
          }}
        >
          <slot></slot>
        </bal-text>
        <bal-icon
          class={{
            'is-hidden': !this.icon,
          }}
          size={this.size === '' ? 'xsmall' : 'small'}
          name={this.icon}
          color="white"
        ></bal-icon>
      </Host>
    )
  }
}
