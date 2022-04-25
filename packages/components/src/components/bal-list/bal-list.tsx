import { Component, Host, h, Prop, Watch } from '@stencil/core'
import { Props } from '../../props'

@Component({
  tag: 'bal-list',
})
export class List {
  /**
   * If `true` the list item can not be hovered
   */
  @Prop() disabled = false

  /**
   * @deprecated
   * If `true` the list can be used on a dark background
   */
  @Prop() inverted = false
  @Watch('inverted')
  invertedHandler() {
    console.warn('[DEPRECATED] - Please use the property background="dark" instead')
    if (this.inverted === true) {
      this.background = 'dark'
    }
  }

  /**
   * If `true` the list can be used on a light, dark or colored backgrounds
   */
  @Prop() background: Props.BalListBackground = 'light'

  /**
   * If `true` each list item has a bottom border
   */
  @Prop() border = false

  /**
   * Defines the min height of the list item
   */
  @Prop() size: Props.BalListSize = ''

  render() {
    return (
      <Host
        role="list"
        class={{
          'bal-list': true,
          'is-disabled': this.disabled,
          'has-border': this.border,
          'has-size-large': this.size === 'large',
          [`is-on-background-${this.background}`]: true,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
