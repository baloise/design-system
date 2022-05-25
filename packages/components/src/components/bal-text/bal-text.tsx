import { Component, h, Host, Prop } from '@stencil/core'
import { Props } from '../../types'

@Component({
  tag: 'bal-text',
})
export class Text {
  /**
   * If `true` the text has a small size
   */
  @Prop() small = false

  /**
   * If `true` the text is bold
   */
  @Prop() bold = false

  /**
   * Defines the color of the text.
   */
  @Prop() color: Props.BalTextColor = ''

  render() {
    return (
      <Host
        class={{
          [`has-text-${this.color}`]: this.color !== '',
          'is-small': this.small,
          'is-bold': this.bold,
        }}
      >
        <span>
          <slot></slot>
        </span>
      </Host>
    )
  }
}
