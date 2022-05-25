import { Component, Host, h, Prop } from '@stencil/core'
import { Props } from '../../types'

@Component({
  tag: 'bal-list',
})
export class List {
  /**
   * If `true` the list item can be hovered
   */
  @Prop() disabled = false

  /**
   * If `true` the list can be used on a dark background
   */
  @Prop() inverted = false

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
          'is-inverted': this.inverted,
          'has-border': this.border,
          'has-size-large': this.size === 'large',
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
